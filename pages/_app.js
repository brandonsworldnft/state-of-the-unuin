import "@/styles/globals.css";

import { UserWrapper } from "../contexts/User";
import { ChakraProvider } from "@chakra-ui/react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { createStandaloneToast } from "@chakra-ui/toast";
import { WagmiConfig, createClient, configureChains, goerli, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ConnectKitProvider } from "connectkit";

const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
      priority: 1,
    }),
  ]
);

const wagmiClient = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "LGB",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        id: "injected",
        shimDisconnect: false,
      },
    }),
  ],
  provider,
});

const { toast } = createStandaloneToast();

export default function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider>
        <ConnectKitProvider theme="light">
          <UserWrapper>
            <Component {...pageProps} />
          </UserWrapper>
        </ConnectKitProvider>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export const infoToast = (title, message) => {
  toast({
    title: title,
    description: message,
    status: "info",
    duration: 3500,
    isClosable: true,
    position: "top-left",
  });
};

export const errorToast = (title, message) => {
  toast({
    title: title,
    description: message,
    status: "error",
    duration: 3500,
    isClosable: true,
    position: "top-left",
  });
};

export const warningToast = (title, message) => {
  toast({
    title: title,
    description: message,
    status: "warning",
    duration: 3500,
    isClosable: true,
    position: "top-left",
  });
};

export const successToast = (title, message) => {
  toast({
    title: title,
    description: message,
    status: "success",
    duration: 3500,
    isClosable: true,
    position: "top-left",
  });
};
