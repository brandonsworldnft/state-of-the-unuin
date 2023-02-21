import { ConnectKitButton } from "connectkit";
import { GradientButton } from "../Button/GradientButton";

export const ConnectkitButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <GradientButton
            onClick={() => {
              show();
            }}
            w="full"
            fontSize={"xl"}
            fontFamily={"DrukCond"}
            buttonText={isConnected ? "View Wallet" : "Connect"}
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};
