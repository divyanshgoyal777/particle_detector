const r = require("raylib");

const WIDTH = 1000;
const HEIGHT = 600;
const FPS = 60;
const sWidth = 50;
const sSpeed = 1.5;
let sX = 0;
let isEnd = false;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS)
}

function moveScanner(sX, WIDTH, sSpeed, sWidth) {
    if (sX <= WIDTH - sWidth && !isEnd) {
        sX = sX + sSpeed;
    } else {
        isEnd = true;
        sX = sX - sSpeed;
    }
    if (sX === 0) isEnd = false;
    return sX;
}

function update() {
    sX = moveScanner(sX, WIDTH, sSpeed, sWidth)
    drawScanner(sX, 0, sWidth, HEIGHT)
}

function drawScanner(sX, sY, sWidth, sHeight) {
    r.DrawRectangle(sX, sY, sWidth, sHeight, r.WHITE);
}

function draw() {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK);
    drawScanner(sX, 0, sWidth, HEIGHT);
    r.EndDrawing()
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};