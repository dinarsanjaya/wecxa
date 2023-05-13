import React from "react";
import Font from "react-font";
import { useSelector } from "react-redux";
import "../item.css";
import "./largeTextItem.css";

export default function LargeTextItem({ item, reduxSlice }) {
  const reduxData = useSelector((state) => state[reduxSlice]);

  return (
    <div
      className="largeTextItem item"
      style={{
        backgroundColor: item.backgroundColor,
        color: item.textColor,
      }}
    >
      <Font
        family={
          item.font.fontFamily === "default"
            ? reduxData.dapp.frontendStructure.font.fontFamily
            : item.font.fontFamily
        }
      >
        {item.text}
      </Font>
    </div>
  );
}
