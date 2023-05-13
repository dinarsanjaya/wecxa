import React from "react";
import "./section.css";
import Block from "./block/Block";

export default function Section({
  section,
  inBuilder,
  reduxSlice,
  interfaceFunctions,
}) {
  const displayBlocks = section.blocks.map((block, idx) => {
    return (
      <Block
        key={idx}
        section={section}
        block={block}
        inBuilder={inBuilder}
        reduxSlice={reduxSlice}
        interfaceFunctions={interfaceFunctions}
      />
    );
  });
  return (
    <div
      className="section"
      style={{ backgroundColor: section.backgroundColor }}
    >
      {displayBlocks}
    </div>
  );
}
