import React, { useEffect } from "react";
import DbCanvas from "./components/dbCanvas/DbCanvas";
import {
  changeItemDynamicContractDataValueReturnValue,
  changeItemSelectedFuncInputValue,
  changeItemSelectedFuncPrice,
  clearItemSelectedFuncInputValues,
  populateDapposInterfaceDapp,
  toggleWalletConnected,
  updateDynamicContractDataItems,
} from "./redux/dapposInterfaceDapp";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import dappStructure from "./data/dappStructure.json";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.dapposInterfaceDapp);

  const dapp = dappStructure.dapp;

  const interfaceFunctions = {
    changeItemSelectedFuncInputValue: changeItemSelectedFuncInputValue,
    changeItemSelectedFuncPrice: changeItemSelectedFuncPrice,
    clearItemSelectedFuncInputValues: clearItemSelectedFuncInputValues,
    updateDynamicContractDataItems: updateDynamicContractDataItems,
    changeItemDynamicContractDataValueReturnValue:
      changeItemDynamicContractDataValueReturnValue,
    toggleWalletConnected: toggleWalletConnected,
  };

  useEffect(() => {
    dispatch(populateDapposInterfaceDapp(dapp));
  }, []);

  return (
    <DbCanvas
      dapp={reduxData.dapp}
      reduxSlice="dapposInterfaceDapp"
      interfaceFunctions={interfaceFunctions}
    />
  );
}

export default App;
