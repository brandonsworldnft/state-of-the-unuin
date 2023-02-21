import { useEffect, useState, useRef } from "react";
import { multicall } from "@wagmi/core";
import { MAD_CARTEL_NFT } from "@/constants/contracts";
import { MAD_CARTEL_ABI } from "@/constants/abi";
import { ethers } from "ethers";

export const useNFTData = () => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const callingRef = useRef(false);

  const getData = async () => {
    try {
      callingRef.current = true;
      setIsError(false);
      setIsLoading(true);

      const contract = {
        address: MAD_CARTEL_NFT,
        abi: MAD_CARTEL_ABI,
      };

      const callData = await multicall({
        contracts: [
          {
            ...contract,
            functionName: "cost",
          },
          {
            ...contract,
            functionName: "maxMintAmount",
          },
          {
            ...contract,
            functionName: "paused",
          },
          {
            ...contract,
            functionName: "maxSupply",
          },
          {
            ...contract,
            functionName: "totalSupply",
          },
          {
            ...contract,
            functionName: "nftPerAddressLimit",
          },
          {
            ...contract,
            functionName: "presale",
          },
        ],
      });

      setData({
        cost: ethers.utils.formatEther(callData[0]?.toString()),
        maxMintAmount: callData[1]?.toString(),
        paused: callData[2],
        maxSupply: callData[3]?.toString(),
        totalSupply: callData[4]?.toString(),
        nftPerAddressLimit: callData[5]?.toString(),
        presale: callData[6],
      });
      setIsLoading(false);
      callingRef.current = false;
    } catch (error) {
      callingRef.current = false;
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!callingRef.current && data === undefined) {
      getData();
    }
  }, [data, isError]);

  return {
    data,
    isLoading,
    isError,
    getData,
  };
};
