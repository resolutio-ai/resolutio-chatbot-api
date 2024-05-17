import axios from "axios";
import { retrieveFiles, storeFiles } from "../integrations/web3storage";
import { CreatedWork, ICreatedWork } from "../models/createdWork.schema";
import { executeUserOp, getPartialUserOp } from "../integrations/biconomy";
import { ethers } from "ethers";
import { getNetworkConfig } from "../utils/network.utils";
import { HttpException } from "../utils/exceptions.utils";
import { BAD_REQUEST, ONE, ZERO } from "../utils/constants.utils";
import { ICreateWorkSchema, ICreatorWorkMetadata } from "../models/interfaces.models";

class FeedPageService {
    getPaginatedWorks = async (page: number, count: number, search: string, medium: string, licenseType: string ) => {
        const skip = (page - 1) * count;
        const query: any = {};
        if (search) {
            query.nameOfWork = { $regex: search, $options: 'i' };
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