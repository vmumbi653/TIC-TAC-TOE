const Gameboard = (function() {
    const row = 3;
    const column = 3;
    const gameBoard = [];   //store gameboard in array

    for(let i = 0; i< row; i++){
        gameBoard[i] = [];
       for (let j = 0; j < column; j++) {
         gameBoard[i].push(cell());
        }
    }

    //function to render gameBoard
    const showBoard = () => gameBoard;

    //function to check for marked and unmarked cell
    const checkMarker = (column, player) => {

        const unmarkedCell = gameBoard.filter((row) = row[column].getMarker() === "" ).map(row[column]);

        //stop execution if cell is marked
        if(!unmarkedCell.length) return;

        const lowestCell = unmarkedCell.length -1;
        gameBoard[lowestCell][column].addMarker(player);

    }
     //print the gameBoard function
     function printBoard() {
        const filledCells = board.map((row) =>
        row.map((cell) => cell.getMarker() ))
        console.log(filledCells);
    };


    return{showBoard,checkMarker,printBoard};

})();

function cell () {
    let marker = '';

    //accept each player's marker to change marking on cell
    const addMarker = (player) => {
        marker = player;
    };

    //retrieve each value of each cell(square) through closure
    const getMarker = () => marker;

    return{addMarker, getMarker};
}


//players function
function player(playerOne = "playerOne", playerTwo = "PlayerTwo") {
    const players = [
        {
            name: playerOne,
            marker: "X"
        },
        {
            name: playerTwo,
            marker: "O"
        }
    ]

    return{players};

};


//gameflow function
function Gameflow () {


};