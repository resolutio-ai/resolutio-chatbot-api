import { Request, Response } from "express";
import { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, OK, ONE } from "../utils/constants.utils";
import { storeFiles } from "../integrations/web3storage";
import { ICreatedWork } from "../models/createdWork.schema";
import { uploadArtWorkSchema } from "../utils/validation.utils";
import createdWorkServices from "../services/createdWork.services";
import feedPageServices from "../services/feedPage.services";
import { ICreateWorkSchema } from "../models/interfaces.models";


class FeedPageController {

    paginatedWorks = async (request: Request, response: Response) => {
        const { page = 1, count = 1, search = '', medium = '', licenseType = '' } = request.query;
        const pageNumber = parseInt(page as string, 10);
        const pageCount = parseInt(count as string, 10);

        try {
            const { works, totalWorks, totalPages, currentPage } = await feedPageServices.getPaginatedWorks(pageNumber, pageCount, search as string, medium as string, licenseType as string);
            if (works.length === 0) {
                return response.status(NOT_FOUND).send({ message: "No work found" });
            }
            return response.status(OK).send({
                message: "Works retrieved successfully",
                data: works,
                totalWorks,
                totalPages,
                currentPage
            });
        } catch (error: any) {
            return response.status(INTERNAL_SERVER_ERROR).send({
                message: `An Error Occurred: \n${error.message}`
            });
        }
    }

    

}
export default new FeedPageController();
