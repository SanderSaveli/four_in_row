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
    drawCircle(x, y, type) {
        let circlePos = this.GetCirclePosition({ x, y });
        switch (type) {
            case "Empty":
                this.drawOneColorCircle(
                    circlePos,
                    this.canvasConfig.emptyColor,
                    0.4
                );
                break;
            case "Player1":
                this.drawOneColorCircle(
                    circlePos,
                    this.canvasConfig.player1Color,
                    0.4
                );
                break;
            case "Player2":
                this.drawOneColorCircle(
                    circlePos,
                    this.canvasConfig.player2Color,
                    0.4
                );
                break;
            case "NextTop":
                this.drawHilightedCircle(
                    circlePos,
                    this.canvasConfig.emptyColor,
                    this.canvasConfig.hilightColor
                );
                break;
        }
    }
    GetCirclePosition(circle) {
        return {
            x: circle.x * this.cellWidth + this.cellWidth / 2,
            y: this.height - (circle.y * this.cellHeight + this.cellHeight / 2),
        };
    }

    drawOneColorCircle(circlePos, color, cellPercent) {
        this.ctx.beginPath();
        this.ctx.arc(
            circlePos.x,
            circlePos.y,
            Math.min(this.cellWidth, this.cellHeight) * cellPercent,
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawHilightedCircle(circlePos, circleColor, hilightColor) {
        this.drawOneColorCircle(circlePos, circleColor, 0.4);
        this.drawOneColorCircle(circlePos, hilightColor, 0.05);
    }
}
module.exports = Canvas;
