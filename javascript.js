//add event listeners for the button
const addPlayerBtn = document.querySelector("button");

addPlayerBtn.addEventListener("click", () => {
    dialog.showModal();
});

const game = (function() {
    let gameBoard = [];   //store gameboard in array
    
    //function to create gameboard
    function createBoard() {
       gameBoard = new Array(9).fill("");
    }

    //function to get cell index
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

    //variable for gameOver
    let gameOver = false;

     //function to get activePlayer
     const getActivePlayer = () => activePlayer;
     console.log(getActivePlayer());

      //function to switch players
    const switchPlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };


    //function to check for winner
    const checkWinner = () => {
        const board = game.showBoard();
        for(const combo of winningCombos) {
            const[a, b, c] = combo;
            if(board[a] && board[a] === board[b] && board[a] === board[c]) {
                return activePlayer.name;
            }
        
        }  
        return null;    //return null after checking all combos  
    }

    //function to check if board is full
    const isBoardFull = () => {
        return game.showBoard().every(cell => cell !== "");
    };

    const playGame = (index) => {
        if(gameOver) {
            console.log("GAME OVER! Please reset the game to start over");
            alert("GAME OVER! Please reset the game to start over");
            return;
        }
        if(game.setCell(index, activePlayer.marker)) {
            const winner = checkWinner();
            console.log(game.showBoard());
            if(winner) {
                console.log(`${winner} wins this round!`);
                alert(`${winner} wins this round!`);
                gameOver = true;
                return;
            }
            if(isBoardFull()) {
                console.log("IT'S A DRAW!");
                alert("It's a DRAW!");
                gameOver = true;
                return;
            }
            switchPlayer();
            console.log(`Now it's ${activePlayer.name}'s turn!`)
        } else {
            console.log("Invalid move, try again");
        }
    }

    //reset function
    const resetGame = () => {
        game.resetBoard();
        gameOver = false;
        activePlayer = playerOne;
        console.log("Game has been reset!");
        console.log(`${activePlayer.name} is starting the game`);
    }


    return {playGame, resetBoard: game.resetBoard, resetGame, getActivePlayer, switchPlayer};
};

//display function
const displayController =(function() {
    //get game module
    const gameModule = gameFlow();
    const playerTurnDiv = document.querySelector(".turn");
    const board = document.getElementById("game-container");

    //function to update screen
    const updateScreen = () => {
        //clearBoard
        board.textContent = '';

        //get latest version of gameboard and player turn
        const gameBoard = game.showBoard();
        const activePlayer = gameModule.getActivePlayer();

        //display player's turn
        playerTurnDiv.textContent = `${activePlayer.name}'s turn......`;

        //render game
        for(let i = 0; i < gameBoard.length; i++) {
            let gameCell = document.createElement("div");
            gameCell.id = i;
            gameCell.classList = "cell";
            gameCell.setAttribute("game-data", i);
            gameCell.textContent = gameBoard[i];
            board.appendChild(gameCell);
        }

    }
    //function to clear Board
    const clearBoard = () => {
        while(board.hasChildNodes()) {
            board.removeChild(board.firstChild);
        }
    }

    //click function
    function clickHandler() {
        //add event lsiterner on each cell
        board.addEventListener("click", (e) => {
            if(!e.target.classList.contains("cell")) return;
            const index = e.target.getAttribute("game-data");

            gameModule.playGame(index);
            updateScreen();

        });

    };
    const init = () => {
        updateScreen();
        clickHandler();
    }
    // updateScreen();
    // return{board, renderBoard, clearBoard, updateScreen};
    return{init};

})();

displayController.init();

// //function for click event
// function clickHandler() {
//     //add event listener for each cell on board
//     const boardEl = displayController.board;
//     displayController.renderBoard(game.showBoard());
//     boardEl.addEventListener("click", (e) => {
//         if(!e.target.classList.contains("cell")) return; 
//             const index = e.target.getAttribute("game-data");
//         if(game.showBoard()[index]) return;

//             game.setCell(index, getActivePlayer().marker);
//             switchPlayer();
//             checkWinner();
            

//             displayController.clearBoard();
//             displayController.renderBoard(game.showBoard());
        
//     })

// }

// const startGame = gameFlow();

// const display = displayController;
// display.renderBoard(game.showBoard());
// display.updateScreen();
// clickHandler();

// startGame.playGame;

// console.log (startGame.playGame(0));
// console.log (startGame.playGame(4));
// console.log (startGame.playGame(1));
// console.log (startGame.playGame(5));
// console.log (startGame.playGame(2));
// console.log(startGame.resetGame());



