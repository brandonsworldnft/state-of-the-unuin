import { getEllipsisTxt } from "../../utils/formatters";
import { useUserContext } from "../../contexts/User";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Stack,
  HStack,
  useClipboard,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import { ConnectkitButton } from "./ConnectkitButton";
import { useDisconnect } from "wagmi";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { openWallet, signOut } from "@ramper/ethereum";
import { GradientButton } from "../Button/GradientButton";

export const CurrentUser = () => {
  const context = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy, hasCopied } = useClipboard(context?.address);
  const { disconnect } = useDisconnect();

  const handleSignOut = () => {
    if (context.choice === "ramper") {
      signOut();
    }
    if (context.choice === "wagmi") {
      disconnect();
    }
    context.setSigner(undefined);
    context.handleSetChoice(undefined);
    context.setAddress(undefined);
    onClose();
  };

  const handleOpenWallet = () => {
    openWallet();
    onClose();
  };

  return (
    <>
      <GradientButton
        onClick={onOpen}
        fontFamily="DrukCond, sans-serif"
        textTransform="uppercase"
        fontSize={{
          base: "22px",
          md: "34px",
        }}
        p="16px 24px"
        h={{
          base: "39px",
          md: "75px",
        }}
        w={{
          base: "147px",
          md: "292px",
        }}
        buttonText={getEllipsisTxt(context?.address)}
      />

      <Modal blockScrollOnMount={false} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          fontFamily={"DrukCond"}
          borderRadius={"2xl"}
          color="white"
          letterSpacing={{ base: ".03em", md: ".06em" }}
          bg="linear-gradient(180deg, #1F201F 0%, #000000 100%)"
        >
          <ModalHeader fontSize={"2xl"} px="6" pt="6" pb="0"></ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"start"}>
            <Stack fontWeight={700} fontSize="lg" spacing="4">
              <HStack>
                <Box>Wallet: {getEllipsisTxt(context?.address)}</Box>
                {hasCopied ? (
                  <CheckIcon color="limegreen" />
                ) : (
                  <CopyIcon cursor={"pointer"} onClick={onCopy} />
                )}
              </HStack>
              <Stack gap="6" pt="2">
                {context.choice === "ramper" && (
                  <>
                    <GradientButton
                      fontSize={"xl"}
                      w="full"
                      buttonText="View Wallet"
                      onClick={handleOpenWallet}
                    />
                  </>
                )}
                {context.choice === "wagmi" && (
                  <Flex onClick={onClose}>
                    <ConnectkitButton />
                  </Flex>
                )}
                <GradientButton fontSize={"xl"} buttonText="Sign Out" onClick={handleSignOut} />
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
