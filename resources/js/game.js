const canvas = document.getElementById("fieldCanvas");
const ctx = canvas.getContext("2d");

const { default: axios } = require("axios");
const GameRuleFile = require("./GameRule.js");
let GameRule;

let width, height, cellWidth, cellHeight;
let fieldSize = {
    x: 7,
    y: 6,
};

GameRule = new GameRuleFile(fieldSize.x, fieldSize.y);
let screenPercent = 0.35;
let circles = [];

let noneColor = "#454f5a";
let player1Color = "blue";
let player2Color = "red";
let nextTopColor = "#ccc";

function resizeCanvas() {
    console.log("hi");
    width = window.innerWidth * screenPercent;
    height = (width * fieldSize.y) / fieldSize.x;

    canvas.width = width;
    canvas.height = height;

    cellWidth = width / fieldSize.x;
    cellHeight = height / fieldSize.y;

    generateCircles();
}

function generateCircles() {
    circles = [];

    for (let x = 0; x < fieldSize.x; x++) {
        for (let y = 0; y < fieldSize.y; y++) {
            const existingCircle = circles.find(
                (circle) => circle.x === x && circle.y === y
            );
            if (!existingCircle) {
                circles.push({ x, y, owner: "None" });
            }
        }
    }
    drawCircles();
}

function drawCircle(x, y, color) {
    ctx.beginPath();
    let circlePos = GetCirclePosition({ x, y });
    ctx.arc(
        circlePos.x,
        circlePos.y,
        Math.min(cellWidth, cellHeight) * 0.4,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        drawCircle(circle.x, circle.y, GetColor(circle));
    }
}

function GetCirclePosition(circle) {
    return {
        x: circle.x * cellWidth + cellWidth / 2,
        y: height - (circle.y * cellHeight + cellHeight / 2),
    };
}
function GetColor(circle) {
    switch (GameRule.GetCircleStatus(circle.x, circle.y)) {
        case "None":
            return noneColor;
        case "Player1":
            return player1Color;
        case "Player2":
            return player2Color;
        case "NextTop":
            return nextTopColor;
    }
    console.log("Сan not recognize the owner" + owner);
}
function ClickOnCircle(event) {
    const clickedX = event.clientX - canvas.offsetLeft;
    const clickedY = event.clientY - canvas.offsetTop;
    for (let i = 0; i < circles.length; i++) {
        let circlePos = GetCirclePosition(circles[i]);
        if (
            clickedX > circlePos.x - cellWidth / 2 &&
            clickedX < circlePos.x + cellWidth / 2 &&
            clickedY > circlePos.y - cellHeight / 2 &&
            clickedY < circlePos.y + cellHeight / 2
        ) {
            CircleAction(circles[i]);
            break;
        }
    }
}

function CircleAction(clickedCircle) {
    console.log("good");
    GameRule.IsCircleActivated(clickedCircle);
    sendRequest();
    drawCircles();
}

function sendRequest() {
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
                console.log(response.message); // Вывести сообщение из ответа
                console.log(response.number);
            } else {
                console.error("There was a problem with the request.");
            }
        }
    };
    xhr.send(JSON.stringify(GameRule.getCircles()));
}

canvas.addEventListener("click", ClickOnCircle);

window.onload = function () {
    resizeCanvas();
};

window.addEventListener("resize", function () {
    resizeCanvas();
});
