const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // Deploy IDRX Token
  const IDRXToken = await ethers.getContractFactory("IDRXToken");
  const idrxToken = await IDRXToken.deploy();
  await idrxToken.deployed();
  console.log("IDRXToken deployed to:", idrxToken.address);

  // Deploy Membership NFT
  const MembershipNFT = await ethers.getContractFactory("MembershipNFT");
  const membershipNFT = await MembershipNFT.deploy();
  await membershipNFT.deployed();
  console.log("MembershipNFT deployed to:", membershipNFT.address);

  // Save deployment info
  const fs = require("fs");
  const deploymentInfo = {
    idrxToken: idrxToken.address,
    membershipNFT: membershipNFT.address,
    network: network.name,
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
