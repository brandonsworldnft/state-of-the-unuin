import { useEffect, createContext, useContext, useState } from "react";
import {
  useAccount,
  useConnect,
  useNetwork,
  useSwitchNetwork,
  useSigner as useWagmiSigner,
  useProvider,
} from "wagmi";
import { CHAIN } from "../constants/chain";
import { useNFTData } from "@/hooks/useNFTData";
import { getRamperSigner, init, WALLET_PROVIDER, AUTH_PROVIDER, getUser, signOut } from "@ramper/ethereum";

const UserContext = createContext();

export const UserWrapper = ({ children }) => {
  const { chain } = useNetwork();
  const provider = useProvider();
  const { switchNetwork } = useSwitchNetwork();
  const { connect, connectors } = useConnect();
  const { data: wagmiSigner } = useWagmiSigner();
  const {
    address: wagmiAddress,
    isConnected,
    isConnecting,
    connector,
  } = useAccount({
    onDisconnect: () => {
      window.localStorage.setItem("brandons-world-connector-choice", null);
    },
  });
  const { data, isLoading, isError, getData } = useNFTData();
  const [address, setAddress] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [choice, setChoice] = useState(undefined);
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    if (isConnected && getUser() !== null) {
      signOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isConnecting]);

  useEffect(() => {
    if (isConnected && wagmiAddress && (wagmiSigner || wagmiSigner !== null)) {
      window.localStorage.setItem("brandons-world-connector-choice", connector.id);
      handleSetChoice("wagmi");
      setAddress(wagmiAddress);
      setSigner(wagmiSigner);
    }
    if (!isConnected && !wagmiAddress && (!wagmiSigner || wagmiSigner === null)) {
      handleSetChoice(undefined);
      setAddress(undefined);
      setSigner(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wagmiAddress, isConnected, wagmiSigner]);

  const handleSetChoice = (type) => {
    setChoice(type);
    window.localStorage.setItem("brandons-world-connect-choice", type);
  };

  useEffect(() => {
    init({
      appName: "Brandons World Nfts",
      walletProviders: [WALLET_PROVIDER.METAMASK],
      theme: "dark",
      network: "goerli",
      authProviders: [
        AUTH_PROVIDER.GOOGLE,
        AUTH_PROVIDER.FACEBOOK,
        AUTH_PROVIDER.TWITTER,
        AUTH_PROVIDER.APPLE,
        AUTH_PROVIDER.EMAIL,
      ],
    });
  }, []);

  const connectRamperUser = async () => {
    const user = getUser();
    if (user) {
      setAddress(user?.wallets?.ethereum?.publicKey);
      handleSetChoice("ramper");
      const ramperSigner = await getRamperSigner(provider);
      setSigner(ramperSigner);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("brandons-world-connect-choice") === "ramper") {
      connectRamperUser();
    }
  }, [provider]);

  useEffect(() => {
    if (wagmiAddress && chain.id !== CHAIN) {
      switchNetwork({ chainId: CHAIN });
    }
  }, [chain, wagmiAddress]);

  useEffect(() => {
    if (window.localStorage.getItem("brandons-world-connect-choice") === "wagmi" && (!address || !signer)) {
      const connectorId = window.localStorage.getItem("brandons-world-connector-choice");
      if (!wagmiAddress && (connectorId !== "null" || connectorId !== null)) {
        const type = connectors.find((i) => i.id === connectorId);
        if (!isConnected && type) {
          connect({ connector: type });
        }
      }
      setSigner(wagmiSigner);
      setAddress(wagmiAddress);
      setChoice("wagmi");
    }
  }, [wagmiAddress, wagmiSigner]);

  useEffect(() => {
    if (isConnected && wagmiAddress && connector) {
      window.localStorage.setItem("brandons-world-connector-choice", connector?.id);
    }
  }, [wagmiAddress, isConnected, connector]);

  const settings = {
    data,
    isLoading,
    isError,
    getData,
    address,
    setAddress,
    signer,
    setSigner,
    choice,
    handleSetChoice,
    mintAmount,
    setMintAmount,
    isMinting,
    setIsMinting,
  };

  return <UserContext.Provider value={settings}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
