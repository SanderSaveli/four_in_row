const canvas = document.getElementById("fieldCanvas");
const ctx = canvas.getContext("2d");

const gameConfig = require("./gameConfig.js");

const CanvasFile = require("./Canvas.js");
const Canvas = new CanvasFile(canvas, {
    fieldSize: { x: gameConfig.fieldSize.x, y: gameConfig.fieldSize.y },
    screenPercent: 0.35,
});

const GameRuleFile = require("./GameRule.js");
const GameRule = new GameRuleFile(
    gameConfig.fieldSize.x,
    gameConfig.fieldSize.y
);
let field = [];

function start() {
    generateField();
    Canvas.resizeCanvas();
    drawCircles();
}

function generateField() {
    field = [];

    for (let x = 0; x < gameConfig.fieldSize.x; x++) {
        field.push([]);
        for (let y = 0; y < gameConfig.fieldSize.y; y++) {
            field[x].push({ x: x, y: y, owner: "None" });
        }
    }
    drawCircles();
}

function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field[x].length; y++) {
            const circle = field[x][y];
            Canvas.drawCircle(x, y, GetColor(circle));
        }
    }
}

function GetColor(circle) {
    switch (GameRule.GetCircleStatus(circle.x, circle.y)) {
        case "None":
            return gameConfig.noneColor;
        case "Player1":
            return gameConfig.player1Color;
        case "Player2":
            return gameConfig.player2Color;
        case "NextTop":
            return gameConfig.nextTopColor;
    }
    console.log("Сan not recognize the owner" + owner);
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
        sendRequest(getMoveData(clickedCircle));
    }
}

function getMoveData(activatedCircle) {
    let data = {
        field: field,
        move: {
            circle: activatedCircle,
            actor: GameRule.getPlayerTurn(),
        },
    };
    return data;
}

function sendRequest(data) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/makeMove", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    xhr.setRequestHeader("X-CSRF-TOKEN", token);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response.message);
                console.log(response.answer);
                if (response.answer != null) {
                    field[response.answer.x][response.answer.y] =
                        response.answer;
                }
                GameRule.updateTurn(response.answer);
                drawCircles();
            } else {
                console.error("There was a problem with the request.");
            }
        }
    };
    xhr.send(JSON.stringify(data));
}

canvas.addEventListener("click", ClickOnCircle);

window.onload = function () {
    start();
};

window.addEventListener("resize", function () {
    Canvas.resizeCanvas();
});
