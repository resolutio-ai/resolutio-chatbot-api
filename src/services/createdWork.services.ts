import axios from "axios";
import { retrieveFiles, storeFiles } from "../integrations/web3storage";
import { CreatedWork, ICreatedWork } from "../models/creatorarmor.schema";
import { executeUserOp, getPartialUserOp } from "../integrations/biconomy";
import { ethers } from "ethers";
import { getNetworkConfig } from "../utils/network.utils";
import { Address } from "viem";
import { uploadArtWorkSchema } from "../utils/validation.utils";
import { HttpException } from "../utils/exceptions.utils";
import { BAD_REQUEST } from "../utils/constants.utils";

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

    createWork = async (createWorkRequest: ICreatedWork) => {
        await CreatedWork.create({
            cid: createWorkRequest.cid,
            nameOfWork: createWorkRequest.nameOfWork,
            license: createWorkRequest.license,
            altMedium: createWorkRequest.altMedium,
            medium: createWorkRequest.medium,
            timeStamp: createWorkRequest.timeStamp,
            creatorId: createWorkRequest.creatorId,
            image: createWorkRequest.image
        });
    }

    getWorkByCID = async (cid: string) =>
        await CreatedWork.find({ cid });

    createTimestamp = async (files: Express.Multer.File[], metadata: ICreatedWork, chainName: string) => {
        const cid = await this.getCidHashFromFile(files, metadata);

        if(await this.getWorkByCID(cid.toLowerCase())){
            throw new HttpException(BAD_REQUEST, "A work with matching CID exists");
        }

        this.createWork({...metadata, });

        return await this.getTimeStampHash(cid as string, chainName as string);
    }

    private getCidHashFromFile = async (files: Express.Multer.File[], metadata: any): Promise<string> => {
        const artworkDetails = await uploadArtWorkSchema.validate(JSON.parse(metadata));

        const filesArray = files.map(multerFile => {
            const { originalname, mimetype, buffer } = multerFile;

            return new File([buffer], originalname, { type: mimetype });
        });

        filesArray.concat(new File([JSON.stringify(artworkDetails)], "artDescription", { type: "text/plain;charset=utf-8", lastModified: Date.now() }))

        return await storeFiles(filesArray);
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