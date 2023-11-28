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
})();

/******/ })()
;