import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const { row, col, isWall, isSourceNode, isTargetNode } = this.props;

    let otherClassName = "";
    if (isSourceNode) {
      otherClassName = "node-source";
    } else if (isTargetNode) {
      otherClassName = "node-target";
    } else if (isWall) {
      otherClassName = "node-wall";
    }

    return (
      <div id={`node-${row}-${col}`} className={`node ${otherClassName}`}></div>
    );
  }
}
