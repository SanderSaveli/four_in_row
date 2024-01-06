/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/Canvas.js":
/*!********************************!*\
  !*** ./resources/js/Canvas.js ***!
  \********************************/
/***/ ((module) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Canvas = /*#__PURE__*/function () {
  function Canvas(canvas, canvasConfig) {
    _classCallCheck(this, Canvas);
    this.canvas = canvas;
    this.canvasConfig = canvasConfig;
    this.ctx = canvas.getContext("2d");
    this.resizeCanvas();
  }
  _createClass(Canvas, [{
    key: "resizeCanvas",
    value: function resizeCanvas() {
      this.width = window.innerWidth * this.canvasConfig.screenPercent;
      this.height = this.width * this.canvasConfig.fieldSize.y / this.canvasConfig.fieldSize.x;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.cellWidth = this.width / this.canvasConfig.fieldSize.x;
      this.cellHeight = this.height / this.canvasConfig.fieldSize.y;
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(x, y, type) {
      var circlePos = this.GetCirclePosition({
        x: x,
        y: y
      });
      switch (type) {
        case "Empty":
          this.drawOneColorCircle(circlePos, this.canvasConfig.emptyColor, 0.4);
          break;
        case "Player1":
          this.drawOneColorCircle(circlePos, this.canvasConfig.player1Color, 0.4);
          break;
        case "Player2":
          this.drawOneColorCircle(circlePos, this.canvasConfig.player2Color, 0.4);
          break;
        case "NextTop":
          this.drawHilightedCircle(circlePos, this.canvasConfig.emptyColor, this.canvasConfig.hilightColor);
          break;
      }
    }
  }, {
    key: "GetCirclePosition",
    value: function GetCirclePosition(circle) {
      return {
        x: circle.x * this.cellWidth + this.cellWidth / 2,
        y: this.height - (circle.y * this.cellHeight + this.cellHeight / 2)
      };
    }
  }, {
    key: "drawOneColorCircle",
    value: function drawOneColorCircle(circlePos, color, cellPercent) {
      this.ctx.beginPath();
      this.ctx.arc(circlePos.x, circlePos.y, Math.min(this.cellWidth, this.cellHeight) * cellPercent, 0, Math.PI * 2);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }, {
    key: "drawHilightedCircle",
    value: function drawHilightedCircle(circlePos, circleColor, hilightColor) {
      this.drawOneColorCircle(circlePos, circleColor, 0.4);
      this.drawOneColorCircle(circlePos, hilightColor, 0.05);
    }
  }]);
  return Canvas;
}();
module.exports = Canvas;

/***/ }),

/***/ "./resources/js/GameRule.js":
/*!**********************************!*\
  !*** ./resources/js/GameRule.js ***!
  \**********************************/
/***/ ((module) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var GameRule = /*#__PURE__*/function () {
  function GameRule(fieldWidth, fieldHeight) {
    _classCallCheck(this, GameRule);
    this.topCircles = [];
    this.circles = [];
    this.gameOn = true;
    for (var x = 0; x < fieldWidth; x++) {
      this.circles.push([]);
      for (var y = 0; y < fieldHeight; y++) {
        this.circles[x].push({
          x: x,
          y: y,
          owner: "None"
        });
      }
      this.topCircles.push({
        x: x,
        y: 0,
        owner: "None"
      });
    }
    this.playerTurn = 0;
  }
  _createClass(GameRule, [{
    key: "IsCircleActivated",
    value: function IsCircleActivated(circle) {
      console.log(circle);
      for (var i = 0; i < this.topCircles.length; i++) {
        if (this.topCircles[i].x == circle.x && this.topCircles[i].y == circle.y) {
          if (circle.owner === "None") {
            return true;
          }
        }
      }
      console.log(circle);
      return false;
    }
  }, {
    key: "GetCircleStatus",
    value: function GetCircleStatus(x, y) {
      var curr = this.circles[x][y];
      if (curr.owner != "None") {
        return curr.owner;
      } else {
        if (curr.y == this.topCircles[curr.x].y && this.gameOn) {
          return "NextTop";
        } else {
          return "Empty";
        }
      }
    }
  }, {
    key: "gameEnd",
    value: function gameEnd() {
      this.gameOn = false;
    }
  }, {
    key: "getCircles",
    value: function getCircles() {
      return this.circles;
    }
  }, {
    key: "getPlayerTurn",
    value: function getPlayerTurn() {
      return this.playerTurn % 2 == 0 ? "Player1" : "Player2";
    }
  }, {
    key: "updateField",
    value: function updateField(board) {
      this.circles = board;
      console.log(board);
      for (var i = 0; i < this.topCircles.length; i++) {
        var y = this.topCircles[i].y;
        if (board[i][y].owner != "None") {
          this.topCircles[i].y++;
          if (this.topCircles[i].y > 5) {
            this.topCircles[i].y = 5;
          }
        }
      }
      this.playerTurn++;
    }
  }]);
  return GameRule;
}();
module.exports = GameRule;

/***/ }),

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

/***/ }),

/***/ "./resources/js/showPopup.js":
/*!***********************************!*\
  !*** ./resources/js/showPopup.js ***!
  \***********************************/
/***/ ((module) => {

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function showPopup(popupContainer, text, buttons) {
  var popup = document.createElement("div");
  popup.className = "popup";
  var popupContent = document.createElement("div");
  popupContent.className = "popup-content";
  var heading = document.createElement("h2");
  heading.textContent = text;
  var buttonsDiv = document.createElement("div");
  buttonsDiv.className = "popup-buttons";
  var _iterator = _createForOfIteratorHelper(buttons),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      var button = document.createElement("button");
      button.textContent = element.text;
      button.addEventListener("click", element.action);
      buttonsDiv.appendChild(button);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  popupContent.appendChild(heading);
  popupContent.appendChild(buttonsDiv);
  popup.appendChild(popupContent);
  popupContainer.appendChild(popup);
}
module.exports = showPopup;

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
/*!******************************!*\
  !*** ./resources/js/game.js ***!
  \******************************/
var canvas = document.getElementById("fieldCanvas");
var ctx = canvas.getContext("2d");
var gameConfig = __webpack_require__(/*! ./gameConfig.js */ "./resources/js/gameConfig.js");
var CanvasFile = __webpack_require__(/*! ./Canvas.js */ "./resources/js/Canvas.js");
var Canvas = new CanvasFile(canvas, {
  fieldSize: {
    x: gameConfig.fieldSize.x,
    y: gameConfig.fieldSize.y
  },
  screenPercent: 0.35,
  emptyColor: gameConfig.noneColor,
  player1Color: gameConfig.player1Color,
  player2Color: gameConfig.player2Color,
  hilightColor: gameConfig.nextTopColor
});
var GameRuleFile = __webpack_require__(/*! ./GameRule.js */ "./resources/js/GameRule.js");
var GameRule = new GameRuleFile(gameConfig.fieldSize.x, gameConfig.fieldSize.y);
var movesNumber = 0;
var userId = null;
fetch("/get-user-id").then(function (response) {
  return response.json();
}).then(function (data) {
  userId = data.userId;
})["catch"]();
var showPopup = __webpack_require__(/*! ./showPopup.js */ "./resources/js/showPopup.js");
var field = [];
function start() {
  generateField();
  drawCircles();
  movesNumber = 0;
  console.log(gameConfig.gameMode);
}
function generateField() {
  field = [];
  for (var x = 0; x < gameConfig.fieldSize.x; x++) {
    field.push([]);
    for (var y = 0; y < gameConfig.fieldSize.y; y++) {
      field[x].push({
        x: x,
        y: y,
        owner: "None"
      });
    }
  }
}
function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < field.length; x++) {
    for (var y = 0; y < field[x].length; y++) {
      var circle = field[x][y];
      Canvas.drawCircle(x, y, GameRule.GetCircleStatus(circle.x, circle.y));
    }
  }
}
function ClickOnCircle(event) {
  var clickedX = event.clientX - canvas.offsetLeft;
  var clickedY = event.clientY - canvas.offsetTop;
  for (var i = 0; i < field.length; i++) {
    var circlePos = Canvas.GetCirclePosition(field[i][0]);
    if (clickedX > circlePos.x - Canvas.cellWidth / 2 && clickedX < circlePos.x + Canvas.cellWidth / 2) {
      for (var j = 0; j < field[i].length; j++) {
        var _circlePos = Canvas.GetCirclePosition(field[i][j]);
        if (clickedY > _circlePos.y - Canvas.cellHeight / 2 && clickedY < _circlePos.y + Canvas.cellHeight / 2) {
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
  var data = {
    field: field,
    move: {
      circle: activatedCircle,
      actor: GameRule.getPlayerTurn()
    },
    movesNumber: movesNumber,
    playerID: userId
  };
  return data;
}
function getAIData() {
  var data = {
    board: field,
    player: "Player2",
    movesNumber: movesNumber
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
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  var token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
  xhr.setRequestHeader("X-CSRF-TOKEN", token);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
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
  showPopup(document.getElementById("popup-container"), "Игра окончена!", [{
    text: "Back to menu",
    action: function action() {
      window.location.href = "/";
    }
  }, {
    text: "Play again",
    action: function action() {
      window.location.href = "/game";
    }
  }]);
}
canvas.addEventListener("click", ClickOnCircle);
window.onload = function () {
  start();
};
window.addEventListener("resize", function () {
  Canvas.resizeCanvas();
  drawCircles();
});
})();

/******/ })()
;