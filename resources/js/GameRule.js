class GameRule {
    constructor(fieldWidth, fieldHeight) {
        this.topCircles = [];
        this.circles = [];
        this.gameOn = true;
        for (let x = 0; x < fieldWidth; x++) {
            this.circles.push([]);
            for (let y = 0; y < fieldHeight; y++) {
                this.circles[x].push({ x: x, y: y, owner: "None" });
            }
            this.topCircles.push({ x: x, y: 0, owner: "None" });
        }
        this.playerTurn = 0;
    }

    IsCircleActivated(circle) {
        console.log(circle);
        for (let i = 0; i < this.topCircles.length; i++) {
            if (
                this.topCircles[i].x == circle.x &&
                this.topCircles[i].y == circle.y
            ) {
                if (circle.owner === "None") {
                    return true;
                }
            }
        }
        console.log(circle);
        return false;
    }

    updateTurn(changedCircle) {
        this.circles[changedCircle.x][changedCircle.y] = changedCircle;
        this.playerTurn++;
        this.topCircles[changedCircle.x].y++;
    }

    GetCircleStatus(x, y) {
        let curr = this.circles[x][y];
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

    gameEnd() {
        this.gameOn = false;
    }

    getCircles() {
        return this.circles;
    }

    getPlayerTurn() {
        return this.playerTurn % 2 == 0 ? "Player1" : "Player2";
    }
    updateField(board) {
        this.circles = board;
        console.log(board);
        for (let i = 0; i < this.topCircles.length; i++) {
            let y = this.topCircles[i].y;
            if (board[i][y].owner != "None") {
                this.topCircles[i].y++;
                if (this.topCircles[i].y > 5) {
                    this.topCircles[i].y = 5;
                }
            }
        }
        this.playerTurn++;
    }
}

module.exports = GameRule;
