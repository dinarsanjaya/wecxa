import React from "react";
import Font from "react-font";
import { useDispatch } from "react-redux";

import "./buttonItemInput.css";

export default function ButtonItemInput({
  item,
  reduxData,
  input,
  interfaceFunctions,
  funcParams,
}) {
  const dispatch = useDispatch();

  const onChangeFunc = (input, e) => {
    dispatch(
      interfaceFunctions.changeItemSelectedFuncInputValue({
        ...funcParams,
        inputId: input.id,
        textValue: e.target.value,
      })
    );

    // if (
    //   item.selectedFunc.price.isInputDependant.value &&
    //   item.selectedFunc.price.isInputDependant.input.id === input.id
    // ) {
    //   let adjustedTextValue = "";
    //   if (item.selectedFunc.price.isInputDependant.type === "inputValue") {
    //     adjustedTextValue = e.target.value;
    //     dispatch(
    //       interfaceFunctions.changeItemSelectedFuncPrice({
    //         ...funcParams,
    //         textValue: adjustedTextValue,
    //       })
    //     );
    //   }
    //   if (
    //     item.selectedFunc.price.isInputDependant.type ===
    //       "multipleOfInputValue" &&
    //     parseInt(e.target.value) > 0
    //   ) {
    //     adjustedTextValue = (
    //       item.selectedFunc.price.priceValue * e.target.value
    //     ).toString();
    //     dispatch(
    //       interfaceFunctions.changeItemSelectedFuncPrice({
    //         ...funcParams,
    //         textValue: adjustedTextValue,
    //       })
    //     );
    //   }
    // }
  };

  return (
    // <Font family={reduxData.dapp.frontendStructure.font.fontFamily}>
    <input
      className="buttonItemInput"
      style={{
        fontFamily: reduxData.dapp.frontendStructure.font.fontFamily,
      }}
      type={input.type.includes("uint") ? "number" : "text"}
      value={input.value}
      placeholder={
        input.placeholder.charAt(0).toUpperCase() + input.placeholder.slice(1)
      }
      onChange={(e) => {
        onChangeFunc(input, e);
      }}
    />
  );
}
