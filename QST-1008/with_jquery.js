let rows = 6;
let columns = 7;
let tileArray = [];
let board = $('.board');
let currentPlayer = 1;
let displayCurrentPlayer = document.getElementById('current-player');
let result = document.getElementById('result');
let gameOver = false;
let final = document.getElementById('status');


function playGame() {
    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < columns; c++) {
            
            var tileObject = {
                row : r,
                column : c,
                tile : document.createElement('div'),
                taken : false,
                color : "none"
            }

        let tile = tileObject.tile;
        tile.classList.add('tile'); 
        board.appendChild(tile);
        tileArray.push(tileObject);

        }
        
    }

    for (let i = 0; i < columns; i++) {
        let pseudoTile = {
            row : rows,
            column : i,
            taken : true
        }
        tileArray.push(pseudoTile);
    }
    setPiece();
}

function setPiece() {
    
    for (let i = 0; i < rows*columns; i++) {

        let item = tileArray[i];
        item.tile.onclick = () => {
            
            if (gameOver)
            return;

            if(tileArray[i + columns].taken && !tileArray[i].taken){
                if (currentPlayer == 1) {
                    item.tile.classList.add('player-one');
                    item.color = 'red';
                    item.taken = true;
                    checkBoard(item, currentPlayer);
                    currentPlayer = 2;
                }
                else {
                    item.tile.classList.add('player-two');
                    item.color = 'yellow';
                    item.taken = true;
                    checkBoard(item, currentPlayer);
                    currentPlayer = 1;
                }
                displayCurrentPlayer.innerHTML = currentPlayer;

            } else alert('Can\'t go here!');
            
        }

    }

}

function checkBoard(x, player) {
    let r = x.row;
    let c = x.column;

    if (
        //check horizontally
        (a(r,c) == a(r, c-1) && a(r,c) == a(r, c-2) && a(r,c) == a(r, c-3)) ||
        (a(r,c) == a(r, c+1) && a(r,c) == a(r, c-1) && a(r,c) == a(r, c-2)) ||
        (a(r,c) == a(r, c+2) && a(r,c) == a(r, c+1) && a(r,c) == a(r, c-1)) ||
        (a(r,c) == a(r, c+3) && a(r,c) == a(r, c+2) && a(r,c) == a(r, c+1)) ||

        //check vertically
        (a(r,c) == a(r-1, c) && a(r,c) == a(r-2, c) && a(r,c) == a(r-3, c)) ||
        (a(r,c) == a(r-1, c) && a(r,c) == a(r-2, c) && a(r,c) == a(r+1, c)) ||
        (a(r,c) == a(r-1, c) && a(r,c) == a(r+1, c) && a(r,c) == a(r+2, c)) ||
        (a(r,c) == a(r+1, c) && a(r,c) == a(r+2, c) && a(r,c) == a(r+3, c)) ||

        //check diagonal right

        (a(r,c) == a(r-1, c+1) && a(r,c) == a(r-2, c+2) && a(r,c) == a(r-3, c+3)) ||
        (a(r,c) == a(r-1, c+1) && a(r,c) == a(r-2, c+2) && a(r,c) == a(r+1, c-1)) ||
        (a(r,c) == a(r-1, c+1) && a(r,c) == a(r+1, c-1) && a(r,c) == a(r+2, c-2)) ||
        (a(r,c) == a(r+1, c-1) && a(r,c) == a(r+2, c-2) && a(r,c) == a(r+3, c-3)) ||

        //check diagonal left

        (a(r,c) == a(r-1, c-1) && a(r,c) == a(r-2, c-2) && a(r,c) == a(r-3, c-3)) ||
        (a(r,c) == a(r-1, c-1) && a(r,c) == a(r-2, c-2) && a(r,c) == a(r+1, c+1)) ||
        (a(r,c) == a(r-1, c-1) && a(r,c) == a(r+1, c+1) && a(r,c) == a(r+2, c+2)) ||
        (a(r,c) == a(r+1, c+1) && a(r,c) == a(r+2, c+2) && a(r,c) == a(r+3, c+3)) 

    ) {   
        result.innerText = 'Player ' + player + ' wins!';
        final.innerHTML = 'Game over! Reload to play again.'
        gameOver = true;
    } 
    if (tileArray.every(tile => {return tile.taken === true})) {

        result.innerText = 'No winner :(';
        final.innerHTML = 'Game over! Reload to play again.'
        gameOver = true;
    }
    
    return
}


function a(r, c) {
    // returns color property of tile with given row and column coordinates
    let item = tileArray.find(tile => {return tile.row === r && tile.column === c});
    return item? item.color : false;
}

playGame();