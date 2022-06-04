//"use strict";

startBtn.addEventListener('click', buildBoard);

// Global vars
var boardArr = [];
var rows;
var cols;
var rowscols;
var cell;
var p1_name = document.getElementById("p1_name").value;
var p1_color;
var p2_name = document.getElementById("p2_name").value;
var p2_color;
//var leftCells;
var currentPlayer="X";

date = new Date();
hour = new Date().getHours();
min = new Date().getMinutes();
const time = hour + ":" + ("00" + min).slice(-2);
const welcomeTypes = ['Good morning', 'Good afternoon', 'Good evening'];


// build board
function buildBoard(){
	rows = document.getElementById("selRowNum").value;
	cols = document.getElementById("selColNum").value;
	board = document.getElementById("board");

	//clear board
	if (board.hasChildNodes() )
	{
		board.removeChild(board.firstChild); 
	}

	//create new table
	var table = document.createElement("table");
	board.appendChild(table);

	//add rows and columns
	var rowNum;
	var colNum;
	for (rowNum = 0; rowNum < rows; rowNum++){
		var row = document.createElement("tr");
		table.appendChild(row);

		for(colNum = 0; colNum < cols; colNum++){
			cell = document.createElement("td");
			row.appendChild(cell);
			//cell.innerHTML = rowNum + "," + colNum;
			//cell.onclick=function() {dosomething()};
		}
	}

    greeting();
}

function dosomething(){
    
    // var cell=event.srcElement;
    // alert(cell.innerHTML);
    xTurn = true;
    //alert("rows " + rows + " cols " + cols)
    leftCells = rows * cols;

    while (leftCells > 0){
        if (xTurn) {
            //alert("im here " + leftCells);
            cell.innerHTML = "X";
        }
        else {
            cell.set =  "O";
        }
        xTurn = !xTurn;
        leftCells--;
    }
}


//setup
function setUp(){
    //rowscols = startBtn.value;
    xTurn = true;
    btnSubmit.addEventListener("click", submit);
}

//submitPlayers
function submit(){
    color = inputColor.value;
    rowscols;
    leftCells = rows * cols;
    greeting();
    play();
}

//greeting
function greeting(){
    let welcomeText = '';
    let names = p1_name + " and " + p2_name + " its ";

    if (hour < 12) welcomeText = welcomeTypes[0];
    else if (hour < 18) welcomeText = welcomeTypes[1];
    else welcomeText = welcomeTypes[2];

    welcomeText = welcomeText + " " + names + time;
    document.getElementById("greeting").innerHTML = welcomeText;
}

//main game
function play(){
    //x odd
    //o even
    while (leftCells > 0){
        if (xTurn){
            cell.set =  x
        }
        else {
            cell.set =  o
        }
        xTurn = !xTurn;
    }
}

function checkWin(){
    checkCol(x,y);
    checkRow(x,y);
    checkDiagL(x,y);
    checkDiagR(x,y);
}

function checkCol(x,y){
    //arr[x][y]
}

function timer(){

}

function reset(){
    //location.reload(true);
    if(confirm("Are you sure you want to reset the board?")){
        location.reload();
    }
}