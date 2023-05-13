import React, { useEffect } from "react";
import Font from "react-font";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import useContractViewFunc from "../../../../../../hooks/useContractViewFunc";
import "./dynamicContractDataItem.css";

export default function DynamicContractDataItem({
  section,
  block,
  item,
  reduxSlice,
  interfaceFunctions,
}) {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state[reduxSlice]);

  const [loading, error, responseMessage] = useContractViewFunc(item);

  return (
    <div className="dynamicContractDataItem " style={{ color: item.color }}>
      <Font family={reduxData.dapp.frontendStructure.font.fontFamily}>
        {item.text}
        {responseMessage}
      </Font>
    </div>
  );
}
