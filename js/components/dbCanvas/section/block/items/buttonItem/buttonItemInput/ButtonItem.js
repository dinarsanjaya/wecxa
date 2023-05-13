import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useContractFunc from "../../../../../../hooks/useContractFunc";
import Spinner from "react-bootstrap/Spinner";
import Font from "react-font";
import ItemResponseMessage from "../itemsComponents/ItemResponseMessage";
import "./buttonItem.css";
import ButtonItemInput from "./buttonItemInput/ButtonItemInput";
import InterfaceSpinnerComponent from "../../../../../interfaceSpinnerComponent/InterfaceSpinnerComponent";

export default function ButtonItem({
  section,
  block,
  item,
  reduxSlice,
  interfaceFunctions,
}) {
  const reduxData = useSelector((state) => state[reduxSlice]);
  const dispatch = useDispatch();

  const [callContractFunc, loading, error, responseMessage] = useContractFunc(
    item.selectedFunc.contract.address,
    JSON.stringify(item.selectedFunc.contract.abi),
    item,
    item.selectedFunc,
    interfaceFunctions,
    {
      sectionId: section.id,
      blockId: block.id,
      itemId: item.id,
    }
  );

  const displaySelectedFuncInputs = item.selectedFunc.inputs.map(
    (input, idx) => {
      return (
        <ButtonItemInput
          key={idx}
          item={item}
          reduxData={reduxData}
          input={input}
          interfaceFunctions={interfaceFunctions}
          funcParams={{
            sectionId: section.id,
            blockId: block.id,
            itemId: item.id,
          }}
        />
      );
    }
  );

  return (
    <div className="buttonItem item">
      {displaySelectedFuncInputs}
      <button
        className="buttonItem-button"
        style={{
          backgroundColor: item.buttonBackgroundColor,
          color: item.buttonTextColor,
        }}
        onClick={callContractFunc}
      >
        {loading ? (
          <InterfaceSpinnerComponent size={25} color={item.buttonTextColor} />
        ) : (
          <Font family={reduxData.dapp.frontendStructure.font.fontFamily}>
            {item.buttonLabel}
          </Font>
        )}
      </button>

      <div>
        <ItemResponseMessage
          responseMessage={error ? error : responseMessage}
          color={error ? "red" : item.buttonBackgroundColor}
          font={reduxData.dapp.frontendStructure.font.fontFamily}
        />
      </div>
    </div>
  );
}
