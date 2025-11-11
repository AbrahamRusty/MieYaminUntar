const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MembershipNFT", function () {
  let membershipNFT, idrxToken, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy IDRX Token
    const IDRXToken = await ethers.getContractFactory("IDRXToken");
    idrxToken = await IDRXToken.deploy();

    // Deploy Membership NFT
    const MembershipNFT = await ethers.getContractFactory("MembershipNFT");
    membershipNFT = await MembershipNFT.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await membershipNFT.owner()).to.equal(owner.address);
    });

    it("Should have correct pricing", async function () {
      expect(await membershipNFT.SILVER_PRICE()).to.equal(ethers.utils.parseEther("100"));
      expect(await membershipNFT.GOLD_PRICE()).to.equal(ethers.utils.parseEther("250"));
      expect(await membershipNFT.PLATINUM_PRICE()).to.equal(ethers.utils.parseEther("500"));
    });
  });

  describe("Minting", function () {
    it("Should mint membership NFT", async function () {
      await membershipNFT.mintMembership(addr1.address, 0, "https://example.com/token/1"); // Silver
      expect(await membershipNFT.ownerOf(0)).to.equal(addr1.address);
      expect(await membershipNFT.tokenTier(0)).to.equal(0); // Silver
    });

    it("Should emit MembershipPurchased event", async function () {
      await expect(membershipNFT.mintMembership(addr1.address, 1, "https://example.com/token/1")) // Gold
        .to.emit(membershipNFT, "MembershipPurchased")
        .withArgs(addr1.address, 0, 1, ethers.utils.parseEther("250"));
    });
  });

  describe("Upgrading", function () {
    beforeEach(async function () {
      await membershipNFT.mintMembership(addr1.address, 0, "https://example.com/token/1"); // Silver
    });

    it("Should upgrade membership", async function () {
      await membershipNFT.upgradeMembership(0, 1); // Silver to Gold
      expect(await membershipNFT.tokenTier(0)).to.equal(1); // Gold
    });

    it("Should emit MembershipUpgraded event", async function () {
      await expect(membershipNFT.upgradeMembership(0, 2)) // Silver to Platinum
        .to.emit(membershipNFT, "MembershipUpgraded")
        .withArgs(addr1.address, 0, 0, 2);
    });

    it("Should revert if new tier is not higher", async function () {
      await expect(membershipNFT.upgradeMembership(0, 0)).to.be.revertedWith("New tier must be higher");
    });
  });
});
