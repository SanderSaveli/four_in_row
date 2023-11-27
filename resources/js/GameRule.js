class GameRule {
    constructor(fieldWidth, fieldHeight) {
        this.topCircles = [];
        this.circles = [];
        for (let x = 0; x < fieldWidth; x++) {
            for (let y = 0; y < fieldHeight; y++) {
                this.circles.push({ x: x, y: y, owner: "None" });
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
                    circle.owner =
                        this.playerTurn % 2 == 0 ? "Player1" : "Player2";
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

    GetCircleStatus(x, y) {
        let curr = this.FindCircle(x, y);
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

    FindCircle(x, y) {
        for (let i = 0; i < this.circles.length; i++) {
            if (this.circles[i].x == x && this.circles[i].y == y) {
                return this.circles[i];
            }
        }
    }
}

module.exports = GameRule;
