const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // Deploy IDRX Token
  const IDRXToken = await ethers.getContractFactory("IDRXToken");
  const idrxToken = await IDRXToken.deploy();
  await idrxToken.waitForDeployment();
  const idrxTokenAddress = await idrxToken.getAddress();
  console.log("IDRXToken deployed to:", idrxTokenAddress);

  // Deploy Membership NFT
  const MembershipNFT = await ethers.getContractFactory("MembershipNFT");
  const membershipNFT = await MembershipNFT.deploy();
  await membershipNFT.waitForDeployment();
  const membershipNFTAddress = await membershipNFT.getAddress();
  console.log("MembershipNFT deployed to:", membershipNFTAddress);

  // Save deployment info
  const fs = require("fs");
  const network = await ethers.provider.getNetwork();
  const deploymentInfo = {
    idrxToken: idrxTokenAddress,
    membershipNFT: membershipNFTAddress,
    network: network.name,
    chainId: network.chainId.toString(),
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync("deployment.json", JSON.stringify(deploymentInfo, null, 2));
  console.log("Deployment info saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
