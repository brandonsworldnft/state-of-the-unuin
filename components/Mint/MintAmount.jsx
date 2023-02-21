import { useUserContext } from "@/contexts/User";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { IconButton, HStack, Flex } from "@chakra-ui/react";

export const MintAmount = (props) => {
  const context = useUserContext();
  const mintAmount = context?.mintAmount;

  return (
    <HStack spacing="4" zIndex={"2"}>
      <CounterButton
        isDisabled={mintAmount <= 1 || context?.isMinting}
        onClick={() => context?.setMintAmount(mintAmount - 1)}
        icon={<MinusIcon />}
        border="2px solid #B23635"
      />
      <Flex
        w="3rem"
        h="3rem"
        justify={"center"}
        fontSize={{ base: "36px", sm: "24px" }}
        align={"center"}
        bgColor="rgba(0, 0, 0, 0.75)"
        color="white"
        borderRadius={"xl"}
      >
        {mintAmount}
      </Flex>
      <CounterButton
        isDisabled={
          mintAmount >= Number(context?.data?.maxMintAmount) ||
          Number(context?.data?.maxSupply) <
            Number(context?.data?.totalSupply) + Number(context?.mintAmount) ||
          context?.isMinting
        }
        onClick={() => context?.setMintAmount(mintAmount + 1)}
        icon={<AddIcon />}
        border="2px solid #2687AB"
      />
    </HStack>
  );
};

const CounterButton = ({ ...rest }) => {
  return (
    <IconButton
      _hover={{ bg: "" }}
      _focus={{ bg: "rgba(0, 0, 0, 0.75)" }}
      bgColor="rgba(0, 0, 0, 0.75)"
      color="white"
      borderRadius={"xl"}
      w="3rem"
      h="3rem"
      fontSize={{ base: "lg", md: "md" }}
      {...rest}
    />
  );
};
