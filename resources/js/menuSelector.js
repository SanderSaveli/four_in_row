const squares = document.querySelectorAll(".content-square");
const gameConfig = require("./gameConfig.js");

squares.forEach((square, index) => {
    square.addEventListener("click", () => {
        deselectAll();
        square.classList.add("square-selected");
        switch (square.id) {
            case "handToHand":
                gameConfig.gameMode = "handToHand";
                break;
            case "online":
                gameConfig.gameMode = "online";
                break;
            case "bot":
                gameConfig.gameMode = "bot";
                break;
            default:
                break;
        }
    });
});

function deselectAll() {
    squares.forEach((square) => {
        square.classList.remove("square-selected");
    });
}
