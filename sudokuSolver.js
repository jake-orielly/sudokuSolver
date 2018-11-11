var startingBoard = [];

var rows = ["602000000",
"790106452",
"850024000",
"000090035",
"009405800",
"520070000",
"000940018",
"184203079",
"000000204"];

var domains = [];

function printBoard() {
    var result = "<table>";
    for (var i = 0; i < 9; i++) {
        result += "<tr>";
        for (var j = 0; j < 9; j++)
            result += "<td>" + startingBoard[i][j] + "</td>";
        result += "</tr>";
    }
    result += "</table>";
    document.write(result);
}

function applyCol(x,y,func) {
    for (var i = 0; i < startingBoard.length; i++)
        if (i != x)
            func(i,y,9);
}

function applyRow(x,y,func) {
    for (var i = 0; i < startingBoard[0].length; i++)
        if (i != y)
            func(x,i,9);
}

function applyBlock(x,y,func) {
    var x_start = Math.floor(x/3)*3;
    var y_start = Math.floor(y/3)*3;
    for (var i = y_start; i < y_start+3; i++)
        for (var j = x_start; j < x_start+3; j++)
            func(i,j,4);
}

function setSquare(x,y,val) {
    startingBoard[x][y] = val;
}

var curr;
for (var i = 0; i < 9; i++) {
    startingBoard[i] = [];
    domains[i] = [];
    for (var j = 0; j < 9; j++) {
        curr = rows[i].split('')
        startingBoard[i][j] = curr[j];
        domains[i][j] = [];
        if (startingBoard[i][j] == 0)
            for (var k = 0; k < 9; k++)
                domains[i][j][k] = true;
    }
}

applyCol(0,8,setSquare);
applyRow(8,2,setSquare);
applyBlock(0,5,setSquare)

printBoard();