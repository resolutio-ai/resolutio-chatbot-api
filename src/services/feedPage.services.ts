import axios from "axios";
import { retrieveFiles, storeFiles } from "../integrations/web3storage";
import { CreatedWork, ICreatedWork } from "../models/createdWork.schema";
import { User } from "../models/user.model"
import { executeUserOp, getPartialUserOp } from "../integrations/biconomy";
import { ethers } from "ethers";
import { getNetworkConfig } from "../utils/network.utils";
import { HttpException } from "../utils/exceptions.utils";
import { BAD_REQUEST, ONE, ZERO } from "../utils/constants.utils";
import { ICreateWorkSchema, ICreatorWorkMetadata } from "../models/interfaces.models";

class FeedPageService {
    getPaginatedWorks = async (page: number, count: number, nameOfWork: string, nameOfCreator: string, medium: string, licenseType: string, startDate: string, endDate: string) => {
        const skip = (page - 1) * count;
        const query: any = {};
        const userquery: any = {};

        if (nameOfCreator) {
            userquery.firstName = { $regex: nameOfCreator, $options: 'i' };
            const users = await User.find(userquery);
            const userIds = users.map(user => user._id);

            if (userIds.length > ZERO) {
                query.userId = { $in: userIds };
            }
            else {
                query.userId = null;
            }
        }

        if (nameOfWork) {
            query.nameOfWork = { $regex: nameOfWork, $options: 'i' };
        }
        if (medium) {
            query.medium = medium;
        }
        if (licenseType) {
            query.licenseType = licenseType;
        }
        if (medium) {
            query.medium = medium;
        }
        if (startDate || endDate) {
            query.timeStamp = {};
            if (startDate) {
                query.timeStamp.$gte = new Date(startDate);
            }
            if (endDate) {
                query.timeStamp.$lte = new Date(endDate);
            }
        }
        const works = await CreatedWork.find(query).skip(skip).limit(count);
        const totalWorks = await CreatedWork.countDocuments(query);
        return {
            works,
            totalWorks,
            totalPages: Math.ceil(totalWorks / count),
            currentPage: page
        };
    }

}

export default new FeedPageService();