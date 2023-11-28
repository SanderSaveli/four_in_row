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
    value: function drawCircle(x, y, color) {
      this.ctx.beginPath();
      var circlePos = this.GetCirclePosition({
        x: x,
        y: y
      });
      this.ctx.arc(circlePos.x, circlePos.y, Math.min(this.cellWidth, this.cellHeight) * 0.4, 0, Math.PI * 2);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }, {
    key: "GetCirclePosition",
    value: function GetCirclePosition(circle) {
      return {
        x: circle.x * this.cellWidth + this.cellWidth / 2,
        y: this.height - (circle.y * this.cellHeight + this.cellHeight / 2)
      };
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
    for (var x = 0; x < fieldWidth; x++) {
      for (var y = 0; y < fieldHeight; y++) {
        this.circles.push({
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
            circle.owner = this.playerTurn % 2 == 0 ? "Player1" : "Player2";
            this.FindCircle(circle.x, circle.y).owner = circle.owner;
            this.playerTurn++;
            this.topCircles[i].y++;
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
      var curr = this.FindCircle(x, y);
      if (curr.owner != "None") {
        return curr.owner;
      } else {
        if (curr.y == this.topCircles[curr.x].y) {
          return "NextTop";
        } else {
          return "None";
        }
      }
    }
  }, {
    key: "FindCircle",
    value: function FindCircle(x, y) {
      for (var i = 0; i < this.circles.length; i++) {
        if (this.circles[i].x == x && this.circles[i].y == y) {
          return this.circles[i];
        }
      }
    }
  }, {
    key: "getCircles",
    value: function getCircles() {
      return this.circles;
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
  screenPercent: 0.35
});
var GameRuleFile = __webpack_require__(/*! ./GameRule.js */ "./resources/js/GameRule.js");
var GameRule = new GameRuleFile(gameConfig.fieldSize.x, gameConfig.fieldSize.y);
var field = [];
function start() {
  generateField();
  Canvas.resizeCanvas();
  drawCircles();
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
  drawCircles();
}
function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < field.length; x++) {
    for (var y = 0; y < field[x].length; y++) {
      var circle = field[x][y];
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
    sendRequest();
  }
  drawCircles();
}
function sendRequest() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/makeMove", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  var token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
  xhr.setRequestHeader("X-CSRF-TOKEN", token);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response.message); // Вывести сообщение из ответа
        console.log(response.number);
      } else {
        console.error("There was a problem with the request.");
      }
    }
  };
  xhr.send(JSON.stringify(field));
}
canvas.addEventListener("click", ClickOnCircle);
window.onload = function () {
  start();
};
window.addEventListener("resize", function () {
  Canvas.resizeCanvas();
});
})();

/******/ })()
;