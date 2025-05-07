const game = (function() {
    const gameBoard = [];   //store gameboard in array
    let row = 3;
    let column = 3;
    
    //function to create gameboard
    function createBoard() {
        for(let i = 0; i< row; i++) {
            gameBoard[i] = [];
            for(let j = 0; j<column; j++) {
                gameBoard[i].push(cell());
            }
        }
    }

    //function to render board
    const showBoard = () => gameBoard;

    //function to createPlayer
    function createPlayer(name, marker) {
        return {
            name: name,
            marker: marker
        }
    }

    return{createBoard, showBoard, createPlayer};
})();

console.log(game.createBoard);
console.log(game.showBoard);
const player1 = game.createPlayer("jane", "X");
const player2 = game.createPlayer("josh", "O");
console.log(player1);
console.log(player2);