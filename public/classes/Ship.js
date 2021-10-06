var Ship = /** @class */ (function () {
    function Ship() {
        this.pos = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.maxVelocity = { x: 5, y: 5 };
        this.acceleration = { x: 1, y: 1 };
        this.direction = { x: 0, y: 0 };
        this.drag = { x: 0.2, y: 0.2 };
        this.window = { x: 1280, y: 720 };
        this.texture = new Image();
        this.texture["src"] = "./textures/Ship.png";
    }
    Ship.prototype.update = function (dtf, keys) {
        if (keys["Down"]) {
            this.direction["y"] = 1;
            if (this.velocity["y"] < this.maxVelocity["y"])
                this.velocity["y"] += this.acceleration["y"] * this.direction["y"];
        }
        if (keys["Up"]) {
            this.direction["y"] = -1;
            if (this.velocity["y"] > -this.maxVelocity["y"])
                this.velocity["y"] += this.acceleration["y"] * this.direction["y"];
        }
        if (keys["Right"]) {
            this.direction["x"] = 1;
            if (this.velocity["x"] < this.maxVelocity["x"])
                this.velocity["x"] += this.acceleration["x"] * this.direction["x"];
        }
        if (keys["Left"]) {
            this.direction["x"] = -1;
            if (this.velocity["x"] > -this.maxVelocity["x"])
                this.velocity["x"] += this.acceleration["x"] * this.direction["x"];
        }
        if (this.velocity["x"] > 0) {
            this.velocity["x"] -= this.drag["x"];
            if (this.velocity["x"] < 0)
                this.velocity["x"] = 0;
        }
        else if (this.velocity["x"] < 0) {
            this.velocity["x"] += this.drag["x"];
            if (this.velocity["x"] > 0)
                this.velocity["x"] = 0;
        }
        if (this.velocity["y"] > 0) {
            this.velocity["y"] -= this.drag["y"];
            if (this.velocity["y"] < 0)
                this.velocity["y"] = 0;
        }
        else if (this.velocity["y"] < 0) {
            this.velocity["y"] += this.drag["y"];
            if (this.velocity["y"] > 0)
                this.velocity["y"] = 0;
        }
        if (this.velocity["y"] > 0.1)
            if (this.window["y"] < this.pos["y"] + this.texture.height)
                this.velocity["y"] = 0;
        if (this.velocity["y"] < 0)
            if (0 > this.pos["y"])
                this.velocity["y"] = 0;
        if (this.velocity["x"] > 0.1)
            if (this.window["x"] < this.pos["x"] + this.texture.width)
                this.velocity["x"] = 0;
        if (this.velocity["x"] < 0)
            if (0 > this.pos["x"])
                this.velocity["x"] = 0;
        this.pos["x"] += this.velocity["x"] * dtf;
        this.pos["y"] += this.velocity["y"] * dtf;
        console.log(this.direction["x"]);
    };
    Ship.prototype.draw = function (ctx) {
        ctx.drawImage(this.texture, Math.round(this.pos["x"]), Math.round(this.pos["y"]));
    };
    return Ship;
}());
export default Ship;
