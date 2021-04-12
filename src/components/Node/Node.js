import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      isWallNode,
      isSourceNode,
      isTargetNode,
      onClick,
    } = this.props;

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
  }
}
