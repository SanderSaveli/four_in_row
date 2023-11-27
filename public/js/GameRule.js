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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/js/GameRule.js");
/******/ 	
/******/ })()
;