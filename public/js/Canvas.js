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
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/js/Canvas.js");
/******/ 	
/******/ })()
;