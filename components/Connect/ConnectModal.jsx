import { ModalFooter } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Box,
} from "@chakra-ui/react";
import { ConnectkitButton } from "./ConnectkitButton";
import { RamperButton } from "./RamperButton";

export const ConnectModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal blockScrollOnMount={false} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          fontFamily={"DrukCond"}
          color="white"
          borderRadius={"2xl"}
          bg="linear-gradient(180deg, #1F201F 0%, #000000 100%)"
        >
          <ModalHeader letterSpacing={{ base: ".03em", md: ".06em" }} fontSize={"3xl"} p="6">
            Connect Wallet
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody letterSpacing={{ base: ".03em", md: ".06em" }} fontSize={"3xl"} textAlign={"center"}>
            <Stack spacing="4">
              <Stack>
                <Box>Have a wallet already?</Box>
                <ConnectkitButton closeConnectModal={onClose} />
              </Stack>
              <Stack onClick={onClose}>
                <Box>Need a wallet? Create one instantly!</Box>
                <RamperButton closeConnectModal={onClose} />
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
