"use client";

import {
  ComethProvider,
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
} from "@cometh/connect-sdk";

import { ethers } from "ethers";

import {
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import { CheckIcon } from "@radix-ui/react-icons";
import { db } from "@/lib/db";

import { Card, CardContent, CardTitle } from "@/components/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { env } from "@/env.mjs";
import { configDotenv } from "dotenv";
import { Button } from "./ui/button";
import { AbiMapload } from "@/contracts/mapLoadABI";

configDotenv();

interface ComethWalletIntegration {
  wallet: ComethWallet;
  ConnectionStatus: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
}

export function ConnectWallet({
  ConnectionStatus,
  isConnecting,
  isConnected,
  connect,
  wallet,
}: ComethWalletIntegration): React.ReactNode {
  const wallet_connect_banner = () => {
    if (isConnected) {
      return (
        <>
          <Alert>
            <AlertTitle>
              Your account Wallet is successfully connected
            </AlertTitle>
            <AlertDescription>
              {" "}
              with link:{" "}
              <a
                href={`${process.env.NEXT_PUBLIC_SCAN_URL}address/${wallet.getAddress()}`}
                target="_blank"
              ></a>
            </AlertDescription>
            <CheckIcon width={20} height={20} />
            <a
              href={`${env.PUBLIC_SCAN_URL}address/${wallet.getAddress()}`}
              target="_blank"
            >
              {"Wallet connected"}
            </a>
          </Alert>
        </>
      );
    } else if (isConnecting) {
      return <>{"Getting wallet..."}</>;
    } else {
      return "Get your Wallet";
    }
  };

  return (
    <>
      {!ConnectionStatus ? (
        <Button
          disabled={isConnecting || isConnected || !!ConnectionStatus}
          className="flex items-center justify-center text-black-900 disabled:bg-green"
          onClick={connect}
        >
          {wallet_connect_banner()}
        </Button>
      ) : (
        <p className="flex items-center justify-center text-gray-900 bg-red-50">
          Connection denied
        </p>
      )}
    </>
  );
}

// defining the wallet context along with the states

export const WalletContext = createContext<{
  wallet: ComethWallet | null;
  setWallet: Dispatch<SetStateAction<ComethWallet | null>>;
  provider: ComethProvider | null;
  setProvider: Dispatch<SetStateAction<ComethProvider | null>>;
  tokenContract: ethers.Contract | null;
  setTokenContract: Dispatch<SetStateAction<any | null>>;
}>({
  wallet: null,
  setWallet: () => {},
  provider: null,
  setProvider: () => {},
  tokenContract: null,
  setTokenContract: () => {},
});

export function useWalletContext() {
  const {
    wallet,
    setWallet,
    provider,
    setProvider,
    tokenContract,
    setTokenContract,
  } = useContext(WalletContext);
  return {
    wallet,
    setWallet,
    provider,
    setProvider,
    tokenContract,
    setTokenContract,
  };
}

export function useWalletAuth() {
  const { setWallet, setProvider, wallet, tokenContract, setTokenContract } =
    useWalletContext();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, checkConnectionStatus] = useState<string | null>(
    null,
  );
  const contractAddress = env.TOKEN_CONTRACT_ADDRESS || "";

  function displayError(message: string) {
    checkConnectionStatus(message);
  }

  async function connect() {
    if (!env.COMETH_API) throw new Error("no apiKey provided");
    setIsConnecting(true);
    try {
      const walletAdaptor = new ConnectAdaptor({
        chainId: SupportedNetworks.AMOY,
        apiKey: env.COMETH_API,
      });

      const instance = new ComethWallet({
        authAdapter: walletAdaptor,
        apiKey: env.COMETH_API,
      });
      const localStorageAddress = window.localStorage.getItem("walletAddress");

      if (localStorageAddress) {
        await instance.connect(localStorageAddress);
      } else {
        await instance.connect();
        const walletAddress = instance.getAddress();
        window.localStorage.setItem("walletAddress", walletAddress);
      }

      const instanceProvider = new ComethProvider(instance);

      const contract = new ethers.Contract(
        contractAddress,
        AbiMapload,
        instanceProvider.getSigner(),
      );
      let useremail = (await db.auth.getUserIdentities()).data.identities[0]
        .user_id;

      db.from("User").update({
        username: useremail,
        walletAddress: wallet.getAddress(),
      });

      setTokenContract(contract);
      setIsConnected(true);

      setWallet(instance as any);
      setProvider(instanceProvider as any);
    } catch (e) {
      displayError((e as Error).message);
    } finally {
      setIsConnecting(false);
    }
  }

  async function disconnect() {
    if (wallet) {
      try {
        await wallet!.logout();
        setIsConnected(false);
        setWallet(null);
        setProvider(null);
        setTokenContract(null);
      } catch (e) {
        displayError((e as Error).message);
      }
    }
  }
  return {
    wallet,
    tokenContract,
    connect,
    disconnect,
    isConnected,
    isConnecting,
    connectionStatus,
    checkConnectionStatus,
  };
}

export function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [wallet, setWallet] = useState<ComethWallet | null>(null);
  const [provider, setProvider] = useState<ComethProvider | null>(null);
  const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(
    null,
  );

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
        provider,
        setProvider,
        tokenContract,
        setTokenContract,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
