const Gameboard = (function() {
    let gameBoard = [];
    const row = 3;
    const column = 3;
    

    function createBoard() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
    }
    //function to render board
    const showBoard = () => gameBoard;

    //function to place markers for players
    function placeMarker(row, column, player) {
        if(gameBoard[row][column] === "") {
            gameBoard[row][column] = player;
            return true;
            console.log(gameBoard);
        } else {
            return false;
            console.log(gameBoard);
        }

    }

    //function to reset board
    function resetBoard() {
        createBoard();
    }
    return{createBoard, showBoard, placeMarker, resetBoard};

})();

 //function to get player
    function createPlayer(name, marker) {
        let turn = true;
        const getName = () => name;
        const getMarker = () => marker;
        const isTurn = () => turn;

        return{getName, getMarker, isTurn};
    }
    const player1 = createPlayer("jane", "X");
    const player2 = createPlayer("jon", "O");
    console.log(player1);
    console.log(player2);

    //function for game flow
    function gameFlow() {
        //render the board
        const board = Gameboard;

        //  const{getName, getMarker, isTurn} = createPlayer(name, marker);
         const playerOne = createPlayer("one", "X");
         const playerTwo = createPlayer("two", "0");

         //gameflow
         let activePlayer = playerOne;

         //switch player that is playing
         const switchPlayer = () => {
            activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
         };

         //get current active player
         const getActivePlayer = () => activePlayer;

         //get new round
         const getNewRound = () => {
            board.createBoard();
            console.log(`${getActivePlayer().name}'s turn!`);
         }
         //play a round
         const playRound = (index) => {
            if(gameBoard[index -1] === '') {
                if(playerOne.isTurn ) {
                    gameBoard.splice(index -1, 1, playerOne.getMarker());
                    playerOne.isTurn = false;
                    playerTwo.isTurn = true;
                    activePlayer = playerOne;
                } else {
                    gameBoard.splice(index -1, 1, playerTwo.getMarker());
                    playerTwo.isTurn = false;
                    playerOne.isTurn = true;
                    activePlayer = playerTwo;
                }       
            }

         }

         return{switchPlayer, getActivePlayer,getNewRound, playRound};
    };

    const game = gameFlow();


// const Gameboard = (function() {
//     const row = 3;
//     const column = 3;
//     const gameBoard = [];   //store gameboard in array

//     for(let i = 0; i< row; i++){
//         gameBoard[i] = [];
//        for (let j = 0; j < column; j++) {
//          gameBoard[i].push(cell());
//         }
//     }

//     //function to render gameBoard
//     const showBoard = () => gameBoard;

//     console.log(gameBoard);

//     //function to check for marked and unmarked cell
//     const checkMarker = (column,player) => {
//         console.log(column);

//         const unmarkedRow = gameBoard.filter((row) = row[column].getMarker() === "" );

//         //stop execution if cell is marked
//         if(unmarkedRow.length === 0) return;

//         const lowestCell = unmarkedRow.length -1;
//         gameBoard[lowestCell][column].addMarker(player);

//     }
//      //print the gameBoard function
//      function printBoard() {
//         const filledCells = gameBoard.map((row) =>
//         row.map((cell) => cell.getMarker() ))
//         console.log(filledCells);
//     };
//     return{showBoard,checkMarker,printBoard};

// })();

// function cell () {
//     let marker = 0;

//     //accept each player's marker to change marking on cell
//     const addMarker = (player) => {
//         marker = player;
//     };

//     //retrieve each value of each cell(square) through closure
//     const getMarker = () => marker;

//     return{addMarker, getMarker};
// }


// //players function
// // function player(playerOne = "playerOne", playerTwo = "PlayerTwo") {
// //     const players = [
//         // {
//         //     name: playerOne,
//         //     marker: "X"
//         // },
//         // {
//         //     name: playerTwo,
//         //     marker: "O"
//         // }
// //     ]

// //     return{players};

// // };


// //gameflow function that controls the flow of the game
// function Gameflow (playerOne = "playerOne", playerTwo = "playerTwo") {

//     const board = Gameboard;

//     //array of player objects
//     const players = [
//         {
//             name: playerOne,
//             marker: "X"
//         },
//         {
//             name: playerTwo,
//             marker: "O"
//         }
//     ]

//     //player that starts game
//     let activePlayer = players[0];

//     //function to switch the turn of the players
//     const switchPlayers = () => {
//         activePlayer = activePlayer === players[0] ? players[1] : players[0];
//     };

//     //function to get current active player
//     const getActivePlayer = () => activePlayer;

//     //get new round
//     const getNewRound = () => {
//         board.printBoard();
//         console.log(`${getActivePlayer().name}'s turn!`);
//     };

//     const playRound = (column, row) => {
//         //input marker for each player
//         console.log(`inputting ${getActivePlayer().name}'s marker into ${column}`);

//         board.checkMarker(column, getActivePlayer().marker);

//         //switch players and print current gameboard
//         switchPlayers();
//         getNewRound();

//     };

//     getNewRound();

//     return{playRound, getActivePlayer};
// };

// const game = Gameflow();