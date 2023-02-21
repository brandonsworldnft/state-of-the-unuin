import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { whitelist } from "@/constants/whitelist";

export const padBuffer = (addr) => {
  return Buffer.from(addr.substr(2).padStart(32 * 2, 0), "hex");
};

export const genMerkelTree = () => {
  const leaves = whitelist.map((account) => padBuffer(account));
  const tree = new MerkleTree(leaves, keccak256, {
    sort: true,
  });
  const root = tree.getHexRoot();

  return { root, tree };
};

export const isInWhitelist = (address) => {
  const isIn = whitelist.filter((i) => i.toLowerCase() === address.toLowerCase());
  console.log(isIn);
  if (isIn.length !== 0) {
    return true;
  }
  return false;
};
