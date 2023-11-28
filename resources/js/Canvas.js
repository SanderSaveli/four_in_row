class Canvas {
    constructor(canvas, canvasConfig) {
        this.canvas = canvas;
        this.canvasConfig = canvasConfig;
        this.ctx = canvas.getContext("2d");
        this.resizeCanvas();
    }
    resizeCanvas() {
        this.width = window.innerWidth * this.canvasConfig.screenPercent;
        this.height =
            (this.width * this.canvasConfig.fieldSize.y) /
            this.canvasConfig.fieldSize.x;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.cellWidth = this.width / this.canvasConfig.fieldSize.x;
        this.cellHeight = this.height / this.canvasConfig.fieldSize.y;
    }
    drawCircle(x, y, color) {
        this.ctx.beginPath();
        let circlePos = this.GetCirclePosition({ x, y });
        this.ctx.arc(
            circlePos.x,
            circlePos.y,
            Math.min(this.cellWidth, this.cellHeight) * 0.4,
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    GetCirclePosition(circle) {
        return {
            x: circle.x * this.cellWidth + this.cellWidth / 2,
            y: this.height - (circle.y * this.cellHeight + this.cellHeight / 2),
        };
    }
}
module.exports = Canvas;
