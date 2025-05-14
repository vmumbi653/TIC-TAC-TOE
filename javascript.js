//add event listeners for the button
const addPlayerBtn = document.querySelector(".addPlayerBtn");
const addPlayerOne = document.querySelector(".playerUno");
const addPlayerTwo = document.querySelector(".playerDos");


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
    let playerOne;
    let playerTwo;
    let activePlayer;

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
    return ({name, marker, score: 0 });
};  

const setPlayers = (name1, marker1, name2, marker2) => {
    playerOne = createPlayer(name1, marker1);
    playerTwo = createPlayer(name2, marker2);
    activePlayer = playerOne;
}

//get players scores
const getPlayerScore = () => {
    return {
        [playerOne.name]: playerOne.score,
        [playerTwo.name]: playerTwo.score
    }
};

const getPlayers = () => {
    return ({playerOne, playerTwo});
};
    // let playerOne = createPlayer("jimmy", "X");
    // let playerTwo = createPlayer("jonny", "O");
    // let activePlayer = playerOne;
    // console.log(activePlayer);

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
        for(let i = 0; i < winningCombos.length; i++) {
            const[a, b, c] = winningCombos[i];
            if(board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: activePlayer.name, comboIndex: i };

                // console.log("Winning comboIndex:", comboIndex);
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
            const result = checkWinner();
            console.log(game.showBoard());
            if(result) {
                // if(result) {
                const {winner, comboIndex} = result;
                console.log(`${winner} wins this round!`);
                alert(`${winner} wins this round!`);

                  //show strike line
            displayController.showStrike(comboIndex);
            console.log("Calling show strike with combo index:", comboIndex);

                //increment score
            if(activePlayer === playerOne) {
                playerOne.score++;
            } else {
                playerTwo.score++;
            }

            //update display
            displayController.updateScore();
              gameOver = true;
                return;
            // }
        }
            if(isBoardFull()) {
                console.log("IT'S A DRAW!");
                gameOver = true;
                alert("It's a DRAW!");
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


    return {playGame, resetGame, getActivePlayer, switchPlayer, setPlayers, getPlayerScore, getPlayers};
};

//display function
const displayController =(function() {
    //get game module
    const gameModule = gameFlow();
    // const playerTurnDiv = document.querySelector(".turn");
    const board = document.getElementById("game-container");

    let gameBoard = game.showBoard();

    //function to update players
    const setPlayerNames = (name1, marker1, name2, marker2) => {
        gameModule.setPlayers(name1, marker1, name2, marker2);

    }

    //function to update players to DOM
    const updatePlayersDisplay = (p1, p2) => {
        addPlayerOne.textContent = `Player 1: ${p1}`;
        addPlayerTwo.textContent = `Player 2: ${p2}`;
    }

    //method to update player scores
    const updateScore = () => {
        const players = gameModule.getPlayers();
        addPlayerOne.textContent = `${players.playerOne.name} (${players.playerOne.marker}): ${players.playerOne.score}`;
        addPlayerTwo.textContent = `${players.playerTwo.name} (${players.playerTwo.marker}): ${players.playerTwo.score}`;
    };

    //function to update screen
    const updateScreen = () => { //refactor code here to show only cell content and not clear board
        //clearBoard
        // board.textContent = '';

        //get latest version of gameboard and player turn
         gameBoard = game.showBoard();
        const activePlayer = gameModule.getActivePlayer();

         // Loop through the cells and update only their content
        const cells = board.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });

        //display player's turn
        // playerTurnDiv.textContent = `${activePlayer.name}'s turn......`;


    }
     //function to render board
     const renderInitialBoard = () => {
        //render game
        for(let i = 0; i < 9; i++) {
           let gameCell = document.createElement("div");
           gameCell.id = i;
           gameCell.classList = "cell";
           gameCell.setAttribute("game-data", i);
           gameCell.textContent = gameBoard[i];
           board.appendChild(gameCell);
       };
   }



    //for strike effect
    function createStrikeLine(comboIndex) {
        const strike = document.createElement("div");
        strike.classList.add("strike");
      
        const positions = [
          { top: 50, left: 0, rotate: 0 },     // Row 1
          { top: 155, left: 0, rotate: 0 },    // Row 2
          { top: 260, left: 0, rotate: 0 },    // Row 3
          { top: 0, left: 0, rotate: 45 },     // Diagonal \
          { top: 300, left: 0, rotate: -45 },     // Diagonal /
          { top: 0, left: 50, rotate: 90 },    // Col 1
          { top: 0, left: 155, rotate: 90 },   // Col 2
          { top: 0, left: 260, rotate: 90 },   // Col 3
         
        ];
      
        const pos = positions[comboIndex];
        console.log(pos);

        //set individual style properties
        strike.style.top = `${pos.top}px`;
        strike.style.left = `${pos.left}px`;
        strike.style.transform = `rotate(${pos.rotate}deg)`;

        console.log("Creating strike line at index:", comboIndex);
      
        return strike;
      }
      const showStrike = (comboIndex) => {
        clearStrike();
        const strike = createStrikeLine(comboIndex);
        document.querySelector("#game-container").appendChild(strike);
        console.log("Append strike to DOM!");
      };
      
      const clearStrike = () => {
        const oldStrike = document.querySelector(".strike");
        if (oldStrike) oldStrike.remove();
      };
      
      
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

        renderInitialBoard();
        updateScreen();
        clickHandler();
    }
    // updateScreen();
    // return{board, renderBoard, clearBoard, updateScreen};
    return{init, setPlayerNames, updatePlayersDisplay, resetGame: gameModule.resetGame, updateScreen, renderInitialBoard, updateScore, getPlayers: gameModule.getPlayers, showStrike, clearStrike};

})();

displayController.init();

const dialog = document.querySelector("#dialog");
const form = document.getElementById("form");
const display = displayController;

const resetBtn = document.querySelector(".resetBtn");

resetBtn.addEventListener("click", () =>{
    display.resetGame();
    display.updateScreen();
    display.clearStrike();
})

addPlayerBtn.addEventListener("click", () => {
    dialog.showModal();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name1 = document.getElementById("player1").value;
    const marker1 = document.getElementById("marker1").value.toUpperCase();
    const name2 = document.getElementById("player2").value;
    const marker2 = document.getElementById('marker2').value.toUpperCase();

    if(!name1 || !name2 || !marker1 || !marker2 || marker1 === marker2) {
        alert("Please fill out all fields. Markers MUST be either X or O");
        return;
    }

    display.setPlayerNames(name1, marker1, name2, marker2);
    display.updatePlayersDisplay(`${name1} (${marker1})`, `${name2} (${marker2})`);

    form.reset();
    dialog.close();
});

//add event listener for reset score button
const resetScoreBtn = document.querySelector(".resetScoreBtn");

resetScoreBtn.addEventListener("click", () => {
    const players = displayController.getPlayers();
    players.playerOne.score = 0;
    players.playerTwo.score = 0;

    displayController.updateScore();
});



