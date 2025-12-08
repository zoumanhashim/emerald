pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EmeraldStandard is ERC721Enumerable, Ownable, ReentrancyGuard {
    using Strings for uint256;

    uint256 public constant MINT_PRICE = 15000 * 10**18; // Placeholder: 15,000 MATIC/Tokens (Adjust decimals)
    // In production, use a Chainlink Oracle for real-time INR/USD peg

    string public baseURI;
    string public baseExtension = ".json";
    uint256 public maxSupply = 2300; // Matches your Year 1 inventory
    bool public paused = false;

    constructor(string memory _initBaseURI) ERC721("The Emerald Standard", "TES") {
        setBaseURI(_initBaseURI);
    }

    // internal view override
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // Public Mint Function - User pays the gas + price
    function mint(uint256 _mintAmount) public payable nonReentrant {
        require(!paused, "Minting is paused");
        require(_mintAmount > 0, "Mint at least 1");
        uint256 supply = totalSupply();
        require(supply + _mintAmount <= maxSupply, "Sold out");

        // If you are charging in MATIC:
        // require(msg.value >= MINT_PRICE * _mintAmount, "Insufficient funds");

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    // Admin: Set the URL where metadata (images/stats) is stored
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    // Admin: Withdraw funds to TES treasury
    function withdraw() public onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}