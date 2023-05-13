import React from "react";
import "./interfaceSpinnerComponent.css";
import CircleLoader from "react-spinners/ClipLoader";

export default function InterfaceSpinnerComponent({ color, size }) {
  return <CircleLoader size={size} color={color} />;
}
