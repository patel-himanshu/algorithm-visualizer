import React, { Component } from "react";
import Node from "../Node/Node";
import "./Visualizer.css";

const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;
const SOURCE_NODE_ROW = 4;
const SOURCE_NODE_COL = 4;
const TARGET_NODE_ROW = 10;
const TARGET_NODE_COL = 15;

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isDoubleClickActive: false,
    };
  }

  // Creates a 2D grid array after the mounting phase of the component gets completed
  componentDidMount() {
    const grid = getGridArray();
    this.setState({ grid: grid });
  }

  visualize() {
    const { grid } = this.state;
    const sourceNode = grid[SOURCE_NODE_ROW][SOURCE_NODE_COL];
    const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
  }

  render() {
    const { grid } = this.state;
    const legend = [
      { name: "Source Node", bgColor: "red" },
      { name: "Target Node", bgColor: "green" },
      { name: "Wall Node", bgColor: "purple" },
      { name: "Shortest Path", bgColor: "yellow" },
    ];

    return (
      <>
        {/* Action Buttons */}
        <button
          className="btn btn-warning mt-4 mr-2"
          style={{ border: "2px solid black" }}
          onClick={this.visualize}
        >
          Visualize Dijkstra's Algorithm
        </button>
        <button
          className="btn btn-danger mt-4 ml-2 disabled"
          style={{ border: "2px solid black" }}
        >
          Reset Grid
        </button>

        {/* Grid Layout */}
        <div className="grid-layout">
          {grid.map((gridRow, gridRowIdx) => {
            return (
              <div key={gridRowIdx} className="grid-row">
                {gridRow.map((gridCol, gridColIdx) => {
                  const { row, col, isSourceNode, isTargetNode } = gridCol;
                  return (
                    <Node
                      key={gridColIdx}
                      row={row}
                      col={col}
                      isSourceNode={isSourceNode}
                      isTargetNode={isTargetNode}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="btn" style={{ cursor: "default" }}>
          <div className="mb-1 font-weight-bold" style={{ cursor: "default" }}>
            Legend:
          </div>
          {legend.map((legendItem) => {
            const { name, bgColor } = legendItem;
            return (
              <button className="mr-2" style={{ cursor: "default" }}>
                <div
                  className="node node-legend"
                  style={{ backgroundColor: `${bgColor}` }}
                ></div>{" "}
                {name}
              </button>
            );
          })}
        </div>
      </>
    );
  }
}

// Creates a 2D array of grid, of given dimensions
// Each node of the grid, has its own set of properties
const getGridArray = () => {
  const grid = [];
  for (let row = 0; row < GRID_HEIGHT; row++) {
    let currRow = [];
    for (let col = 0; col < GRID_WIDTH; col++) {
      let node = createNode(row, col);
      currRow.push(node);
    }
    grid.push(currRow);
  }
  return grid;
};

// Creates a Node object, which combine together to form the grid
const createNode = (row, col) => {
  return {
    col,
    row,
    distance: Infinity,
    isVisited: false,
    parentNode: null,
    isSourceNode: row === SOURCE_NODE_ROW && col === SOURCE_NODE_COL,
    isTargetNode: row === TARGET_NODE_ROW && col === TARGET_NODE_COL,
  };
};
