import React from "react";
import "./block.css";
import ButtonItem from "./items/buttonItem/ButtonItem";
import ConnectButtonItem from "./items/connectButtonItem/ConnectButtonItem";
import DynamicContractDataItem from "./items/dynamicContractDataItem/DynamicContractDataItem";
import DynamicContractDataItemConfig from "./items/dynamicContractDataItem/DynamicContractDataItem";
import ImageItem from "./items/imageItem/ImageItem";
import LargeTextItem from "./items/largeTextItem/LargeTextItem";
import SmallTextItem from "./items/smallTextItem/SmallTextItem";
import SocialMediaIconsItem from "./items/socialMediaIconsItem/SocialMediaIconsItem";

export default function Block({
  section,
  block,
  inBuilder,
  reduxSlice,
  interfaceFunctions,
}) {
  const displayItems = block.items.map((item, idx) => {
    if (item.type === "largeText") {
      return <LargeTextItem key={idx} item={item} reduxSlice={reduxSlice} />;
    } else if (item.type === "button") {
      return (
        <ButtonItem
          key={idx}
          section={section}
          block={block}
          item={item}
          reduxSlice={reduxSlice}
          interfaceFunctions={interfaceFunctions}
        />
      );
    } else if (item.type === "connectButton") {
      return (
        <ConnectButtonItem
          key={idx}
          item={item}
          reduxSlice={reduxSlice}
          interfaceFunctions={interfaceFunctions}
        />
      );
    } else if (item.type === "image") {
      return <ImageItem key={idx} item={item} />;
    } else if (item.type === "smallText") {
      return <SmallTextItem key={idx} item={item} reduxSlice={reduxSlice} />;
    } else if (item.type === "socialMediaIcons") {
      return <SocialMediaIconsItem key={idx} item={item} />;
    } else if (item.type === "dynamicContractData") {
      return (
        <DynamicContractDataItem
          key={idx}
          section={section}
          block={block}
          item={item}
          reduxSlice={reduxSlice}
          interfaceFunctions={interfaceFunctions}
        />
      );
    }
  });

  return (
    <div className="block" style={{ backgroundColor: block.backgroundColor }}>
      {displayItems}
    </div>
  );
}
