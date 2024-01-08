const canvas = document.getElementById("fieldCanvas");
const ctx = canvas.getContext("2d");

const gameConfig = require("./gameConfig.js");

const CanvasFile = require("./Canvas.js");
const Canvas = new CanvasFile(canvas, {
    fieldSize: { x: gameConfig.fieldSize.x, y: gameConfig.fieldSize.y },
    screenPercent: 0.35,
    emptyColor: gameConfig.noneColor,
    player1Color: gameConfig.player1Color,
    player2Color: gameConfig.player2Color,
    hilightColor: gameConfig.nextTopColor,
});

const GameRuleFile = require("./GameRule.js");
const GameRule = new GameRuleFile(
    gameConfig.fieldSize.x,
    gameConfig.fieldSize.y
);
let movesNumber = 0;
var userId = null;
fetch("/get-user-id")
    .then((response) => response.json())
    .then((data) => {
        userId = data.userId;
    })
    .catch();

const showPopup = require("./showPopup.js");
let field = [];

function start() {
    generateField();
    drawCircles();
    movesNumber = 0;
    console.log(getMoveData(1));
}

function generateField() {
    field = [];

    for (let x = 0; x < gameConfig.fieldSize.x; x++) {
        field.push([]);
        for (let y = 0; y < gameConfig.fieldSize.y; y++) {
            field[x].push({ x: x, y: y, owner: "None" });
        }
    }
}

function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field[x].length; y++) {
            const circle = field[x][y];
            Canvas.drawCircle(
                x,
                y,
                GameRule.GetCircleStatus(circle.x, circle.y)
            );
        }
    }
}

function ClickOnCircle(event) {
    const clickedX = event.clientX - canvas.offsetLeft;
    const clickedY = event.clientY - canvas.offsetTop;
    for (let i = 0; i < field.length; i++) {
        let circlePos = Canvas.GetCirclePosition(field[i][0]);
        if (
            clickedX > circlePos.x - Canvas.cellWidth / 2 &&
            clickedX < circlePos.x + Canvas.cellWidth / 2
        ) {
            for (let j = 0; j < field[i].length; j++) {
                let circlePos = Canvas.GetCirclePosition(field[i][j]);
                if (
                    clickedY > circlePos.y - Canvas.cellHeight / 2 &&
                    clickedY < circlePos.y + Canvas.cellHeight / 2
                ) {
                    CircleAction(field[i][j]);
                    break;
                }
            }
            break;
        }
    }
}

function CircleAction(clickedCircle) {
    if (GameRule.IsCircleActivated(clickedCircle)) {
        sendMoveRequest(getMoveData(clickedCircle));
    }
}

function getMoveData(activatedCircle) {
    let data = {
        field: field,
        move: {
            circle: activatedCircle,
            actor: GameRule.getPlayerTurn(),
        },
        movesNumber: movesNumber,
        playerID: userId,
    };
    return data;
}

function getAIData() {
    let data = {
        board: field,
        player: "Player2",
        movesNumber: movesNumber,
    };
    return data;
}

function sendMoveRequest(data) {
    sendRequestToServer(data, "/makeMove", makePlayerMove);
}

function sendMakeAIMoveRequest(data) {
    sendRequestToServer(data, "/makeAIMove", updateFieldAfterMove);
}

function sendRequestToServer(data, url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    console.log(token);
    xhr.setRequestHeader("X-CSRF-TOKEN", token);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.answer != null) {
                    callback(response.answer);
                }
            } else {
                console.error("There was a problem with the request.");
            }
        }
    };
    xhr.send(JSON.stringify(data));
}

function makePlayerMove(data) {
    updateFieldAfterMove(data);
    if (data.type == "PlayerWin") {
        gameEnd();
    } else {
        sendMakeAIMoveRequest(getAIData());
    }
}
function updateFieldAfterMove(data) {
    field = data.field;
    movesNumber = data.movesNumber;
    console.log(movesNumber);
    console.log(field);

    GameRule.updateField(field);
    drawCircles();
}

function gameEnd() {
    canvas.removeEventListener("click", ClickOnCircle);
    GameRule.gameEnd();
    showPopup(document.getElementById("popup-container"), "Игра окончена!", [
        {
            text: "Back to menu",
            action: function () {
                window.location.href = "/";
            },
        },
        {
            text: "Play again",
            action: function () {
                window.location.href = "/game";
            },
        },
    ]);
}

canvas.addEventListener("click", ClickOnCircle);

window.onload = function () {
    start();
};

window.addEventListener("resize", function () {
    Canvas.resizeCanvas();
    drawCircles();
});
