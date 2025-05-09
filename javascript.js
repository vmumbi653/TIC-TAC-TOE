const game = (function() {
    let gameBoard = [];   //store gameboard in array
    // let row = 3;
    // let column = 3;
    
    
    //function to create gameboard
    function createBoard() {
       gameBoard = new Array(9).fill("");
    }

    //function to get cell index and its value
    function getCell(index) {
       return gameBoard[index];
    };

    //function to set cell
    function setCell(index, value) {
        if(gameBoard[index] === "") {
            gameBoard[index] = value;
            return true;
        }
        return false;
    }

    //function to render board
    const showBoard = () => [...gameBoard];

    //function to reset board
    const resetBoard = () => {
        gameBoard = Array(9).fill("");
    }


    return{createBoard, showBoard, getCell, setCell, resetBoard};
})();


//function to direct flow of the game
function gameFlow() {
    // //render board
    game.createBoard();

    let isPlayerOnesTurn = true;
    let winningCombos = [
    [0,1,2],[3,4,5], [6,7,8],  //rows
    [0,4,8], [2,4,6], //diagonal
    [0,3,6],[1,4,7], [2,5,8]   //columns
    ];
    

     //function to createPlayer
 const createPlayer = (name, marker) => {
    return {
        name: name,
        marker: marker
    }
};  
    let playerOne = createPlayer("jimmy", "X");
    let playerTwo = createPlayer("jonny", "O");
    let activePlayer = playerOne;
    console.log(activePlayer);

     //function to get activePlayer
     const getActivePlayer = () => activePlayer;
     console.log(getActivePlayer());

      //function to switch players
    const switchPlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }


    //function to check for winner
    const checkWinner = () => {
        const board = game.showBoard();
        for(const combo of winningCombos) {
            const[a, b, c] = combo;
            if(board[a] && board[b] === board[b] && board[a] === board[c]) {
                return activePlayer.name;
            }
            return null;
        }    

    }

    const playGame = (index) => {
        if(game.setCell(index, activePlayer.marker)) {
            const winner = checkWinner();
            console.log(game.showBoard());
            if(winner) {
                console.log(`${winner} wins this round!`);
                return;
            }
            switchPlayer();
            console.log(`Now it's ${activePlayer.name}'s turn!`)
        } else {
            console.log("Invalid move, try again");
        }
    }

    return {playGame, showBoard: game.showBoard, resetBoard: game.resetBoard};
};

const startGame = gameFlow();

console.log (startGame.playGame(0));
console.log (startGame.playGame(4));
console.log (startGame.playGame(1));
console.log (startGame.playGame(5));
console.log (startGame.playGame(2));



