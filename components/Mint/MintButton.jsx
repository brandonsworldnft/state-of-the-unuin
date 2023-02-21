import { useUserContext } from "@/contexts/User";
import { GradientButton } from "../Button/GradientButton";
import { useBalance, useNetwork } from "wagmi";
import { ethers } from "ethers";
import { MAD_CARTEL_NFT } from "@/constants/contracts";
import { MAD_CARTEL_ABI } from "@/constants/abi";
import { useMemo } from "react";
import { CHAIN } from "@/constants/chain";
import { getChainName } from "@/utils/formatters";
import { genMerkelTree, isInWhitelist, padBuffer } from "@/utils/hashing";
import { infoToast, errorToast, successToast } from "@/pages/_app";

export const MintButton = (props) => {
  const context = useUserContext();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({ address: context?.address });
  const contract = useMemo(
    () => new ethers.Contract(MAD_CARTEL_NFT, MAD_CARTEL_ABI, context?.signer),
    [context?.signer]
  );
  // console.log(context?.data);

  const mint = async () => {
    const weiAmount = ethers.utils.parseEther(context?.data?.cost.toString());
    const mintPriceInWei = weiAmount.mul(context?.mintAmount);
    const ethAmount = ethers.utils.formatEther(mintPriceInWei.toString()).toString();

    if (!context?.address) {
      infoToast("No Wallet Found", "Please connect wallet to mint.");
      return;
    }
    if (
      (context?.choice === "wagmi" && chain?.id !== CHAIN) ||
      (context?.choice === "ramper" && context?.signer?.provider?._network?.chainId !== CHAIN)
    ) {
      infoToast("Incorrect Chain", `Please switch to ${getChainName(CHAIN)}.`);
      return;
    }
    if (context?.data?.paused) {
      infoToast("Cannot Mint Currently", "Minting is currently paused.");
      return;
    }
    if (mintPriceInWei.gt(balance.value)) {
      errorToast(
        "Insufficient Balance",
        `Minting ${context?.mintAmount} costs ${ethAmount} ETH and you have ${balance?.formatted} ETH`
      );
      return;
    }
    if (
      Number(context?.data?.maxSupply) ===
      Number(context?.data?.totalSupply) + Number(context?.mintAmount)
    ) {
      infoToast("Total Supply Minted", "No tokens left to mint.");
      return;
    }
    if (Number(context?.data?.maxSupply) === Number(context?.data?.totalSupply)) {
      infoToast("Total Supply Minted", "No tokens left to mint.");
      return;
    }
    if (context?.data?.presale && !isInWhitelist(context?.address)) {
      infoToast("Not On Whitelist", "During presale minting you must be on the whitelist.");
      return;
    }
    const userMintedAmount = await contract.addressMintedBalance(context?.address);

    if (Number(context?.mintAmount) + Number(userMintedAmount) > Number(context?.data?.nftPerAddressLimit)) {
      infoToast(
        `Each Wallet Can Only Mint ${context?.data?.nftPerAddressLimit}`,
        `Can only mint ${Number(context?.data?.nftPerAddressLimit) - Number(userMintedAmount)} more.`
      );
      return;
    }
    try {
      context?.setIsMinting(true);

      infoToast("Confirm Transaction", "Confirm transaction in wallet to continue.");
      let tx;
      if (context?.data?.presale) {
        const { tree } = genMerkelTree();
        const proof = tree.getHexProof(padBuffer(context?.address));
        tx = await contract.presaleMint(context?.mintAmount, proof, { value: mintPriceInWei });
      } else {
        tx = await contract.mint(context?.mintAmount, { value: mintPriceInWei });
      }
      infoToast("Transaction In Progress", "Transaction being put on chain.");
      const result = await tx.wait();
      if (result.status === 1) {
        await context?.getData();
        successToast("Successfully Minted!", "You now own a MadCartel!");
        context?.setIsMinting(false);
      }
    } catch (error) {
      context?.setIsMinting(false);
      console.log(error);
      if (error.message.includes("user rejected transaction")) {
        errorToast("User Denied Transaction");
        return;
      }
      errorToast("An Error Occurred", "An error occurred while minting.");
    }
  };

  return (
    <GradientButton
      buttonText="Mint"
      fontSize="34px"
      py="6"
      px={{ base: "1.25em", sm: "2em" }}
      letterSpacing=".12em"
      fontFamily="DrukCond, sans-serif"
      isLoading={context?.isMinting}
      onClick={mint}
      loadingText="Minting"
    />
  );
};
