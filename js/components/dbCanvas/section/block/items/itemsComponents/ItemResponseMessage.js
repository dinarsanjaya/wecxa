import React from "react";
import Font from "react-font";
import "./itemResponseMessage.css";

export default function ItemResponseMessage({ responseMessage, color, font }) {
  return (
    <div className="itemResponseMessage" style={{ color: color }}>
      <Font family={font}>{responseMessage}</Font>
    </div>
  );
}
