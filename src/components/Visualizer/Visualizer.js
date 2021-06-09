import { useState, useEffect } from "react";
import { dijkstra, getShortestPath } from "../../algorithms/Dijkstra";
import Node from "../Node/Node";
import "./Visualizer.css";

const BOARD_HEIGHT = 10;
const BOARD_WIDTH = Math.floor(window.innerWidth / 40);
const SOURCE_NODE_ROW = Math.floor(Math.random() * BOARD_HEIGHT);
const SOURCE_NODE_COL = Math.floor(Math.random() * BOARD_WIDTH);
const TARGET_NODE_ROW = Math.floor(Math.random() * BOARD_HEIGHT);
const TARGET_NODE_COL = Math.floor(Math.random() * BOARD_WIDTH);

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
    isWallNode: false,
    isSourceNode: row === SOURCE_NODE_ROW && col === SOURCE_NODE_COL,
    isTargetNode: row === TARGET_NODE_ROW && col === TARGET_NODE_COL,
  };
};

const Visualizer = () => {
  const [board, setBoard] = useState([]);
  const [isVisualizationStarted, setIsVisualizationStarted] = useState(false);
  const [pathLength, setPathLength] = useState(null);
  const [numNodesVisited, setNumNodesVisited] = useState(0);

  const [boardRow, setBoardRow] = useState(BOARD_WIDTH);
  const [boardCol, setBoardCol] = useState(BOARD_HEIGHT);
  const [sourceRow, setSourceRow] = useState(SOURCE_NODE_ROW);
  const [sourceCol, setSourceCol] = useState(SOURCE_NODE_COL);
  const [targetRow, setTargetRow] = useState(TARGET_NODE_ROW);
  const [targetCol, setTargetCol] = useState(TARGET_NODE_COL);

  // Creates a 2D board array after the mounting phase of the component gets completed
  useEffect(() => {
    const board = getBoardArray();
    setBoard(board);
  }, []);

  const animateDijkstra = (visitedNodes, pathExists, shortestPathOrder) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animateShortestPath(shortestPathOrder, pathExists);
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
  };

  const animateShortestPath = (shortestPathOrder, pathExists) => {
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
      setPathLength(shortestPathOrder.length);
    } else {
      setPathLength(Infinity);
    }
  };

  const visualize = () => {
    setIsVisualizationStarted(true);
    const sourceNode = board[SOURCE_NODE_ROW][SOURCE_NODE_COL];
    const targetNode = board[TARGET_NODE_ROW][TARGET_NODE_COL];
    const { visitedNodes, pathExists } = dijkstra(
      board,
      sourceNode,
      targetNode
    );
    const shortestPathOrder = getShortestPath(targetNode);
    animateDijkstra(visitedNodes, pathExists, shortestPathOrder);
    setNumNodesVisited(visitedNodes.length);
  };

  // =========== EVENT HANDLERS ===========

  const handleRandomWallsCreation = () => {
    const wallsNum = 1;
    // const wallsNum = Math.floor(BOARD_HEIGHT * BOARD_WIDTH * 0.4);
    // console.log(BOARD_HEIGHT * BOARD_WIDTH, wallsNum);
    let i = 0;
    while (i < wallsNum) {
      let wallRow = Math.floor(Math.random() * BOARD_HEIGHT);
      let wallCol = Math.floor(Math.random() * BOARD_WIDTH);
      let node = board[wallRow][wallCol];

      if (node.isSourceNode || node.isTargetNode) {
        console.log(i, "pass");
        continue;
      } else {
        handleNodeClick(wallRow, wallCol);
        i++;
        // console.log(i, wallRow, wallCol);
      }
    }
  };

  const handleBoardReset = () => {
    window.location.reload(false);
    setIsVisualizationStarted(false);
    // const board = getBoardArray();
    // setBoard(board);
    // setPathLength(0);
  };

  const handleNodeClick = (row, col) => {
    if (!isVisualizationStarted) {
      let newBoard = board.map((rowElem, rowIdx) => {
        if (rowIdx === row) {
          let newRow = rowElem.map((colElem, colIdx) => {
            if (colIdx === col) {
              return {
                ...colElem,
                isWallNode: !colElem.isWallNode,
              };
            } else {
              return colElem;
            }
          });
          return newRow;
        } else {
          return rowElem;
        }
      });
      setBoard(newBoard);
    }
  };

  // Determines the final message shown after visualization is completed
  let finalMessage =
    pathLength === Infinity
      ? "There is no path connecting the source and target node"
      : pathLength === 0
      ? "The source and target nodes are adjacent to each other"
      : `The number of nodes in shortest path between source and target
    node: ${pathLength}`;

  return (
    <div className="visualizer">
      {/* Action Buttons */}
      <button
        className="btn btn-warning mt-4 mr-2"
        style={{ border: "2px solid black" }}
        onClick={() => visualize()}
        onMouseDown={(e) => e.preventDefault()}
        disabled={isVisualizationStarted}
      >
        Visualize Dijkstra's Algorithm
      </button>
      <button
        className="btn btn-secondary mt-4"
        style={{ border: "2px solid black " }}
        onClick={() => handleRandomWallsCreation()}
        onMouseDown={(e) => e.preventDefault()}
        disabled={isVisualizationStarted}
      >
        Create Random Wall
        {/* Create Random Walls */}
      </button>
      <button
        className="btn btn-danger mt-4 ml-2"
        style={{ border: "2px solid black" }}
        onClick={() => handleBoardReset()}
        onMouseDown={(e) => e.preventDefault()}
      >
        Reset Board
      </button>

      {/* Board Details */}
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
                  const { row, col, isWallNode, isSourceNode, isTargetNode } =
                    boardCol;
                  return (
                    <Node
                      key={boardColIdx}
                      row={row}
                      col={col}
                      isWallNode={isWallNode}
                      isSourceNode={isSourceNode}
                      isTargetNode={isTargetNode}
                      onClick={(row, col) => handleNodeClick(row, col)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Final message after visualization completion */}
        {pathLength !== null && (
          <div className="message">
            <h4 style={{ textShadow: "0 0 10px orange" }}>{finalMessage}</h4>
            <h5>
              The total number of nodes visited (including both nodes):{" "}
              {numNodesVisited}
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visualizer;
