import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const { row, col, isStartNode, isEndNode } = this.props;
    let otherClassName = "";
    if (isStartNode) {
      otherClassName = "node-start";
    } else if (isEndNode) {
      otherClassName = "node-end";
    }

    return (
      <div id={`node-${row}-${col}`} className={`node ${otherClassName}`}></div>
    );
  }
}
