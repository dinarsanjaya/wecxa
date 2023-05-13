import React from "react";
import "./imageItem.css";
import "../item.css";

export default function ImageItem({ item }) {
  return <img className="imageItem item" src={item.image} />;
}
