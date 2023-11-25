const canvas = document.getElementById("fieldCanvas");
const ctx = canvas.getContext("2d");

let width, height, cellWidth, cellHeight;
let circles = [];

function resizeCanvas() {
    width = window.innerWidth * 0.35;
    height = (width * 6) / 7;

    canvas.width = width;
    canvas.height = height;

    cellWidth = width / 7;
    cellHeight = height / 6;

    generateCircles();
}

function generateCircles() {
    circles = [];

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            const x = i * cellWidth + cellWidth / 2;
            const y = j * cellHeight + cellHeight / 2;
            const existingCircle = circles.find(
                (circle) => circle.x === x && circle.y === y
            );
            if (!existingCircle) {
                circles.push({ x, y, color: "#ccc" });
            }
        }
    }

    drawCircles();
}

function drawCircle(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, Math.min(cellWidth, cellHeight) * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        drawCircle(circle.x, circle.y, circle.color);
    }
}

canvas.addEventListener("click", function (event) {
    const clickedX = event.clientX - canvas.offsetLeft;
    const clickedY = event.clientY - canvas.offsetTop;

    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        if (
            clickedX > circle.x - cellWidth / 2 &&
            clickedX < circle.x + cellWidth / 2 &&
            clickedY > circle.y - cellHeight / 2 &&
            clickedY < circle.y + cellHeight / 2
        ) {
            if (circle.color === "#ccc") {
                circle.color = "blue";
            } else if (circle.color === "blue") {
                circle.color = "red";
            } else if (circle.color === "red") {
                circle.color = "#ccc";
            }
            drawCircles();
            break;
        }
    }
});

window.onload = function () {
    resizeCanvas();
};

window.addEventListener("resize", function () {
    resizeCanvas();
});
