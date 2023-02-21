import { getRamperSigner, getUser, openWallet, signIn, signOut } from "@ramper/ethereum";
import { useDisconnect, useAccount, useProvider } from "wagmi";
import { getEllipsisTxt } from "../../utils/formatters";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";
import { useUserContext } from "../../contexts/User";
import { GradientButton } from "../Button/GradientButton";

export const RamperButton = () => {
  const context = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const provider = useProvider();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const ramperUser = typeof window === "object" ? getUser() : undefined;

  const handleSignIn = async () => {
    try {
      if (isConnected) disconnect(); //disconnect wagmi if connected
      const user = await signIn();
      if (user.method === "ramper" || user.method === "wallet") {
        const ramperSigner = await getRamperSigner(provider);
        context.setSigner(ramperSigner);
        context.setAddress(user?.user?.wallets?.ethereum?.publicKey);
        context.handleSetChoice("ramper");
      }
    } catch (error) {
      context.setSigner(undefined);
      context.handleSetChoice(undefined);
      context.setAddress(undefined);
    }
  };

  const handleSignOut = () => {
    signOut();
    context.setSigner(undefined);
    context.handleSetChoice(undefined);
    context.setAddress(undefined);
    onClose();
  };

  const handleOpenWallet = () => {
    openWallet();
    onClose();
  };

  const handleClick = () => {
    if (ramperUser === null || context.choice === undefined) {
      handleSignIn();
    } else {
      onOpen();
    }
  };

  return (
    <>
      <GradientButton
        onClick={handleClick}
        fontSize={"xl"}
        buttonText={
          ramperUser === null || context.choice === undefined
            ? "Sign In"
            : getEllipsisTxt(ramperUser?.wallets?.ethereum?.publicKey)
        }
        fontFamily={"DrukCond"}
      />
      {isOpen && (
        <RamperModal
          isOpen={isOpen}
          onClose={onClose}
          handleSignOut={handleSignOut}
          handleOpenWallet={handleOpenWallet}
        />
      )}
    </>
  );
};

const RamperModal = ({ isOpen, onClose, handleOpenWallet, handleSignOut }) => {
  return (
    <Modal blockScrollOnMount={false} onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent fontFamily={"DrukCond"} borderRadius={"2xl"}>
        <ModalHeader color="#1B4BFF" fontSize={"2xl"} p="6">
          Account
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={"center"} color="#2F3033">
          <Stack spacing="4">
            <GradientButton onClick={handleOpenWallet} buttonText={"View Wallet"} />
            <GradientButton onClick={handleSignOut} buttonText={"Sign Out"} />
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
