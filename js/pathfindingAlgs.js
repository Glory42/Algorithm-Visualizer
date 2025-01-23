document.getElementById('dijkstra-btn').addEventListener('click', dijkstra);
document.getElementById('a-star-btn').addEventListener('click', aStar);
document
    .getElementById('clear-grid-btn')
    .addEventListener('click', createGrid);

const gridContainer = document.querySelector('.grid-container');
const rows = 20;
const cols = 20;
let grid = [];
let startNode = null;
let endNode = null;

// Create the grid
function createGrid(){
    grid = [];
    gridContainer.innerHTML = '';
    for(let row = 0; row < rows; row++){
        const rowArray = [];
        for(let col = 0; col < cols; col++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            gridContainer.appendChild(cell);
            rowArray.push({
                row,
                col,
                isStart: false,
                isEnd: false,
                isWall: false,
                distance: Infinity,
                heuristic: 0,
                previousNode: null,
            });
                cell.addEventListener('click', () => handleCellClick(row, col));
        }
        grid.push(rowArray);
    }
}

// Handle cell click
function handleCellClick(row, col){
    const cell = grid[row][col];
    const element = document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`
    );

    if(!startNode){
        startNode = cell;
        cell.isStart = true;
        element.classList.add('start');
    }
    else if(!endNode){
        endNode = cell;
        cell.isEnd = true;
        element.classList.add('end');
    }
    else{
        cell.isWall = !cell.isWall;
        element.classList.toggle('wall');        
    }
}

createGrid();

//Dijkstra’s Algorithm
function dijkstra() {
    if(!startNode || !endNode) return alert('Set start and end nodes first!');

    const unvisitedNodes = [];
    startNode.distance = 0;
    
    grid.flat().forEach(node => unvisitedNodes.push(node));

    while(unvisitedNodes.length > 0){
        unvisitedNodes.sort((a, b) => a.distance - b.distance);

        const currentNode = unvisitedNodes.shift();
        if(currentNode.distance === Infinity) break;
        if(currentNode.isWall) continue;
        if(currentNode === endNode) break;
        
        updateNeighbors(currentNode);
        document.querySelector(
            `.cell[data-row="${currentNode.row}"][data-col="${currentNode.col}"]`
        ).classList.add('visited');
    }
    
    let currentNode = endNode;
    while(currentNode.previousNode){
        const {row, col} = currentNode.previousNode;
        document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`).classList.add('path');
        currentNode = currentNode.previousNode;
    }
}

function updateNeighbors(node){
    const neighbors = getNeighbors(node);
    neighbors.array.forEach(neighbor => {
        const newDistance = node.distance + 1;
        if(newDistance < neighbor.distance){
            neighbor.distance = newDistance;
            neighbor.previousNode = node;
        }
    });
}

function getNeighbors(node) {
    const { row, col } = node;
    const neighbors = [];
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < rows - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < cols - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isWall);
}

//A* Algorithm
function aStar() {
    if (!startNode || !endNode) return alert('Set start and end nodes first!');

    const openSet = [startNode];
    startNode.distance = 0;
    startNode.heuristic = calculateHeuristic(startNode, endNode);

    while (openSet.length > 0) {
        openSet.sort(
            (a, b) =>
                a.distance + a.heuristic - (b.distance + b.heuristic)
        );

        const currentNode = openSet.shift();
        if (currentNode.isWall) continue;
        if (currentNode === endNode) break;

        updateNeighborsAStar(currentNode);

        document.querySelector(
            `.cell[data-row="${currentNode.row}"][data-col="${currentNode.col}"]`
        ).classList.add('visited');
    }

    let currentNode = endNode;
    while (currentNode.previousNode) {
        const { row, col } = currentNode.previousNode;
        document
            .querySelector(`.cell[data-row="${row}"][data-col="${col}"]`)
            .classList.add('path');
        currentNode = currentNode.previousNode;
    }
}

function updateNeighborsAStar(node) {
    const neighbors = getNeighbors(node);
    neighbors.forEach(neighbor => {
        const newDistance = node.distance + 1;
        if (newDistance < neighbor.distance) {
            neighbor.distance = newDistance;
            neighbor.heuristic = calculateHeuristic(neighbor, endNode);
            neighbor.previousNode = node;
        }
    });
}

function calculateHeuristic(node, endNode) {
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
}
