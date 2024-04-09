import { Request, Response } from "express";
import { BAD_REQUEST, DEFAULT_CHAIN, INTERNAL_SERVER_ERROR, OK, ONE } from "../utils/constants.utils";
import { storeFiles } from "../integrations/web3storage";
import { ICreatedWork } from "../models/createdWork.schema";
import { uploadArtWorkSchema } from "../utils/validation.utils";
import createdWorkServices from "../services/createdWork.services";
import { ICreateWorkSchema } from "../models/interfaces.models";


class CreatedWorkController {
    getCreatedWork = async (request: Request, response: Response) => {
        const { cid } = request.query;

        if (!cid) {
            response.status(BAD_REQUEST).send({})
        }

        let work: ICreatedWork | null = null;

        try {
            work = await createdWorkServices.getWorkByCID(cid as string);
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).
                send({
                    message: `An Error Ocurred: \n${error.message}`
                });
        }

        return response.status(OK).send({ message: "Success", data: work });
    }

    /*
    getAllWorksByUser = async (request: Request, response: Response) => {
        const { _id } = request.params;

        if (!_id) {
            response.status(BAD_REQUEST).send({})
        }

        let work: ICreatedWork | null = null;

        try {
            work = await createdWorkServices.getWorksByUser(_id as string);
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).
                send({
                    message: `An Error Ocurred: \n${error.message}`
                });
        }

        return response.status(OK).send({ message: "Success", data: work });
    }

*/
    createTimeStamp = async (request: Request, response: Response) => {
        try {

            console.log({body: request.body})

            //validate request.body 
            const hash = await createdWorkServices.createTimestamp(request.body as ICreateWorkSchema);

            return response.status(OK).send(
                {
                    message: "Success",
                    Data: { transactionHash: hash.cid }
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

export default new CreatedWorkController();

