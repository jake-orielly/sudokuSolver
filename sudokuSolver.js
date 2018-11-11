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

function applyCol(x,y,func,val) {
    for (var i = 0; i < startingBoard.length; i++)
        if (i != x)
            func(i,y,val);
}

function applyRow(x,y,func,val) {
    for (var i = 0; i < startingBoard[0].length; i++)
        if (i != y)
            func(x,i,val);
}

function applyBlock(x,y,func,val) {
    var x_start = Math.floor(x/3)*3;
    var y_start = Math.floor(y/3)*3;
    for (var i = y_start; i < y_start+3; i++)
        for (var j = x_start; j < x_start+3; j++)
            func(i,j,val);
}

function elimDomain(x,y,val) {
    if (domains[x] && domains[x][y]){
        var index = domains[x][y].indexOf(parseInt(val));
        if (index > -1)
            domains[x][y].splice(index, 1);
    }
}

function restrictDomain(x,y,val) {
    applyCol(x,y,elimDomain,val);
    applyRow(x,y,elimDomain,val);
    applyBlock(x,y,elimDomain,val);
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
                domains[i][j].push(k+1);
    }
}

for (var i = 0; i < 9; i++)
    for (var j = 0; j < 9; j++)
        if (startingBoard[i][j] != 0)
            restrictDomain(i,j,startingBoard[i][j]);

printBoard();