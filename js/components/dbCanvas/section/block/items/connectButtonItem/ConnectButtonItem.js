import React, { useEffect, useState } from "react";
import Font from "react-font";
import { useSelector } from "react-redux";
import "../item.css";
import "./connectButtonItem.css";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";

export default function ConnectButtonItem({ reduxSlice, interfaceFunctions }) {
  const reduxData = useSelector((state) => state[reduxSlice]);

  const [metamaskConnected, setMetamaskConnected] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const initiateMetamaskConnection = async () => {
      let provider;
      if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
      }

      const metamaskAccounts = await provider.listAccounts();

      if (metamaskAccounts.length > 0) {
        setMetamaskConnected(true);
        dispatch(interfaceFunctions.toggleWalletConnected({ value: true }));
      } else {
        dispatch(interfaceFunctions.toggleWalletConnected({ value: false }));
      }
    };
    initiateMetamaskConnection();
  }, []);

  const connectMetamask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          // setMetamaskConnected(true);
          dispatch(interfaceFunctions.toggleWalletConnected({ value: true }));
        })
        .catch((err) => {
          console.log("Unable to connect with Metamask");
        });
    }
  };

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        dispatch(interfaceFunctions.toggleWalletConnected({ value: false }));
      }

      if (accounts.length > 0) {
        dispatch(interfaceFunctions.toggleWalletConnected({ value: true }));
      }
    });
  }

  return (
    <button
      className="connectButtonItem item"
      style={{
        backgroundColor:
          reduxData.dapp.frontendStructure.connectButton.backgroundColor,
        color: reduxData.dapp.frontendStructure.connectButton.textColor,
      }}
      onClick={() => {
        connectMetamask();
      }}
    >
      <Font family={reduxData.dapp.frontendStructure.font.fontFamily}>
        {reduxData.dapp.walletConnected ? "Connected" : "Connect"}
      </Font>
    </button>
  );
}
