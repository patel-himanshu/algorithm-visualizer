import React, { Component } from "react";
import { dijkstra, getShortestPath } from "../../algorithms/Dijkstra";
import Legend from "../Legend/Legend";
import Node from "../Node/Node";
import "./Visualizer.css";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;
const SOURCE_NODE_ROW = 4;
const SOURCE_NODE_COL = 3;
const TARGET_NODE_ROW = 2;
const TARGET_NODE_COL = 6;

// const BOARD_WIDTH = 3;
// const BOARD_HEIGHT = 3;
// const SOURCE_NODE_ROW = 1;
// const SOURCE_NODE_COL = 0;
// const TARGET_NODE_ROW = 2;
// const TARGET_NODE_COL = 2;

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      pathLength: null,
      numNodesVisited: 0,
      boardRow: 3,
      boardCol: 3,
      sourceRow: 1,
      sourceCol: 0,
      targetRow: 2,
      targetCol: 2,
    };
  }

  // Creates a 2D board array after the mounting phase of the component gets completed
  componentDidMount() {
    const board = getBoardArray();
    this.setState({ board: board });
  }

  animateDijkstra(visitedNodes, pathExists, shortestPathOrder) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathOrder, pathExists);
        }, 20 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        if (
          !(node.row === SOURCE_NODE_ROW && node.col === SOURCE_NODE_COL) &&
          !(node.row === TARGET_NODE_ROW && node.col === TARGET_NODE_COL)
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 20 * i);
    }
  }

  animateShortestPath(shortestPathOrder, pathExists) {
    document.getElementById(
      `node-${SOURCE_NODE_ROW}-${SOURCE_NODE_COL}`
    ).className = "node node-source node-final";

    for (let i = 0; i < shortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = shortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path node-final";
      }, 100 * i);
    }

    document.getElementById(
      `node-${TARGET_NODE_ROW}-${TARGET_NODE_COL}`
    ).className = "node node-target node-final";

    if (pathExists) {
      this.setState({ pathLength: shortestPathOrder.length });
    } else {
      this.setState({ pathLength: Infinity });
    }
  }

  visualize() {
    const { board } = this.state;
    const sourceNode = board[SOURCE_NODE_ROW][SOURCE_NODE_COL];
    const targetNode = board[TARGET_NODE_ROW][TARGET_NODE_COL];
    const { visitedNodes, pathExists } = dijkstra(
      board,
      sourceNode,
      targetNode
    );
    const shortestPathOrder = getShortestPath(targetNode);
    this.animateDijkstra(visitedNodes, pathExists, shortestPathOrder);
    this.setState({ numNodesVisited: visitedNodes.length });
  }

  handleBoardReset() {
    window.location.reload(false);
    // const board = getBoardArray();
    // this.setState({ board: board, pathLength: 0 });
  }

  handleClick(row, col) {
    console.log("Clicked", row, col);
    const { board } = this.state;
    const node = board[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    board[row][col] = newNode;
    // console.log(node);
    // console.log(newNode);
    this.setState({ board });
  }

  render() {
    const {
      board,
      pathLength,
      numNodesVisited,
      boardRow,
      boardCol,
    } = this.state;

    return (
      <>
        {/* Action Buttons */}
        <button
          className="btn btn-warning mt-4 mr-2"
          style={{ border: "2px solid black" }}
          onClick={() => this.visualize()}
          onMouseDown={(e) => e.preventDefault()}
        >
          Visualize Dijkstra's Algorithm
        </button>
        <button
          className="btn btn-danger mt-4 ml-2"
          style={{ border: "2px solid black" }}
          onClick={() => this.handleBoardReset()}
          onMouseDown={(e) => e.preventDefault()}
        >
          Reset Board
        </button>

        {/* Board and Node Details */}
        <div className="container mt-2">
          <h4>
            Board has {boardRow} rows and {boardCol} columns
          </h4>
        </div>

        {/* Board Layout */}
        <div className="mb-2">
          <div className="board-layout">
            {board.map((boardRow, boardRowIdx) => {
              return (
                <div key={boardRowIdx} className="board-row">
                  {boardRow.map((boardCol, boardColIdx) => {
                    const {
                      row,
                      col,
                      isWall,
                      isSourceNode,
                      isTargetNode,
                    } = boardCol;
                    return (
                      <Node
                        key={boardColIdx}
                        row={row}
                        col={col}
                        isWall={isWall}
                        isSourceNode={isSourceNode}
                        isTargetNode={isTargetNode}
                        onClick={(row, col) => this.handleClick(row, col)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          {pathLength !== null && (
            <div className="div">
              <h4 style={{ textShadow: "0 0 10px orange" }}>
                The number of nodes in shortest path between source and target
                node: {pathLength}
              </h4>
              <h5>The total number of nodes visited: {numNodesVisited}</h5>
            </div>
          )}
        </div>

        {/* Legend */}
        <Legend />
      </>
    );
  }
}

// Creates a 2D array of board, of given dimensions
// Each node of the board, has its own set of properties
const getBoardArray = () => {
  const board = [];
  for (let row = 0; row < BOARD_HEIGHT; row++) {
    let currRow = [];
    for (let col = 0; col < BOARD_WIDTH; col++) {
      let node = createNode(row, col);
      currRow.push(node);
    }
    board.push(currRow);
  }
  return board;
};

// Creates a Node object, which combine together to form the board
const createNode = (row, col) => {
  return {
    row,
    col,
    distance: Infinity,
    isVisited: false,
    parentNode: null,
    isWall: false,
    isSourceNode: row === SOURCE_NODE_ROW && col === SOURCE_NODE_COL,
    isTargetNode: row === TARGET_NODE_ROW && col === TARGET_NODE_COL,
  };
};
