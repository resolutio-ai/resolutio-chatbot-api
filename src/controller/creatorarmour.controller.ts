import { Request, Response } from "express";
import { BAD_REQUEST, DEFAULT_CHAIN, INTERNAL_SERVER_ERROR, OK, ONE } from "../utils/constants.utils";
import { storeFiles } from "../integrations/web3storage";
import creatorarmourServices from "../services/creatorarmor.services";
import { CreatedWork } from "../models/creatorarmor.schema";
import { uploadArtWorkSchema } from "../utils/validation.utils";

class CreatorArmourController {
    getCreatedWork = async (request: Request, response: Response) => {
        const { cid, chainName } = request.query;

        if (!cid || !chainName) {
            response.status(BAD_REQUEST).send({})
        }

        let work: CreatedWork | null = null;

        try {
            work = await creatorarmourServices.getFiles(cid as string);
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).
                send({
                    message: `An Error Ocurred: \n${error.message}`
                });
        }

        return response.status(OK).send({ message: "Success", data: work });
    }

    createTimeStamp = async (request: Request, response: Response) => {
        const files = request.files as Express.Multer.File[];
        
        const artworkDetails = await uploadArtWorkSchema.validate(request.body);

        let { chainName } = request.query;

        chainName ??= DEFAULT_CHAIN;

        if (!files || files.length < ONE || !chainName) {
            return response.status(BAD_REQUEST).send({ message: "Invalid Parameters Sent" });
        }

        try {
            const filesArray = files.map(multerFile => {
                const { originalname, mimetype, buffer } = multerFile;

                return new File([buffer], originalname, { type: mimetype });
            });

            filesArray.concat(new File([JSON.stringify(artworkDetails)], "artDescription", { type: "text/plain;charset=utf-8", lastModified: Date.now() }))

            const cid = await storeFiles(filesArray);

            const hash = await creatorarmourServices.getTimeStampHash(cid as string, chainName as string);

            return response.status(OK).send(
                {
                    message: "Success",
                    Data: { transactionHash: hash }
                }
            );
        } catch (error: any) {
            return response.status(error?.status ?? INTERNAL_SERVER_ERROR).send({ message: `An Error Ocurred: \n${error.message}` })
        }
    }
}

export default new CreatorArmourController();

