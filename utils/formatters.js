export const getEllipsisTxt = (str, n = 5) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export const getChainName = (number) => {
  if (number === 1) {
    return "Ethereum Mainnet";
  }
  if (number === 5) {
    return "Goerli Testnet";
  }
};
