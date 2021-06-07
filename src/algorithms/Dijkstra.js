export function dijkstra(board, sourceNode, targetNode) {
  const result = { visitedNodes: [], pathExists: false };
  sourceNode.distance = 0;

  // Creates a 1D array of unvisited nodes, which is sorted
  const priorityQueue = getAllNodes(board);

  while (priorityQueue.length !== 0) {
    // Sorts the priority queue in ascending order w.r.t. distance
    priorityQueue.sort((node1, node2) => node1.distance - node2.distance);

    // Selects the unvisited node with least distance as nearest node,
    // sets it as the latest visited node and removes it from the unvisited nodes array
    const nearestNeighbourNode = priorityQueue.shift();

    if (nearestNeighbourNode.isWallNode) continue;
    if (nearestNeighbourNode.distance === Infinity) {
      result.pathExists = false;
      return result;
    }

    result.visitedNodes.push(nearestNeighbourNode);
    nearestNeighbourNode.isVisited = true;

    if (nearestNeighbourNode === targetNode) {
      result.pathExists = true;
      return result;
    }

    updateNeighbourNodes(board, nearestNeighbourNode);
  }
}

// Creates a 1D array of all nodes of the board
function getAllNodes(board) {
  const allNodes = [];
  for (let row of board) {
    for (let node of row) {
      allNodes.push(node);
    }
  }
  return allNodes;
}

// Get a 1D array of unvisited neighbour nodes of current node
function getUnvisitedNeighbours(board, node) {
  const neighbours = [];
  const { row, col } = node;
  const rowLength = board.length;
  const colLength = board[0].length;

  if (row > 0) neighbours.push(board[row - 1][col]);
  if (col > 0) neighbours.push(board[row][col - 1]);
  if (row < rowLength - 1) neighbours.push(board[row + 1][col]);
  if (col < colLength - 1) neighbours.push(board[row][col + 1]);

  return neighbours.filter((neighbour) => !neighbour.isVisited);
}

// Increments the distance of all unvisited neighbour nodes by 1
// Sets the parent node for all unvisited neighbour nodes
function updateNeighbourNodes(board, node) {
  const unvisitedNeighbours = getUnvisitedNeighbours(board, node);

  for (let neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.parentNode = node;
  }
}

// Returns the shortest path obtained using Dijkstra'a algorithm
// Excludes the source node and the target node
export function getShortestPath(targetNode) {
  const shortestPathOrder = [];
  let node = targetNode;
  while (node != null) {
    shortestPathOrder.unshift(node);
    node = node.parentNode;
  }
  shortestPathOrder.shift();
  shortestPathOrder.pop();
  return shortestPathOrder;
}
