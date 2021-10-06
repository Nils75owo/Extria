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


//init game canvas
const can: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D | null = can.getContext("2d");
can.id = "can";
document.body.appendChild(can);


//init variables
let drawObjs = new Array();
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

//init objects
drawObjs.push(new Ship());

//game loop
const gameLoop = (currentTime: number): void => {
  ctx.fillStyle = "#000"
  ctx.fillRect(0, 0, can.width, can.height);
  currentTime /= 1000;
  dt = currentTime - oldDt;
  oldDt = currentTime;
  dtf = dt * f;

  for (let i = 0; i < drawObjs.length; i++) {
    drawObjs[i].update(dtf, keysPressed);
  }

  for (let i = 0; i < drawObjs.length; i++) {
    drawObjs[i].draw(ctx);
  }

  requestAnimationFrame(gameLoop);
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
      keysPressed["Left"] = down;
      break;
    case "ArrowUp":
      keysPressed["Up"] = down;
      break;
    case "ArrowRight":
      keysPressed["Right"] = down;
      break;
    case "ArrowDown":
      keysPressed["Down"] = down;
      break;
  }
}


const redrawCan = (): void => {
  //can.width = window.innerWidth;
  //can.height = window.innerHeight;
  can.width = 1280;
  can.height = 720;
  //can.width = 800;
  //can.height = 600;
};

//window.addEventListener("resize", redrawCan);
window.requestAnimationFrame(gameLoop);
redrawCan();
