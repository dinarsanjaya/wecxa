import React from "react";
import "./socialMediaIconsItem.css";
import { FaDiscord } from "react-icons/fa";
import SocialMediaIconItem from "./socialMediaIconItem/SocialMediaIconItem";

export default function SocialMediaIconsItem({ item }) {
  const displayItems = item.icons.map((icon, idx) => {
    return (
      <SocialMediaIconItem key={idx} icon={icon} color={item.iconsColor} />
    );
  });
  return <div className="socialMediaIconsItem">{displayItems}</div>;
}
