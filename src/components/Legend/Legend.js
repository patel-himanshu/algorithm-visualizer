import React, { Component } from "react";

export default class Legend extends Component {
  render() {
    const legend = [
      { name: "Source Node", nodeClass: "node-source" },
      { name: "Target Node", nodeClass: "node-target" },
      { name: "Wall Node", nodeClass: "node-wall" },
      { name: "Unvisited Node", nodeClass: "node" },
      { name: "Visited Node", nodeClass: "node-visited" },
      {
        name: "Shortest Path",
        nodeClass: "node-shortest-path node-legend-final",
      },
    ];

    return (
      <div className="container legend mt-3 mb-3">
        <div className="mb-1 font-weight-bold" style={{ cursor: "default" }}>
          Legend:
        </div>
        {legend.map((legendItem, idx) => {
          const { name, nodeClass } = legendItem;
          return (
            <button key={idx} className="mr-2" style={{ cursor: "default" }}>
              <div className={`node node-legend ${nodeClass}`}></div> {name}
            </button>
          );
        })}
      </div>
    );
  }
}
