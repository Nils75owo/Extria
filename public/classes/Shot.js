var Shot = /** @class */ (function () {
    function Shot(pos, velocity) {
        if (velocity === void 0) { velocity = { x: 7, y: 0 }; }
        this.pos = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.damage = 2;
        this.window = { x: 1280, y: 720 };
        this.texture = new Image();
        this.texture["src"] = "./textures/Shot.png";
        this.pos = pos;
        this.velocity = velocity;
    }
    Shot.prototype.update = function (dtf) {
        this.pos["x"] += this.velocity["x"] * dtf;
        this.pos["y"] += this.velocity["y"] * dtf;
        if (this.pos["x"] < 0)
            return true;
        if (this.pos["y"] < -20)
            return true;
        if (this.pos["x"] > this.window["x"])
            return true;
        if (this.pos["y"] > this.window["y"])
            return true;
    };
    Shot.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.drawImage(this.texture, Math.round(this.pos["x"]), Math.round(this.pos["y"]));
        ctx.closePath();
    };
    return Shot;
}());
export default Shot;
