/*
 * performance stuff:
 *
 * create a new Array:
 * []  <  new Array()
 *
 * loop through many objects:
 * objs.forEach((currentObj) => {console.log(currentObj)})
 * <
 * for (const i = 0; i < objs.length; i++) {console.log(objs[i])}
 *
 */

//imports
import Ship from "./classes/Ship.js";
import Shot from "./classes/Shot.js";

//init game canvas
const bgCan: HTMLCanvasElement = document.createElement("canvas");
const bgCtx: CanvasRenderingContext2D | null = bgCan.getContext("2d");
bgCan.classList.add("can");
bgCan.id = "bgCan";
document.body.appendChild(bgCan);

const can: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D | null = can.getContext("2d");
can.classList.add("can");
can.id = "can";
document.body.appendChild(can);

//init images
const bg: HTMLImageElement = new Image();
bg["src"] = "./textures/bg.png";

//init variables
let drawObjs: any = new Array();
let oldDt: number = 0;
let dt: number = 0;
const f: number = 60;
let dtf: number = 0;
let keysPressed: KeyMap = {
  Left: false,
  Down: false,
  Right: false,
  Up: false,
  Space: false,
};
let newKeysPressed: KeyMap = {
  Left: false,
  Down: false,
  Right: false,
  Up: false,
  Space: false,
};

//init objects
const ship = new Ship();
drawObjs.push(ship);

//game loop
const gameLoop = (currentTime: number): void => {
  //Clearing old frame
  ctx.clearRect(0, 0, can.width, can.height);
  //Delta Time
  currentTime /= 1000;
  dt = currentTime - oldDt;
  oldDt = currentTime;
  dtf = dt * f;
  bgCtx.drawImage(bg, 0, 0);

  if (newKeysPressed["Space"]) {
    drawObjs.push(new Shot({ x: ship["pos"]["x"] + 55, y: ship["pos"]["y"] + 23 }, {x: 7, y: -0.5}));
    drawObjs.push(new Shot({ x: ship["pos"]["x"] + 55, y: ship["pos"]["y"] + 23 }));
    drawObjs.push(new Shot({ x: ship["pos"]["x"] + 55, y: ship["pos"]["y"] + 23 }, {x: 7, y: 0.5}));
  }

  for (let i = 0; i < drawObjs.length; i++) {
    if (drawObjs[i].update(dtf, keysPressed)) {
      drawObjs.splice(i, 1);
    }
  }

  for (let i = 0; i < drawObjs.length; i++) {
    drawObjs[i].draw(ctx);
  }

  requestAnimationFrame(gameLoop);
  newKeysPressed = {
    Left: false,
    Down: false,
    Right: false,
    Up: false,
    Space: false,
  };
};

//KeyPress handler
document.addEventListener("keydown", (evt) => {
  KeyPressHandler(evt, true);
});
document.addEventListener("keyup", (evt) => {
  KeyPressHandler(evt, false);
});

const KeyPressHandler = (evt: KeyboardEvent, down: boolean) => {
  switch (evt.code) {
    case "ArrowLeft":
      if (keysPressed["Left"] == down) return;
      keysPressed["Left"] = down;
      newKeysPressed["Left"] = down;
      break;
    case "ArrowUp":
      if (keysPressed["Up"] == down) return;
      keysPressed["Up"] = down;
      newKeysPressed["Up"] = down;
      break;
    case "ArrowRight":
      if (keysPressed["Right"] == down) return;
      keysPressed["Right"] = down;
      newKeysPressed["Right"] = down;
      break;
    case "ArrowDown":
      if (keysPressed["Down"] == down) return;
      keysPressed["Down"] = down;
      newKeysPressed["Down"] = down;
      break;
    case "Space":
      if (keysPressed["Space"] == down) return;
      keysPressed["Space"] = down;
      newKeysPressed["Space"] = down;
      break;
  }
};

const redrawCan = (): void => {
  //can.width = window.innerWidth;
  //can.height = window.innerHeight;
  document.querySelectorAll(".can").forEach((element: HTMLCanvasElement) => {
    element.width = 1280;
    element.height = 720;
  });
};

//window.addEventListener("resize", redrawCan);
window.requestAnimationFrame(gameLoop);
redrawCan();
