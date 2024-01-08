require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { BigNumber } = require("ethers")
const { networkConfig } = require("../helper-hardhat-config")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments;
    console.log("Wallet Ethereum Address:", wallet.address)

    //deploy Simplecoin
    deploy("CreateArmour", {
        from: wallet.address,
        args: [],
        log: true,
        type: 2,
        maxFeePerGas: BigNumber.from(1500000000n),
        maxPriorityFeePerGas: BigNumber.from(1500000000n),   
    });
}