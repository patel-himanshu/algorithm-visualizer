import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const { row, col, isSourceNode, isTargetNode } = this.props;

    let otherClassName = "";
    if (isSourceNode) {
      otherClassName = "node-source";
    } else if (isTargetNode) {
      otherClassName = "node-target";
    }

    return (
      <div id={`node-${row}-${col}`} className={`node ${otherClassName}`}></div>
    );
  }
}
