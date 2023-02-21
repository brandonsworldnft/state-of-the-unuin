import { useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useUserContext } from "../../contexts/User";
import { ConnectModal } from "./ConnectModal";
import { GradientButton } from "../Button/GradientButton";
import { CurrentUser } from "./CurrentUser";

export const Connect = () => {
  const context = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (context.choice !== undefined) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  if (context.choice === undefined) {
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
          buttonText="Connect Wallet"
        />
        {isOpen && <ConnectModal onClose={onClose} isOpen={isOpen} />}
      </>
    );
  }
  return <CurrentUser />;
};
