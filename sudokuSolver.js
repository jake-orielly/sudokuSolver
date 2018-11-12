var startingBoard = [];

var rows = [
"905000306",
"400001790",
"070906100",
"097100400",
"000209000",
"002003810",
"006308050",
"039500001",
"104000608"];

var domains = [];
var domainList = [];

function Domain(x,y) {
    this.x = x;
    this.y = y;
    this.list = [];

    this.add = function(x) {
        this.list.push(x);
    }

    this.remove = function(x) {
        var index = this.list.indexOf(parseInt(x));
        if (index > -1)
            this.list.splice(index, 1);
    }
}

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
    for (var i = x_start; i < x_start+3; i++)
        for (var j = y_start; j < y_start+3; j++)
            func(i,j,val);
}

function elimDomain(x,y,val) {
    if (domains[x] && domains[x][y] && domains[x][y]['list']){
        domains[x][y].remove(val);
    }
}

function restrictDomain(x,y,val) {
    applyCol(x,y,elimDomain,val);
    applyRow(x,y,elimDomain,val);
    applyBlock(x,y,elimDomain,val);
}

function makeMove() {
    var curr = domainList[0];
    startingBoard[curr.x][curr.y] = curr['list'][0];
    restrictDomain(curr.x,curr.y,curr['list'][0]);
    domainList.splice(0,1);
}

var curr;
for (var i = 0; i < 9; i++) {
    startingBoard[i] = [];
    domains[i] = [];
    for (var j = 0; j < 9; j++) {
        curr = rows[i].split('')
        startingBoard[i][j] = curr[j];
        domains[i][j] = new Domain(i,j);
        if (startingBoard[i][j] == 0)
            for (var k = 0; k < 9; k++)
                domains[i][j].add(k+1);
    }
}

for (var i = 0; i < domains.length; i++)
    for (var j = 0; j < domains[i].length; j++)
        if (startingBoard[i][j] != 0)
            restrictDomain(i,j,startingBoard[i][j]);

for (var i = 0; i < domains.length; i++)
    for (var j = 0; j < domains[i].length; j++)
        if (domains[i][j]['list'].length > 0)
            domainList.push(domains[i][j]);

domainList.sort(function(a,b) {
    return a['list'].length - b['list'].length;
});

printBoard();
document.write('<hr>');

function step() {
    domainList.sort(function(a,b) {
        return a['list'].length - b['list'].length;
    });
    while (domainList[0] && domainList[0]['list'].length == 1)
        makeMove();
}
while(domainList.length > 0) {
    step();
    console.log(domainList.length)
}
printBoard();