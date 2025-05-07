const game = (function() {
    const gameBoard = [];   //store gameboard in array
    // let row = 3;
    // let column = 3;
    
    
    //function to create gameboard
    function createBoard() {
       gameBoard = new Array(9).fill("");
    }

    //function to get cell index and its value
    function getCell(index, value) {
        gameBoard[index] = value;
    };

    //function to render board
    const showBoard = () => [...gameBoard];

    //function to reset board
    const resetBoard = () => {
        gameBoard = ["", "", "", "", "", "", "", "", "",];
    }


    return{createBoard, showBoard, getCell, resetBoard};
})();


//function to direct flow of the game
function gameFlow() {
    let isPlayerOnesTurn = true;
     //function to createPlayer
 const createPlayer = (name, marker) => {
    return {
        name: name,
        marker: marker
    }

};  
    // //render board
    // showBoard();

    // let playerOne = createPlayer("jimmy", "X");
    // let playerTwo = createPlayer("jonny", "O");

    const playGame = () => {
        if(isPlayerOnesTurn === true) {
            isPlayerOnesTurn = false;
            console.log(`${playerOne.marker}`);
            console.log(`${playerOne.name}`);
        } else {
            isPlayerOnesTurn = true;
            console.log(`${playerTwo.marker}`);
            console.log(`${playerTwo.name}`);
        }
    }

    return {createPlayer, playGame};
}
console.log(game.createBoard);
console.log(game.showBoard);

const startGame = gameFlow();
console.log(startGame.playGame);
console.log(startGame.createPlayer("jane", "X"));
console.log(startGame.createPlayer("evie", "0"));

const playerOne = startGame.createPlayer("jane", "X");
const playerTwo = startGame.createPlayer("evie", "O");
console.log(playerOne);
console.log(playerTwo);

console.log(startGame.playGame(playerOne));
console.log(startGame.playGame(playerTwo));


// const player1 = createPlayer("jane", "X");
// const player2 = createPlayer("josh", "O");
// console.log(player1);
// console.log(player2);