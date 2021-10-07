export default class Shot {
  texture: HTMLImageElement;
  pos: Vector2n = { x: 0, y: 0 };
  velocity: Vector2n = { x: 0, y: 0 };
  damage: number = 2;
  window: Vector2n = { x: 1280, y: 720 };

  constructor(pos: Vector2n, velocity: Vector2n = { x: 7, y:0 }) {
    this.texture = new Image();
    this.texture["src"] = "./textures/Shot.png";
    this.pos = pos;
    this.velocity = velocity;
  }

  update(dtf: number) {
    this.pos["x"] += this.velocity["x"] * dtf;
    this.pos["y"] += this.velocity["y"] * dtf;

    if (this.pos["x"] < 0) return true;
    if (this.pos["y"] < -20) return true;
    if (this.pos["x"] > this.window["x"]) return true;
    if (this.pos["y"] > this.window["y"]) return true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.drawImage(
      this.texture,
      Math.round(this.pos["x"]),
      Math.round(this.pos["y"])
    );
    ctx.closePath();
  }
}
