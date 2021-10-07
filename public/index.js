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
var bgCan = document.createElement("canvas");
var bgCtx = bgCan.getContext("2d");
bgCan.classList.add("can");
bgCan.id = "bgCan";
document.body.appendChild(bgCan);
var can = document.createElement("canvas");
var ctx = can.getContext("2d");
can.classList.add("can");
can.id = "can";
document.body.appendChild(can);
//init images
var bg = new Image();
bg["src"] = "./textures/bg.png";
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
var newKeysPressed = {
    Left: false,
    Down: false,
    Right: false,
    Up: false,
    Space: false,
};
//init objects
var ship = new Ship();
drawObjs.push(ship);
//game loop
var gameLoop = function (currentTime) {
    //Clearing old frame
    ctx.clearRect(0, 0, can.width, can.height);
    //Delta Time
    currentTime /= 1000;
    dt = currentTime - oldDt;
    oldDt = currentTime;
    dtf = dt * f;
    bgCtx.drawImage(bg, 0, 0);
    if (newKeysPressed["Space"]) {
        drawObjs.push(new Shot({ x: ship["pos"]["x"] + 55, y: ship["pos"]["y"] + 23 }, { x: 7, y: -0.5 }));
        drawObjs.push(new Shot({ x: ship["pos"]["x"] + 55, y: ship["pos"]["y"] + 23 }));
        drawObjs.push(new Shot({ x: ship["pos"]["x"] + 55, y: ship["pos"]["y"] + 23 }, { x: 7, y: 0.5 }));
    }
    for (var i = 0; i < drawObjs.length; i++) {
        if (drawObjs[i].update(dtf, keysPressed)) {
            drawObjs.splice(i, 1);
        }
    }
    for (var i = 0; i < drawObjs.length; i++) {
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
document.addEventListener("keydown", function (evt) {
    KeyPressHandler(evt, true);
});
document.addEventListener("keyup", function (evt) {
    KeyPressHandler(evt, false);
});
var KeyPressHandler = function (evt, down) {
    switch (evt.code) {
        case "ArrowLeft":
            if (keysPressed["Left"] == down)
                return;
            keysPressed["Left"] = down;
            newKeysPressed["Left"] = down;
            break;
        case "ArrowUp":
            if (keysPressed["Up"] == down)
                return;
            keysPressed["Up"] = down;
            newKeysPressed["Up"] = down;
            break;
        case "ArrowRight":
            if (keysPressed["Right"] == down)
                return;
            keysPressed["Right"] = down;
            newKeysPressed["Right"] = down;
            break;
        case "ArrowDown":
            if (keysPressed["Down"] == down)
                return;
            keysPressed["Down"] = down;
            newKeysPressed["Down"] = down;
            break;
        case "Space":
            if (keysPressed["Space"] == down)
                return;
            keysPressed["Space"] = down;
            newKeysPressed["Space"] = down;
            break;
    }
};
var redrawCan = function () {
    //can.width = window.innerWidth;
    //can.height = window.innerHeight;
    document.querySelectorAll(".can").forEach(function (element) {
        element.width = 1280;
        element.height = 720;
    });
};
//window.addEventListener("resize", redrawCan);
window.requestAnimationFrame(gameLoop);
redrawCan();
