import axios from "axios";
import { retrieveFiles, storeFiles } from "../integrations/web3storage";
import { CreatedWork, ICreatedWork } from "../models/createdWork.schema";
import { User } from "../models/user.model"
import { executeUserOp, getPartialUserOp } from "../integrations/biconomy";
import { ethers } from "ethers";
import { getNetworkConfig } from "../utils/network.utils";
import { HttpException } from "../utils/exceptions.utils";
import { ZERO } from "../utils/constants.utils";

export type GetPaginatedWorksRequest = {
    page : number,
    count : number
    searchParam?: string,
    medium?: string,
    licenseType?: string,
    startDate?: string,
    endDate?: string
}

class FeedPageService {

    getSearchQuery = async (search: string) => {
        const userQuery: any = {};
        const workQuery: any = {};
        const searchConditions = [];

        const searchWords = search.trim().split(' ');
        if (searchWords.length > ZERO) {
            userQuery.$or = searchWords.map(word => ({ firstName: { $regex: word, $options: 'i' } }));
        }

        const users = await User.find(userQuery);
        const userIds = users.map(user => user._id);

        if (searchWords.length > ZERO) {
            workQuery.$or = searchWords.map(word => ({ nameOfWork: { $regex: word, $options: 'i' } }));
        }

        const works = await CreatedWork.find(workQuery);
        const workIds = works.map(work => work._id);

        if (userIds.length > ZERO) {
            searchConditions.push({ userId: { $in: userIds } });
        }

        if (workIds.length > ZERO) {
            searchConditions.push({ _id: { $in: workIds } });
        }
    
        return searchConditions;
    }

    getPaginatedWorks = async (request: GetPaginatedWorksRequest) => {
        const count = request.count;
        const skip = (request.page - 1) * count;
        const query: any = {};

        if(request.searchParam){
            const searchConditions = await this.getSearchQuery(request.searchParam);
            if (searchConditions.length > ZERO) {
                query.$or = searchConditions;
            } else {
                query._id = null;
            }
        }

        if (request.medium) {
            query.medium = request.medium;
        }
        if (request.licenseType) {
            query.licenseType = request.licenseType;
        }
        if (request.medium) {
            query.medium = request.medium;
        }
        if (request.startDate || request.endDate) {
            query.timeStamp = {};
            if (request.startDate) {
                query.timeStamp.$gte = new Date(request.startDate);
            }
            if (request.endDate) {
                query.timeStamp.$lte = new Date(request.endDate);
            }
        }
        const works = await CreatedWork.find(query).skip(skip).limit(count);
        const totalWorks = await CreatedWork.countDocuments(query);
        return {
            works,
            totalWorks,
            totalPages: Math.ceil(totalWorks / count),
            currentPage: request.page
        };
    }

}

export default new FeedPageService();