import { MintAmount } from "./MintAmount";
import { MintButton } from "./MintButton";
import { Box, Stack, HStack, useMediaQuery } from "@chakra-ui/react";
import { useUserContext } from "@/contexts/User";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import smImg from "../../public/images/racers-sm.png";
import bgImg from "../../public/images/racers.png";
import Image from "next/image";

export const MintBox = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const context = useUserContext();
  const [totalPrice, setTotalPrice] = useState(context?.data?.cost.toString());

  useEffect(() => {
    if (context?.data?.cost) {
      const weiAmount = ethers.utils.parseEther(context?.data?.cost.toString());
      const mintPriceInWei = weiAmount.mul(context?.mintAmount);
      const ethAmount = ethers.utils.formatEther(mintPriceInWei.toString()).toString();
      setTotalPrice(ethAmount);
    }
  }, [context?.mintAmount, context?.data?.cost]);

  return (
    <Stack
      pt={{ base: "20px", md: "155px" }}
      alignSelf={{ base: "center", md: "self-start" }}
      spacing="-3"
      align={"center"}
    >
      <Image
        src={isLargerThan768 ? bgImg : smImg}
        alt="racers"
        width={isLargerThan768 ? 699 : 350}
        height={isLargerThan768 ? 335 : 170}
        placeholder="blur"
        draggable={false}
        priority
      />

      <HStack
        w="full"
        spacing="4"
        justifyContent={"space-between"}
        px={{ base: "6", md: "8" }}
        py={{ base: "8", md: "12" }}
        borderRadius="29px"
        bg="linear-gradient(180deg, #1F201F 0%, #000000 100%)"
      >
        <Stack align={"center"} whiteSpace={"nowrap"}>
          <Box color="white" letterSpacing={"2px"} fontSize={{ base: "48px", md: "64px", lg: "72px" }}>
            {context?.data?.totalSupply || "0"}/1000
          </Box>
          <Box color="#B4B4B4" fontSize={{ base: "32px", md: "42px", lg: "52px" }}>
            Total: {totalPrice || "0.00"} ETH
          </Box>
        </Stack>
        <Stack align={"center"} spacing="8">
          <MintAmount />
          <MintButton />
        </Stack>
      </HStack>
    </Stack>
  );
};
