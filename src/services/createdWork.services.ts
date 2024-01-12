import axios from "axios";
import { retrieveFiles, storeFiles } from "../integrations/web3storage";
import { CreatedWork, ICreatedWork } from "../models/creatorarmor.schema";
import { executeUserOp, getPartialUserOp } from "../integrations/biconomy";
import { ethers } from "ethers";
import { getNetworkConfig } from "../utils/network.utils";
import { HttpException } from "../utils/exceptions.utils";
import { BAD_REQUEST, ONE, ZERO } from "../utils/constants.utils";
import { IUploadBody } from "../models/interfaces.models";

class CreatedWorkService {

    getWorkDetailsByCID = async (cid: string) => {
        const files = await retrieveFiles(cid);

        if (files.length === 0) {
            throw new Error("No files found.");
        }

        const creatorDetails: ICreatedWork = {
            nameOfWork: "",
            creatorId: "",
            altMedium: "",
            medium: "",
            license: "",
            timeStamp: "",
            image: "",
            cid: ""
        };

        await Promise.all(
            files.map(async (file) => {
                if (file.name.includes(".jpeg") || file.name.includes(".png")) {
                    creatorDetails.image = `https://ipfs.io/ipfs/${file.cid}`;
                } else {
                    const response = await axios.get(`https://${file.cid}.ipfs.w3s.link/`);
                    creatorDetails[file.name] = response.data as string;
                }
            })
        );

        return creatorDetails;
    };

    createWork = async (createWorkRequest: IUploadBody, cid: string) => {
        await CreatedWork.create({
            cid,
            nameOfWork: createWorkRequest.nameOfWork,
            licenseType: createWorkRequest.licenseType,
            altMedium: createWorkRequest.alternativeMedium,
            medium: createWorkRequest.medium,
            timeStamp: createWorkRequest.dateOfCreation,
            creatorId: createWorkRequest.creatorId
        });
    }

    getWorkByCID = async (cid: string) =>
        await CreatedWork.findOne({ cid });

    createTimestamp = async (files: Express.Multer.File[], metadata: IUploadBody, chainName: string) => {
        //Todo: Retrieve creator from the backend

        const cid = await this.getCidHashFromFile(files, metadata);

        // if(await this.getWorkByCID(cid.toLowerCase())){
        //     console.log(await this.getWorkByCID(cid.toLowerCase()), "SUPPOSED WORK")
        //     throw new HttpException(BAD_REQUEST, "A work with matching CID exists");
        // }

        this.createWork(metadata, cid);

        return await this.getTimeStampHash(cid as string, chainName as string);
    }

    private getCidHashFromFile = async (files: Express.Multer.File[], metadata: IUploadBody): Promise<string> => {

        const inputFilesArray = Object.entries(files);

        const userWork = inputFilesArray.find(x => x[ZERO] == "artWorks")?.[ONE]!;

        if (!userWork) {
            throw new HttpException(BAD_REQUEST, "Please send user's work");
        }

        let { originalname, mimetype, buffer } = userWork;

        let fileArray: File[] = [new File([buffer], originalname, { type: mimetype })];

        const userPersonalizedLicense = inputFilesArray.find(x => x[ZERO] == "userPersonalizedLicense")?.[ONE];

        if (userPersonalizedLicense) {
            let { originalname, mimetype, buffer } = userPersonalizedLicense;

            fileArray.push(new File([buffer], originalname, { type: mimetype }));
        }

        fileArray.concat(new File([JSON.stringify(metadata)], "artDescription", { type: "text/plain;charset=utf-8", lastModified: Date.now() }));

        //return await storeFiles(fileArray);
        return "1a4823d90bc72d354903a8b4ec71ec9c953393fcc87455e7b6145e3aefb9fdc2";
    }

    private getTimeStampHash = async (cid: string, chainname: string) => {
        const { chainId, contractAddress, rpcUrl } = getNetworkConfig(chainname);

        const nftInterface = new ethers.utils.Interface([
            "function createTimeStamp(string cid)",
        ]);

        const data = nftInterface.encodeFunctionData("createTimeStamp", [cid]);

        const transaction = {
            to: contractAddress,
            data: data
        };

        const partialUserOp = await getPartialUserOp(transaction, chainId, rpcUrl);

        return await executeUserOp(partialUserOp);
    }

}

export default new CreatedWorkService();