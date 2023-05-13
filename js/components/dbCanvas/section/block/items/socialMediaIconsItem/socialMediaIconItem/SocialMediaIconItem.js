import React from "react";
import "./socialMediaIconItem.css";
import { FaDiscord } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";

export default function SocialMediaIconItem({ icon, color }) {
  if (icon.name === "discord") {
    return (
      <FaDiscord
        className="socialMediaIconItem"
        size={55}
        style={{ color: color }}
        onClick={() => window.open(icon.url)}
      />
    );
  } else if (icon.name === "telegram") {
    return (
      <BsTelegram
        size={55}
        className="socialMediaIconItem"
        style={{ color: color }}
        onClick={() => window.open(icon.url)}
      />
    );
  } else if (icon.name === "twitter") {
    return (
      <FaTwitterSquare
        size={55}
        className="socialMediaIconItem"
        style={{ color: color }}
        onClick={() => window.open(icon.url)}
      />
    );
  }
}
