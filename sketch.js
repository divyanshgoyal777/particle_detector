const r = require("raylib");

const WIDTH = 800;
const HEIGHT = 400;
const FPS = 60;

const sWidth = 50;
const sSpeed = 2;
let color = r.WHITE;
let sX = 0;
let movingBackward = false;

const pfStart = 300;
const pfWidth = 150;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS)
}

function moveScanner(sX, WIDTH, sSpeed, sWidth) {
    if (sX <= WIDTH - sWidth && !movingBackward) {
        sX = sX + sSpeed;
    } else {
        movingBackward = true;
        sX = sX - sSpeed;
    }
    if (sX === 0) movingBackward = false;
    return sX;
}

function detectOverlap(sX, sWidth, pfStart, pfWidth) {
    const overlapStart = sX >= pfStart - sWidth
    const overlapEnd = sX <= pfStart + pfWidth
    return overlapStart && overlapEnd ? r.RED : r.WHITE;
}

function update() {
    sX = moveScanner(sX, WIDTH, sSpeed, sWidth)
    color = detectOverlap(sX, sWidth, pfStart, pfWidth);
    drawScanner(sX, 0, sWidth, HEIGHT, color)
}

function drawScanner(sX, sY, sWidth, sHeight, color) {
    r.DrawRectangle(sX, sY, sWidth, sHeight, color);
}

function drawParticleField(pfX, pfY, pfWidth, pfHeight) {
    r.DrawRectangle(pfX, pfY, pfWidth, pfHeight, r.SKYBLUE);
}

function draw() {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK);
    drawParticleField(pfStart, 0, pfWidth, HEIGHT)
    drawScanner(sX, 0, sWidth, HEIGHT, color);
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