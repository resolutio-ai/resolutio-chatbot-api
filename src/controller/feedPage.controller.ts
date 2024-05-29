import { Request, Response } from "express";
import { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, OK, ONE } from "../utils/constants.utils";
import { storeFiles } from "../integrations/web3storage";
import { uploadArtWorkSchema } from "../utils/validation.utils";
import feedPageServices from "../services/feedPage.services";
import { GetPaginatedWorksRequest } from "../services/feedPage.services";

class FeedPageController {

    paginatedWorks = async (request : Request <any, any, any, GetPaginatedWorksRequest>, response: Response) => {
        
        const { page = 1, count = 10, searchParam = '', medium = '', licenseType = '', startDate = '', endDate = ''} = request.query;
        const req : GetPaginatedWorksRequest= {
            page, 
            count,
            searchParam,
            medium,
            licenseType,
            startDate,
            endDate
        };

        try {
            const { works, totalWorks, totalPages, currentPage } = await feedPageServices.getPaginatedWorks(req);
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
