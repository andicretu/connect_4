
let matrix = [];
function initiateRowAndPlayers() {
    for (let i = 0; i < 7; ++i) {
        min[i] = 0;
        matrix[i] = [];
        for (let j = 0; j < 6; ++j) {
            matrix[i][j] = document.getElementById(`c${i}r${j}`);
        }
    }
}

let player1Positions = [];
let player2Positions = [];
let plmessage;
let message;
let min = [];

function markCell(index) {
    let column = index;
    let row = min[index];
    matrix[column][row] = document.getElementById(`c${column}r${row}`);
    matrix[column][row].textContent = togglePlayers();
    if (player === player1) {
        message = document.getElementById("whosturn");
        message.textContent = "Yellow's Turn";
        player1Positions.push([column, row]);
    } else {
        message = document.getElementById("whosturn");
        message.textContent = "Red's Turn";
        player2Positions.push([column, row]);
    }
    ++min[index];
    checkVerticalsPlayer1();
    checkVerticalsPlayer2();
    checkHorizontalsPlayer1();
    checkHorizontalsPlayer2();
    checkDiagonalsPlayer1();
    checkDiagonalsPlayer2();
}

let player1 = "🔴"
let player2 = "🟡";
let player = player1;

function togglePlayers() {
    player = player === player1 ? player2 : player1;
    return player;
}

function comparePairsVertical(a, b) {
    if (a[0] !== b[0]) {
        return a[0] - b[0];
    }
    return a[1] - b[1];
}

function comparePairsHorizontal(a, b) {
    if (a[1] !== b[1]) {
        return a[1] - b[1];
    }
    return a[0] - b[0];
}

function checkVerticalsPlayer1() {
    let length = player1Positions.length;
    player1Positions.sort(comparePairsVertical);
    let consecutiveV = 0;  
    for (let i = 0; i < length - 1; ++i) {
        if (player1Positions[i][0] === player1Positions[i + 1][0] && player1Positions[i][1] - player1Positions[i + 1][1] === -1) {
            ++consecutiveV;
        } else {
            consecutiveV = 0;
        }
        if (consecutiveV === 3) {
            winMessage(player1);
            break; 
        }
    }
}

function checkVerticalsPlayer2() {
    let length = player2Positions.length;
    player2Positions.sort(comparePairsVertical);
    let consecutiveV = 0;
    for (let i = 0; i < length - 1; ++i) {
        if (player2Positions[i][0] === player2Positions[i + 1][0] && player2Positions[i][1] - player2Positions[i + 1][1] === -1) {
            ++consecutiveV;
        } else {
            consecutiveV = 0;
        }
        if (consecutiveV === 3) {
            winMessage(player2);
            break;
        }
    }
}

function checkHorizontalsPlayer1() {
    let length = player1Positions.length;
    player1Positions.sort(comparePairsHorizontal);
    player1Msg.textContent = player1Positions;
    let consecutiveH = 0;
    for (let i = 0; i < length - 1; ++i) {
        if (player1Positions[i][1] === player1Positions[i + 1][1] && player1Positions[i][0] - player1Positions[i + 1][0] == -1) {
            ++consecutiveH;
            csmessageH.textContent = "Horizontal 1" + consecutiveH;
        } else {
            consecutiveH = 0;
            csmessageH.textContent = "Horizontal 1" + consecutiveH;
        }
        if (consecutiveH === 3) {
            winMessage(player1);
            break; 
        }
    }
}

function checkHorizontalsPlayer2() {
    let length = player2Positions.length;
    player2Positions.sort(comparePairsHorizontal);
    player2Msg.textContent = player2Positions;
    let consecutiveH = 0;  
    for (let i = 0; i < length - 1; ++i) {
        if (player2Positions[i][1] === player2Positions[i + 1][1] && player2Positions[i][0] - player2Positions[i + 1][0] === -1) {
            ++consecutiveH;
        } else {
            consecutiveH = 0;
        }
        if (consecutiveH === 3) {
            winMessage(player2);
            break;
        }
    }
}

function checkDiagonalsPlayer1() {//nu reseteaza corect, da "win" si daca este intercalata cealalta culoare!!!
    let length = player1Positions.length;
    player1Positions.sort(comparePairsVertical);
    let consecutiveD = 0; 
    for (let i = 0; i < length; ++i) {
        consecutiveD = 0;
        for (let j = i + 1; j < length; ++j) {
            if (
                player1Positions[j][1] - player1Positions[i][1] === player1Positions[j][0] - player1Positions[i][0]
                ) {
                ++consecutiveD;
            }
        }
        if (consecutiveD === 3) {
            winMessage(player1);
            break; 
        }
        for (let j = i + 1; j < length; ++j) {
            consecutiveD = 0;
            if (
                player1Positions[j][1] - player1Positions[i][1] === -(player1Positions[j][0] - player1Positions[i][0])
                ) {
                ++consecutiveD;
            }
        }
        if (consecutiveD === 3) {
            winMessage(player1);
            break; 
        }
    }
}

function checkDiagonalsPlayer2() {//nu reseteaza corect, da "win" si daca este intercalata cealalta culoare!!!
    let length = player2Positions.length;
    player1Positions.sort(comparePairsVertical);
    let consecutiveD = 0; 
    for (let i = 0; i < length; ++i) {
        consecutiveD = 0;
        for (let j = i + 1; j < length; ++j) {
            if (
                player2Positions[j][1] - player2Positions[i][1] === player2Positions[j][0] - player2Positions[i][0]
                ) {
                    ++consecutiveD;
            }
        }
        if (consecutiveD === 3) {
            winMessage(player2);
            break;
        }
        for (let j = i + 1; j < length; ++j) {
            consecutiveD = 0;
            if (
                player2Positions[j][1] - player2Positions[i][1] === -(player2Positions[j][0] - player2Positions[i][0])
                ) { 
                    ++consecutiveD;
            }
        }
        if (consecutiveD === 3) {
            winMessage(player2);
            break;
        }
    }
}

function winMessage(player) {
    plmessage = document.getElementById("winMessage");
    plmessage.textContent = player + " wins!!";
}

let columns = [];
document.addEventListener(`DOMContentLoaded`, function() {
    for (let i = 0; i < 7; ++i) {
        columns[i] = document.getElementById(`c${i}`);
        columns[i].addEventListener('click', function(event) {
            markCell(i);
        });
    }
    initiateRowAndPlayers();
}); 