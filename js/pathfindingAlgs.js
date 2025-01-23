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