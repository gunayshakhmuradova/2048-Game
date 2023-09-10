let board = [];
let initialState = {
    board,
    score: 0,
    rows: 4,
    cols: 4,
};

const startBtn = document.getElementById('start');
const scoreElement = document.getElementById('score');

startBtn.addEventListener('click', () => {
    startGame();
});


const startGame = () => {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    score = 0;

    board.forEach((row, i) => {
        row.forEach((col, j) => {
            let cell = document.createElement('div');
            cell.id = String(i) +"-" + String(j);
            let activeCell = board[i][j];
            updateCell(cell, activeCell);

            document.getElementById('board').append(cell);
        })
    })
   
    generateNew();
    generateNew();
}

const updateCell = (cell, activeCell) => {
    cell.innerText = activeCell > 0 ? String(activeCell) : ""; 
    cell.classList.value = "";
    cell.classList.add ("cell");
    if (activeCell > 0) {
        if (activeCell <= 2048) {
            cell.classList.add("tile-" + String(activeCell));
        } else {
            cell.classList.add("tile-2048");
        }
    }
}

document.addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'ArrowLeft':
            for(let r=0; r<initialState.rows; r++) {
                let row  = board[r];
                row = slip(row);
                board [r] = row;
                for (let c=0; c<initialState.cols; c++) {
                    let cell = document.getElementById(String(r) +"-" + String(c));
                    let activeCell = board[r][c];
                    updateCell(cell, activeCell);
                }
            }
            generateNew();
            break;
        case 'ArrowRight':
            for(let r=0; r<initialState.rows; r++) {
                let row  = board[r];
                row.reverse();
                row = slip(row);
                board [r] = row.reverse();
                for (let c=0; c<initialState.cols; c++) {
                    let cell = document.getElementById(String(r) +"-" + String(c));
                    let activeCell = board[r][c];
                    updateCell(cell, activeCell);
                }
            }
            generateNew();
            break;
        case 'ArrowUp':
            for (let c=0; c<initialState.cols; c++) {
                let row  = [board[0][c], board[1][c], board[2][c], board[3][c]];
                row = slip(row)
                for (let r=0; r<initialState.rows; r++) {
                    board[r][c] = row[r]
                    let cell = document.getElementById(String(r) +"-" + String(c));
                    let activeCell = board[r][c];
                    updateCell(cell, activeCell);
                }
             }
             generateNew();
            break;
        case 'ArrowDown':
            for (let c=0; c<initialState.cols; c++) {
                let row  = [board[0][c], board[1][c], board[2][c], board[3][c]];
                row.reverse();
                row = slip(row)
                row.reverse();

                for (let r=0; r<initialState.rows; r++) {
                    board[r][c] = row[r]
                    let cell = document.getElementById(String(r) +"-" + String(c));
                    let activeCell = board[r][c];
                    updateCell(cell, activeCell);
                }
             }
             generateNew();
            break;
        default:
            break;
    }
    document.getElementById("score").innerText = initialState.score;
    
})

const slip = (row) => {
    row = row.filter((activeCell) => activeCell != 0)
    for(let i=0; i<row.length-1; i++) {
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            initialState.score += row[i];
        }
    }
    row = row.filter((activeCell) => activeCell != 0)
    while(row.length < initialState.cols) {
        row.push(0);
    }
    return row;
}

const generateNew = () => {
    if (!emptyCell()) { 
        clearBoard();
        startGame();
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * initialState.rows);
        let c = Math.floor(Math.random() * initialState.cols);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let cell = document.getElementById(String(r) + "-" + String(c));
            cell.innerText = "2";
            cell.classList.add("tile-2");
            found = true;
        }
    }
}

const emptyCell = () => {
    for (let r = 0; r < initialState.rows; r++) {
        for (let c = 0; c < initialState.cols; c++) {
            if (board[r][c] === 0) {
                return true; 
            }
        }
    }
    return false; 
}

const clearBoard = () => {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
}