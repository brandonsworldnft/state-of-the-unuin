export const MAD_CARTEL_ABI = [
  "function cost() public view returns(uint256)",
  "function paused() public view returns(bool)",
  "function mint(uint256 _mintAmount) public payable",
  "function presaleMint(uint256 _mintAmount, bytes32[] calldata proof) public payable",
  "function walletOfOwner(address _owner) public view returns (uint256[] memory)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function maxSupply() public view returns(uint256)",
  "function totalSupply() public view returns(uint256)",
  "function maxMintAmount() public view returns(uint256)",
  "function nftPerAddressLimit() public view returns(uint256)",
  "function presale() public view returns(bool)",
  "function addressMintedBalance(address) public view returns(uint256)",
];
