/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
      console.log("false");
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
  }]);
  return GameRule;
}();
module.exports = GameRule;

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
var GameRuleFile = __webpack_require__(/*! ./GameRule.js */ "./resources/js/GameRule.js");
var GameRule;
var width, height, cellWidth, cellHeight;
var fieldSize = {
  x: 7,
  y: 6
};
GameRule = new GameRuleFile(fieldSize.x, fieldSize.y);
var screenPercent = 0.35;
var circles = [];
var noneColor = "#ccc";
var player1Color = "blue";
var player2Color = "red";
var nextTopColor = "magenta";
function resizeCanvas() {
  console.log("hi");
  width = window.innerWidth * screenPercent;
  height = width * fieldSize.y / fieldSize.x;
  canvas.width = width;
  canvas.height = height;
  cellWidth = width / fieldSize.x;
  cellHeight = height / fieldSize.y;
  generateCircles();
}
function generateCircles() {
  circles = [];
  var _loop = function _loop(x) {
    var _loop2 = function _loop2(y) {
      var existingCircle = circles.find(function (circle) {
        return circle.x === x && circle.y === y;
      });
      if (!existingCircle) {
        circles.push({
          x: x,
          y: y,
          owner: "None"
        });
      }
    };
    for (var y = 0; y < fieldSize.y; y++) {
      _loop2(y);
    }
  };
  for (var x = 0; x < fieldSize.x; x++) {
    _loop(x);
  }
  drawCircles();
}
function drawCircle(x, y, color) {
  ctx.beginPath();
  var circlePos = GetCirclePosition({
    x: x,
    y: y
  });
  ctx.arc(circlePos.x, circlePos.y, Math.min(cellWidth, cellHeight) * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    drawCircle(circle.x, circle.y, GetColor(circle));
  }
}
function GetCirclePosition(circle) {
  return {
    x: circle.x * cellWidth + cellWidth / 2,
    y: height - (circle.y * cellHeight + cellHeight / 2)
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
  var clickedX = event.clientX - canvas.offsetLeft;
  var clickedY = event.clientY - canvas.offsetTop;
  for (var i = 0; i < circles.length; i++) {
    var circlePos = GetCirclePosition(circles[i]);
    if (clickedX > circlePos.x - cellWidth / 2 && clickedX < circlePos.x + cellWidth / 2 && clickedY > circlePos.y - cellHeight / 2 && clickedY < circlePos.y + cellHeight / 2) {
      CircleAction(circles[i]);
      break;
    }
  }
}
function CircleAction(clickedCircle) {
  console.log("good");
  GameRule.IsCircleActivated(clickedCircle);
  drawCircles();
}
canvas.addEventListener("click", ClickOnCircle);
window.onload = function () {
  resizeCanvas();
};
window.addEventListener("resize", function () {
  resizeCanvas();
});
})();

/******/ })()
;