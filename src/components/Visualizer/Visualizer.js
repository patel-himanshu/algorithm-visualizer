import React, { Component } from "react";
import Node from "../Node/Node";
import "./Visualizer.css";

const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;
const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 15;

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isDoubleClickActive: false,
    };
  }

  componentDidMount() {
    const grid = getGridLayout();
    this.setState({ grid: grid });
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <div className="grid-layout">
          {grid.map((gridRow, gridRowIdx) => {
            return (
              <div key={gridRowIdx} className="grid-row">
                {gridRow.map((gridCol, gridColIdx) => {
                  const { row, col, isStartNode, isEndNode } = gridCol;
                  return (
                    <Node
                      key={gridColIdx}
                      row={row}
                      col={col}
                      isStartNode={isStartNode}
                      isEndNode={isEndNode}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <button className="btn btn-danger">
          Visualize Dijkstra's Algorithm
        </button>
      </>
    );
  }
}

const getGridLayout = () => {
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

const createNode = (row, col) => {
  return {
    col,
    row,
    isStartNode: row === START_NODE_ROW && col === START_NODE_COL,
    isEndNode: row === END_NODE_ROW && col === END_NODE_COL,
  };
};
