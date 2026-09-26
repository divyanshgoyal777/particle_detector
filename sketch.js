const r = require("raylib");
const g = require("./geometry")

const WIDTH = 800;
const HEIGHT = 500;
const FPS = 60;

// Scanner 1 (Vertical)
const S1_WIDTH = 40;
const S1_SPEED = 1;
let s1X = 0;
let s1Color = r.WHITE
let s1MovingBackward = false;

// Scanner 2 (Vertical)
const S2_WIDTH = 40;
const S2_SPEED = 2;
let s2X = WIDTH / 2;
let s2Color = r.WHITE
let s2MovingBackward = false;

// Scanner 3 (Horizontal)
const S3_WIDTH = 40;
const S3_SPEED = 2;
let s3Y = 0;
let s3Color = r.WHITE
let s3MovingUp = false;

// Particle field 1 (Vertical)
const PF1_START = 300;
const PF1_WIDTH = 100;

// Particle field 2 (Vertical)
const PF2_START = 500;
const PF2_WIDTH = 10;

// Particle field 3 (Horizontal)
const PF3_START = 200;
const PF3_WIDTH = 30;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS)
}

function changeColor(detect) {
    return detect ? r.ColorAlpha(r.RED, 0.8) : r.WHITE;
}

function update() {
    s1X = g.moveScanner(s1X, 0, WIDTH / 2, S1_SPEED, S1_WIDTH, s1MovingBackward);
    if (s1X + S1_WIDTH >= WIDTH / 2) s1MovingBackward = true;
    if (s1X <= 0) s1MovingBackward = false;

    s2X = g.moveScanner(s2X, WIDTH / 2, WIDTH, S2_SPEED, S2_WIDTH, s2MovingBackward);
    if (s2X + S2_WIDTH >= WIDTH) s2MovingBackward = true;
    if (s2X <= WIDTH / 2) s2MovingBackward = false;

    s3Y = g.moveScanner(s3Y, 0, HEIGHT, S3_SPEED, S3_WIDTH, s3MovingUp)
    if (s3Y + S3_WIDTH >= HEIGHT) s3MovingUp = true;
    if (s3Y <= 0) s3MovingUp = false;

    const s1DetectsParticle = g.checkDetectsParticle(s1X, S1_WIDTH, PF1_START, PF1_WIDTH, PF2_START, PF2_WIDTH)
    const s2DetectsParticle = g.checkDetectsParticle(s2X, S2_WIDTH, PF1_START, PF1_WIDTH, PF2_START, PF2_WIDTH)
    const s3DetectsParticle = g.detectOverlap(s3Y, S3_WIDTH, PF3_START, PF3_WIDTH);

    s1Color = changeColor(s1DetectsParticle);
    s2Color = changeColor(s2DetectsParticle);
    s3Color = changeColor(s3DetectsParticle);
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
    drawParticleField(PF1_START, 0, PF1_WIDTH, HEIGHT);
    drawParticleField(PF2_START, 0, PF2_WIDTH, HEIGHT);
    drawParticleField(0, PF3_START, WIDTH, PF3_WIDTH);
    drawScanner(s1X, 0, S1_WIDTH, HEIGHT, s1Color);
    drawScanner(s2X, 0, S2_WIDTH, HEIGHT, s2Color);
    drawScanner(0, s3Y, WIDTH, S3_WIDTH, s3Color);
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