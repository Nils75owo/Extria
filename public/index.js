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
var can = document.createElement("canvas");
var ctx = can.getContext("2d");
can.id = "can";
document.body.appendChild(can);
//init variables
var drawObjs = new Array();
var oldDt = 0;
var dt = 0;
var f = 60;
var dtf = 0;
var keysPressed = {
    Left: false,
    Down: false,
    Right: false,
    Up: false,
    Space: false,
};
//init objects
drawObjs.push(new Ship());
//game loop
var gameLoop = function (currentTime) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, can.width, can.height);
    currentTime /= 1000;
    dt = currentTime - oldDt;
    oldDt = currentTime;
    dtf = dt * f;
    for (var i = 0; i < drawObjs.length; i++) {
        drawObjs[i].update(dtf, keysPressed);
    }
    for (var i = 0; i < drawObjs.length; i++) {
        drawObjs[i].draw(ctx);
    }
    requestAnimationFrame(gameLoop);
};
//KeyPress handler
document.addEventListener("keydown", function (evt) {
    KeyPressHandler(evt, true);
});
document.addEventListener("keyup", function (evt) {
    KeyPressHandler(evt, false);
});
var KeyPressHandler = function (evt, down) {
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
};
var redrawCan = function () {
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
