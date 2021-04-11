import React, { Component } from "react";
import { dijkstra, getShortestPath } from "../../algorithms/Dijkstra";
import Legend from "../Legend/Legend";
import Node from "../Node/Node";
import "./Visualizer.css";

// const BOARD_WIDTH = 10;
// const BOARD_HEIGHT = 10;
// const SOURCE_NODE_ROW = 4;
// const SOURCE_NODE_COL = 3;
// const TARGET_NODE_ROW = 2;
// const TARGET_NODE_COL = 6;

const BOARD_WIDTH = 3;
const BOARD_HEIGHT = 3;
const SOURCE_NODE_ROW = 1;
const SOURCE_NODE_COL = 0;
const TARGET_NODE_ROW = 2;
const TARGET_NODE_COL = 2;

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      pathLength: 0,
      boardDims: { row: 3, col: 3 },
      source: { row: 1, col: 0 },
      target: { row: 2, col: 2 },
      // boardDims: { row: BOARD_HEIGHT, col: BOARD_WIDTH },
      // source: { row: SOURCE_NODE_ROW, col: SOURCE_NODE_COL },
      // target: { row: TARGET_NODE_ROW, col: TARGET_NODE_COL },
    };
  }

  // Creates a 2D board array after the mounting phase of the component gets completed
  componentDidMount() {
    const board = getBoardArray();
    this.setState({ board: board });
  }

  animateDijkstra(visitedNodes, shortestPathOrder) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathOrder);
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

  animateShortestPath(shortestPathOrder) {
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
    this.setState({ pathLength: shortestPathOrder.length });
  }

  visualize() {
    const { board } = this.state;
    const sourceNode = board[SOURCE_NODE_ROW][SOURCE_NODE_COL];
    const targetNode = board[TARGET_NODE_ROW][TARGET_NODE_COL];
    const visitedNodes = dijkstra(board, sourceNode, targetNode);
    const shortestPathOrder = getShortestPath(targetNode);
    this.animateDijkstra(visitedNodes, shortestPathOrder);
  }

  handleBoardReset() {
    window.location.reload(false);
    // const board = getBoardArray();
    // this.setState({ board: board, pathLength: 0 });
  }

  // handleClick(row, col) {
  //   console.log("Clicked");
  //   const { board } = this.state;
  //   const node = board[row][col];
  //   const newNode = {
  //     ...node,
  //     isWall: !node.isWall,
  //   };
  //   board[row][col] = newNode;
  //   console.log(node);
  //   console.log(newNode);
  //   this.setState({ board });
  // }

  onFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { board, pathLength, boardDims, source, target } = this.state;

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
            Board has {boardDims.row} rows and {boardDims.col} columns
          </h4>
          <form className="row d-flex justify-content-center align-items-center">
            <div className="d-">
              <label htmlFor="source.row">Source Node's Row:</label>
              <input
                className="form-control"
                type="number"
                id="source.row"
                name="source.row"
                min="1"
                max={boardDims.row}
                value={source.row + 1}
                onChange={this.onFieldChange}
              />
            </div>
            <div className="d-">
              <label htmlFor="source.col">Source Node's Col:</label>
              <input
                className="form-control"
                type="number"
                id="source.col"
                name="source.col"
                min="1"
                max={boardDims.col}
                value={source.col + 1}
                onChange={this.onFieldChange}
              />
            </div>
            <div className="d-">
              <label htmlFor="target.row">Target Node's Row:</label>
              <input
                className="form-control"
                type="number"
                id="target.row"
                name="target.row"
                min="1"
                max={boardDims.row}
                value={target.row + 1}
                onChange={this.onFieldChange}
              />
            </div>
            <div className="d-">
              <label htmlFor="target.col">Target Node's Col:</label>
              <input
                className="form-control"
                type="number"
                id="target.col"
                name="target.col"
                min="1"
                max={boardDims.col}
                value={target.col + 1}
                onChange={this.onFieldChange}
              />
            </div>
          </form>
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
                        // onClick={() => this.handleClick(row, col)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <h3 style={{ textShadow: "0 0 10px orange" }}>
            The number of nodes between source and target node: {pathLength}
          </h3>
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
