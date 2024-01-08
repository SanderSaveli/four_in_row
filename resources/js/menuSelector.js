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

const rulesButton = document.getElementById("rulesButton");
const rulesModal = document.getElementById("rulesModal");

const closeModal = document.getElementsByClassName("close")[0];
const rulesContainer = document.getElementById("rulesText");

const connectFourRules = `
<p>Connect Four is a two-player game played on a vertical grid with six rows and seven columns. The objective is to be the first to form a line of four of your colored discs in a row, column, or diagonal.</p>

<p>Players take turns dropping one of their colored discs from the top into any chosen column. The disc falls down the grid to the lowest available empty space in that column.</p>

<p>The game continues until one player successfully places four of their discs in a row horizontally, vertically, or diagonally, or until the entire board is filled without a winner, resulting in a draw.</p>

<p>Players must strategize to create their own four-in-a-row while also blocking their opponent's attempts to achieve the same.</p>

<p>The player who forms a line of four discs first, whether vertically, horizontally, or diagonally, wins the game!</p>

<p>Enjoy playing Connect Four!</p>
`;

rulesContainer.innerHTML = connectFourRules;

rulesButton.addEventListener("click", function () {
    rulesModal.style.display = "block";
});

closeModal.addEventListener("click", function () {
    rulesModal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == rulesModal) {
        rulesModal.style.display = "none";
    }
});
