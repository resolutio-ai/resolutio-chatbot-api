import { Request, Response } from "express";
import { BAD_REQUEST, DEFAULT_CHAIN, INTERNAL_SERVER_ERROR, OK, ONE } from "../utils/constants.utils";
import { storeFiles } from "../integrations/web3storage";
import { ICreatedWork } from "../models/creatorarmor.schema";
import { uploadArtWorkSchema } from "../utils/validation.utils";
import createdWorkServices from "../services/createdWork.services";

class CreatorArmourController {
    getCreatedWork = async (request: Request, response: Response) => {
        const { cid, chainName } = request.query;

        if (!cid || !chainName) {
            response.status(BAD_REQUEST).send({})
        }

        let work: ICreatedWork | null = null;

        try {
            work = await createdWorkServices.getWorkDetailsByCID(cid as string);
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).
                send({
                    message: `An Error Ocurred: \n${error.message}`
                });
        }

        return response.status(OK).send({ message: "Success", data: work });
    }

    createTimeStamp = async (request: Request, response: Response) => {
        try {

            if(!request.body.metadata){
                throw new Error("Missing Metadata")
            }

            const metadata = await uploadArtWorkSchema.validate(JSON.parse(request.body.metadata));
            console.log("In here")
            const files = request.files as Express.Multer.File[];

            let { chainName } = request.query;

            chainName ??= DEFAULT_CHAIN;

            if (!files || files.length < ONE || !chainName) {
                return response.status(BAD_REQUEST).send({ message: "Invalid Parameters Sent" });
            }

            const hash ="xcdhfgvdg12232445";

            //const hash = createdWorkServices.createTimestamp(files, metadata, chainName as string);

            return response.status(OK).send(
                {
                    message: "Success",
                    Data: { transactionHash: hash }
                }
            );
        } catch (error: any) {
            if(error.name === "Validation Error"){
                return response.status(BAD_REQUEST).send({message: "A Validation Error Occured"})
            }

            return response.status(error?.status ?? INTERNAL_SERVER_ERROR).send({ message: `An Error Ocurred: \n${error.message}` })
        }
    }
}

export default new CreatorArmourController();

