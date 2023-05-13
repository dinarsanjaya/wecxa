import React, { useEffect } from "react";
import "./dbCanvas.css";
import { useDispatch } from "react-redux";
import Section from "./section/Section";
import InterfaceSpinnerComponent from "../interfaceSpinnerComponent/InterfaceSpinnerComponent";

export default function DbCanvas({
  inBuilder,
  dapp,
  loadingDapp,
  reduxSlice,
  interfaceFunctions,
}) {
  const dispatch = useDispatch();

  const displaySections = dapp?.frontendStructure.sections.map(
    (section, idx) => {
      return (
        <Section
          key={idx}
          section={section}
          inBuilder={inBuilder}
          reduxSlice={reduxSlice}
          interfaceFunctions={interfaceFunctions}
        />
      );
    }
  );

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
    <>
      {loadingDapp ? (
        <div className="dbCanvas-loading">
          <InterfaceSpinnerComponent color={"#2d6df8"} />
        </div>
      ) : (
        <div className="dbCanvas">{displaySections}</div>
      )}
    </>
  );
}
