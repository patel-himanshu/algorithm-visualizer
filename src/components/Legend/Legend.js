import React from "react";
import "./Legend.css";

const Legend = () => {
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
    <div className="container legend my-2">
      {legend.map((legendItem, idx) => {
        const { name, nodeClass } = legendItem;
        return (
          <button key={idx} className="mr-2 my-1" style={{ cursor: "default" }}>
            <div className={`node node-legend ${nodeClass}`}></div> {name}
          </button>
        );
      })}
      <div
        className="mt-1 font-weight-bold text-danger"
        style={{ cursor: "default" }}
      >
        Note: View on the maximized window of a computer screen for better
        experience.
      </div>
    </div>
  );
};

export default Legend;
