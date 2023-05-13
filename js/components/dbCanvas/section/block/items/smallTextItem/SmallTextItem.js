import React from "react";
import "./smallTextItem.css";
import "../item.css";
import Font from "react-font";
import { useSelector } from "react-redux";

export default function SmallTextItem({ item, reduxSlice }) {
  const reduxData = useSelector((state) => state[reduxSlice]);

  return (
    <div
      className="smallTextItem item"
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
