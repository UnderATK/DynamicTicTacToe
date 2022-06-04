// Global Variables
var boardArr = [];
var currentTurn = "X";
var clock;
var timeleft = 11000;
var gameStarted = false;
const welcomeTypes = ['Good morning', 'Good afternoon', 'Good evening', 'Good night'];

// Player [name, color, symbol, score]
var player1 = ["","#990000","X", 0];
var player2 = ["","#000080","O", 0];

document.getElementById("resetBtn").disabled=true;
document.getElementById("againBtn").disabled=true;

// Setup Game
function setupGame(){
    player1[0] = document.getElementById("p1_name").value;
    player1[1] = document.getElementById("p1_color").value;
    player2[0] = document.getElementById("p2_name").value;
    player2[1] = document.getElementById("p2_color").value;

    if(player1[0].length == 0 || player2[0].length == 0){
        window.alert("Please choose name for both players.");
    } else {
        document.getElementById("startBtn").disabled=true;
        document.getElementById("resetBtn").disabled=false;
        buildBoard();
        greeting();
        turnBoard();
        setInterval(greeting, 1000);
        score();
    }
}

// build board
function buildBoard(){
    var rows = document.getElementById("selSizeValue").value;
    var cols = document.getElementById("selSizeValue").value;
    var board = document.getElementById("board");

    //clear board
    if (board.hasChildNodes() )
    {
        board.removeChild(board.firstChild); 
    }

    //create new table
    var table = document.createElement("table");
    table.setAttribute("id", "tableGame");
    board.appendChild(table);

    //add rows and columns
    var rowNum;
    var colNum;
    for (rowNum = 0; rowNum < rows; rowNum++){
        var row = document.createElement("tr");
        table.appendChild(row);

        for(colNum = 0; colNum < cols; colNum++){
            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.innerHTML = "";
            cell.addEventListener("click", play);
        }
    }
    fillArray(rows, cols);
    gameStarted = true;
    countdown();
}

function fillArray(rows, cols){
    for(var i = 0; i < rows; i++){
        boardArr[i] = [];
        for(var j = 0; j < cols; j++){
            boardArr[i][j] = 0;  
        }
    }
}

// Greeting
function greeting(){
    const date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    min = checkTime(min);
    sec = checkTime(sec);
    
    clock = hour + ":" + min + ":" + sec;

    let welcomeText = '';
    let names = player1[0] + " and " + player2[0] + " its ";

    if (hour < 6) welcomeText = welcomeTypes[3];
    else if (hour < 12) welcomeText = welcomeTypes[0];
    else if (hour < 18) welcomeText = welcomeTypes[1];
    else if (hour < 23) welcomeText = welcomeTypes[2];
    else welcomeText = welcomeTypes[3];

    document.getElementById("greeting").innerHTML = welcomeText + " " + names + clock;
    document.getElementById("greeting").style.display = "inline";
}

// Live Clock
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// Score board
function score(){
    let scoreText = '<p><b>Score:</b> Player <b>' + player1[0] + '</b> ' + player1[3] + ":" + player2[3] + ' Player <b>' + player2[0] + '</b>';
    document.getElementById("score").innerHTML = scoreText;
}

// Turn board
function turnBoard(){
    let turn;
    if (currentTurn == "X"){
        turn = 'Player <b>' + player1[0] + '</b> Turn.';
        document.getElementById("p_turn").innerHTML = turn;
    } else {
        turn = 'Player <b>' + player2[0] + '</b> Turn.';
        document.getElementById("p_turn").innerHTML = turn;
    }
    document.getElementById("turn").style.display = "inline";
}

// Play
function play(){
    var cell = event.srcElement;
    let selectedRow = cell.parentElement.rowIndex;
    let selectedCol = cell.cellIndex;

    if (cell.innerHTML !== ''){
        alert("This cell is already taken.");
    } else {
        if (currentTurn == "X"){
            cell.innerHTML = player1[2];
            cell.style.color = player1[1];
            boardArr[selectedRow][selectedCol] = 1;
        } else {
            cell.innerHTML = player2[2];
            cell.style.color = player2[1];
            boardArr[selectedRow][selectedCol] = 2;
        }
    }

    checkIfWin(selectedRow, selectedCol);

    if(checkIfTie()){
        alert('Tie! Game reload...');
        currentTurn = "X";
        buildBoard();
    }
    nextTurn();
}

// Switch turn
function nextTurn(){
    if (currentTurn == "X"){
        currentTurn = "O";
        turnBoard();
    } else {
        currentTurn = "X";
        turnBoard();
    }
    timeleft = 11000;
}

// Check if win by row combinations
function rowsCheck(row, col){
    var celValue = boardArr[row][col];
    var selectedRow = document.getElementById("selSizeValue").value;

    if (selectedRow == 3){
        for(var i = 0; i < selectedRow - 2; i++){
            if (boardArr[row][col] == boardArr[row][i] && boardArr[row][col] == boardArr[row][i+1] && boardArr[row][col] == boardArr[row][i+2]){
                boardArr[row][i] =- celValue;
                boardArr[row][i+1] =- celValue;
                boardArr[row][i+2] =- celValue;
                return true;
            }
        }
    } else {
        for(var i = 0; i < selectedRow - 3; i++){
            if (boardArr[row][col] == boardArr[row][i] && boardArr[row][col] == boardArr[row][i+1] && boardArr[row][col] == boardArr[row][i+2] && boardArr[row][col] == boardArr[row][i+3]){
                boardArr[row][i] =- celValue;
                boardArr[row][i+1] =- celValue;
                boardArr[row][i+2] =- celValue;
                boardArr[row][i+3] =- celValue;
                return true;
            }
        }
    }
    return false;
}

// Check if win by column combinations
function colsCheck(row, col){
    var celValue = boardArr[row][col];
    var selectedCol = document.getElementById("selSizeValue").value;

    if (selectedCol == 3){
        for(var i = 0; i < selectedCol - 2 ;i++){
            if (boardArr[row][col] == boardArr[i][col] && boardArr[row][col] == boardArr[i+1][col] && boardArr[row][col] == boardArr[i+2][col]){
                boardArr[i][col]=-celValue;
                boardArr[i+1][col]=-celValue;
                boardArr[i+2][col]=-celValue;
                return true;
            }
        }  
    } else {
        for(var i = 0; i < selectedCol - 3 ;i++){
            if (boardArr[row][col] == boardArr[i][col] && boardArr[row][col] == boardArr[i+1][col] && boardArr[row][col] == boardArr[i+2][col]  && boardArr[row][col] == boardArr[i+3][col]){
                boardArr[i][col]=-celValue;
                boardArr[i+1][col]=-celValue;
                boardArr[i+2][col]=-celValue;
                boardArr[i+3][col]=-celValue;
                return true;
            }
        }
    }
    return false;
}

// Check if win by right diag combinations
function rightDiagCheck(row, col) {
    var celValue = boardArr[row][col];
    var firstCell, lastCell;
    var selectedRow = document.getElementById("selSizeValue").value;
    var selectedCol = document.getElementById("selSizeValue").value;
    
    if (row + col < selectedRow - 1) {
        firstCell = 0;
        lastCell = row + col;
    } else {
        firstCell = (row + col) - (selectedRow - 1);
        lastCell = selectedCol - 1;
    }
    
    if (selectedRow == 3){
        for (var i = firstCell; i < selectedRow - 2; i++) {
            for (var j = lastCell; j >= 0; j--) {
                if(boardArr[i][j] == boardArr[row][col] && boardArr[i+1][j-1] == boardArr[row][col] && boardArr[i+2][j-2] == boardArr[row][col]){
                    boardArr[i][j] =- celValue;
                    boardArr[i+1][j-1] =- celValue;
                    boardArr[i+2][j-2] =- celValue;
                    return true;
                }
            }
        }
    } else {
        for (var i = firstCell; i < selectedRow - 3; i++) {
            for (var j = lastCell; j >= 0; j--) {
                if(boardArr[i][j] == boardArr[row][col] && boardArr[i+1][j-1] == boardArr[row][col] && boardArr[i+2][j-2] == boardArr[row][col] && boardArr[i+3][j-3] == boardArr[row][col]){
                    boardArr[i][j] =- celValue;
                    boardArr[i+1][j-1] =- celValue;
                    boardArr[i+2][j-2] =- celValue;
                    boardArr[i+3][j-3] =- celValue;
                    return true;
                }
            }
        }
    }
    return false;
}

// Check if win by left diag combinations
function leftDiagCheck(row, col){ 
    var celValue = boardArr[row][col];
    var firstCell, lastCell;
    var selectedRow = document.getElementById("selSizeValue").value;
    var selectedCol = document.getElementById("selSizeValue").value;
    
    if (row - col >= 0) {
        firstCell = row - col;
        lastCell = 0;
    } else {
        firstCell = 0;
        lastCell = col - row;
    }
    
    if (selectedRow == 3){
        for (var i = firstCell; i < selectedRow - 2; i++) {
            for (var j = lastCell; j < selectedCol - 2; j++){
                if(boardArr[i][j] == boardArr[row][col] && boardArr[i+1][j+1] == boardArr[row][col] && boardArr[i+2][j+2] == boardArr[row][col]){
                    boardArr[i][j] =- celValue;
                    boardArr[i+1][j+1] =- celValue;
                    boardArr[i+2][j+2] =- celValue;
                    return true;
                }
            }
        }
    } else {
        for (var i = firstCell; i < selectedRow - 3; i++) {
            for (var j = lastCell; j < selectedCol - 3; j++){
                if(boardArr[i][j] == boardArr[row][col] && boardArr[i+1][j+1] == boardArr[row][col] && boardArr[i+2][j+2] == boardArr[row][col] && boardArr[i+3][j+3] == boardArr[row][col]){
                    boardArr[i][j] =- celValue;
                    boardArr[i+1][j+1] =- celValue;
                    boardArr[i+2][j+2] =- celValue;
                    boardArr[i+3][j+3] =- celValue;
                    return true;
                }
            }
        }
    }
    return false;
}

// Check if Win
function checkIfWin(selectedRow,selectedCol){
    if (rowsCheck(selectedRow,selectedCol)){
        if (currentTurn == "X"){
            alert(player1[0] +' Win!\nGame reload...');
            document.getElementById("againBtn").disabled=false;
            player1[3]++;
            gameStarted = false;
            clearInterval(t);
            timeleft = 11000;
            score();
        } else {
            alert(player2[0] +' Win!\nGame reload...');
            document.getElementById("againBtn").disabled=false;
            player2[3]++;
            gameStarted = false;
            clearInterval(t);
            timeleft = 11000;
            score();
        }
	}

    if (colsCheck(selectedRow,selectedCol)){
        if (currentTurn == "X"){
            alert(player1[0] +' Win!\nGame reload...');
            document.getElementById("againBtn").disabled=false;
            player1[3]++;
            gameStarted = false;
            clearInterval(t);
            timeleft = 11000;
            score();
        } else {
            alert(player2[0] +' Win!\nGame reload...');
            document.getElementById("againBtn").disabled=false;
            player2[3]++;
            gameStarted = false;
            clearInterval(t);
            timeleft = 11000;
            score();
        }
	}

    if (rightDiagCheck(selectedRow,selectedCol)){
        if (currentTurn == "X"){
            alert(player1[0] +' Win!\nGame reload...');
            document.getElementById("againBtn").disabled=false;
            player1[3]++;
            gameStarted = false;
            clearInterval(t);
            timeleft = 11000;
            score();
        } else {
            alert(player2[0] +' Win!\nGame reload...');
            document.getElementById("againBtn").disabled=false;
            player2[3]++;
            gameStarted = false;
            clearInterval(t);
            timeleft = 11000;
            score();
        }
	}

    if (leftDiagCheck(selectedRow,selectedCol)){
        if (currentTurn == "X"){
            alert(player1[0] +' Win!\nGame reload...');
            document.getElementById("againBtn").disabled=false;
            player1[3]++;
            gameStarted = false;
            clearInterval(t);
            timeleft = 11000;
            score();
        } else {
            alert(player2[0] +' Win!\nGame reload...');
            document.getElementById("againBtn").disabled=false;
            player2[3]++;
            gameStarted = false;
            clearInterval(t);
            timeleft = 11000;
            score();
        }
	}
}

// Check if Tie
function checkIfTie(){
	for(var i = 0; i < boardArr.length; i++){ 
        for(var j = 0; j < boardArr[0].length; j++){ 
            if(boardArr[i][j] == 0) {
				return false;
			} 
        }
    }
    return true;
}

// Coundown func
function countdown() {
    t=setInterval(function(){
        timeleft -= 1000;
	    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        if (gameStarted){
            if (currentTurn == "X") {
                document.getElementById("p_timer").innerHTML="Time left: " + seconds;
            } else {
                document.getElementById("p_timer").innerHTML="Time left: " + seconds;
            }
            if (timeleft == 0) {
                nextTurn();
            }
        } else {
            document.getElementById("p_timer").innerHTML= "Game stopped.";
        }
	},1000);
}

// Again func
function again(){
    currentTurn = "X";
    timeleft = 11000;
    clearInterval(t);
    document.getElementById("againBtn").disabled=true;
    buildBoard();
}

// Reset func
function reset(){
    if(confirm("Are you sure you want to reset the board?")){
        currentTurn = "X";
        gameStarted = false;
        clearInterval(t);
        timeleft = 11000;
        document.getElementById("startBtn").disabled=true;
        location.reload();
    }
}