import { Request, Response } from "express";
import { BAD_REQUEST, DEFAULT_CHAIN, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, ONE } from "../utils/constants.utils";
import { storeFiles } from "../integrations/web3storage";
import { ICreatedWork } from "../models/createdWork.schema";
import { uploadArtWorkSchema } from "../utils/validation.utils";
import createdWorkServices from "../services/createdWork.services";
import { ICreateWorkSchema } from "../models/interfaces.models";


class CreatedWorkController {
    getCreatedWork = async (request: Request, response: Response) => {
        const { cid } = request.query;

        if (!cid) {
            response.status(BAD_REQUEST).send({ message: "Provide cid"});
        }

        let work: ICreatedWork | null = null;

        try {
            work = await createdWorkServices.getWorkByCID(cid as string);
            if(!work){
                return response.status(NOT_FOUND).send({ message: "No work found with given cid" });
            }
            return response.status(OK).send({ message: "Work retrieved successfully", data: work });
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).
                send({
                    message: `An Error Ocurred: \n${error.message}`
                });
        }  
    }

    getAllWorksByUser = async (request: Request, response: Response) => {
        const { userId } = request.query;
        console.log(userId);
        if (!userId) {
            response.status(BAD_REQUEST).send({ message: "Provide userId"})
        }

        let works: ICreatedWork[] | null = null;
            
        try {
            works = await createdWorkServices.getWorksByUser(userId as string);
            if(!works || works.length < 1){
                return response.status(NOT_FOUND).send({ message: "No work found for given user" });
            }
            return response.status(OK).send({ message: "works by user retrieved successfully", data: works });
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).
                send({
                    message: `An Error Ocurred: \n${error.message}`
                });
        }
       
    }

    createTimeStamp = async (request: Request, response: Response) => {
        try {

            console.log({body: request.body})

            //validate request.body 
            const hash = await createdWorkServices.createTimestamp(request.body as ICreateWorkSchema);

            return response.status(OK).send(
                {
                    message: "Work created successfully",
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

