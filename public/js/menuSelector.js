/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/gameConfig.js":
/*!************************************!*\
  !*** ./resources/js/gameConfig.js ***!
  \************************************/
/***/ ((module) => {

var gameConfig = {
  fieldSize: {
    x: 7,
    y: 6
  },
  gameMode: "handToHand",
  noneColor: "#454f5a",
  player1Color: "blue",
  player2Color: "red",
  nextTopColor: "#ccc"
};
module.exports = gameConfig;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./resources/js/menuSelector.js ***!
  \**************************************/
var squares = document.querySelectorAll(".content-square");
var gameConfig = __webpack_require__(/*! ./gameConfig.js */ "./resources/js/gameConfig.js");
squares.forEach(function (square, index) {
  square.addEventListener("click", function () {
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
  squares.forEach(function (square) {
    square.classList.remove("square-selected");
  });
}
var rulesButton = document.getElementById("rulesButton");
var rulesModal = document.getElementById("rulesModal");
var closeModal = document.getElementsByClassName("close")[0];
var rulesContainer = document.getElementById("rulesText");
var connectFourRules = "\n<p>Connect Four is a two-player game played on a vertical grid with six rows and seven columns. The objective is to be the first to form a line of four of your colored discs in a row, column, or diagonal.</p>\n\n<p>Players take turns dropping one of their colored discs from the top into any chosen column. The disc falls down the grid to the lowest available empty space in that column.</p>\n\n<p>The game continues until one player successfully places four of their discs in a row horizontally, vertically, or diagonally, or until the entire board is filled without a winner, resulting in a draw.</p>\n\n<p>Players must strategize to create their own four-in-a-row while also blocking their opponent's attempts to achieve the same.</p>\n\n<p>The player who forms a line of four discs first, whether vertically, horizontally, or diagonally, wins the game!</p>\n\n<p>Enjoy playing Connect Four!</p>\n";
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
})();

/******/ })()
;