import React from "react";
import "./Node.css";

const Node = (props) => {
  const { row, col, isWallNode, isSourceNode, isTargetNode, onClick } = props;

  let otherClassName = "";
  if (isSourceNode) {
    otherClassName = "node-source";
  } else if (isTargetNode) {
    otherClassName = "node-target";
  } else if (isWallNode) {
    otherClassName = "node-wall";
  }

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${otherClassName}`}
      onClick={() => onClick(row, col)}
    ></div>
  );
};

export default Node;
