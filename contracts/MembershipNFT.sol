// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
contract MembershipNFT is ERC721, ERC721URIStorage, Ownable, AccessControl {
    uint256 private _tokenIdCounter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    enum Tier { Silver, Gold, Platinum }

    mapping(uint256 => Tier) public tokenTier;
    // Pricing constants (in IDRX)
    uint256 public constant SILVER_PRICE = 100 * 10**18;  // 100 IDRX
    uint256 public constant GOLD_PRICE = 250 * 10**18;    // 250 IDRX
    uint256 public constant PLATINUM_PRICE = 500 * 10**18; // 500 IDRX

    event MembershipPurchased(address indexed buyer, uint256 indexed tokenId, Tier tier, uint256 amount);
    event MembershipUpgraded(address indexed owner, uint256 indexed tokenId, Tier oldTier, Tier newTier);

    constructor() ERC721("Mie Yamin Membership", "MYM") Ownable(msg.sender) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mintMembership(address to, uint8 tier, string calldata uri) external onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(to, tokenId);
        tokenTier[tokenId] = Tier(tier);
        _setTokenURI(tokenId, uri);
    }

    function upgradeMembership(uint256 tokenId, uint8 newTier) external onlyRole(MINTER_ROLE) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        Tier oldTier = tokenTier[tokenId];
        require(uint8(newTier) > uint8(oldTier), "New tier must be higher");
        tokenTier[tokenId] = Tier(newTier);
        emit MembershipUpgraded(ownerOf(tokenId), tokenId, oldTier, Tier(newTier));
    }

    function getTierPrice(Tier tier) public pure returns (uint256) {
        if (tier == Tier.Silver) return SILVER_PRICE;
        if (tier == Tier.Gold) return GOLD_PRICE;
        if (tier == Tier.Platinum) return PLATINUM_PRICE;
        revert("Invalid tier");
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
