const r = require("raylib");
const g = require("./geometry")

const WIDTH = 800;
const HEIGHT = 500;
const FPS = 60;

// Scanner 1
const S1_WIDTH = 40;
const S1_SPEED = 1;
let s1X = 0;
let s1Color = r.WHITE
let s1MovingBackward = false;

// Scanner 2
const S2_WIDTH = 40;
const S2_SPEED = 2;
let s2X = WIDTH / 2;
let s2Color = r.WHITE
let s2MovingBackward = false;

// Particle field 1
const PF1_START = 300;
const PF1_WIDTH = 100;

// Particle field 2
const PF2_START = 500;
const PF2_WIDTH = 10;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(WIDTH, HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS)
}

function update() {
    s1X = g.moveScanner(s1X, 0, WIDTH / 2, S1_SPEED, S1_WIDTH, s1MovingBackward);
    if (s1X + S1_WIDTH >= WIDTH / 2) s1MovingBackward = true;
    if (s1X <= 0) s1MovingBackward = false;

    s2X = g.moveScanner(s2X, WIDTH / 2, WIDTH, S2_SPEED, S2_WIDTH, s2MovingBackward);
    if (s2X + S2_WIDTH >= WIDTH) s2MovingBackward = true;
    if (s2X <= WIDTH / 2) s2MovingBackward = false;

    const s1OverlapsPf1 = g.detectOverlap(s1X, S1_WIDTH, PF1_START, PF1_WIDTH);
    const s1OverlapsPf2 = g.detectOverlap(s1X, S1_WIDTH, PF2_START, PF2_WIDTH);
    const s1DetectsParticle = s1OverlapsPf1 || s1OverlapsPf2

    const s2OverlapsPf1 = g.detectOverlap(s2X, S2_WIDTH, PF1_START, PF1_WIDTH);
    const s2OverlapsPf2 = g.detectOverlap(s2X, S2_WIDTH, PF2_START, PF2_WIDTH);
    const s2DetectsParticle = s2OverlapsPf1 || s2OverlapsPf2

    s1Color = s1DetectsParticle ? r.ColorAlpha(r.RED, 0.8) : r.WHITE;
    s2Color = s2DetectsParticle ? r.ColorAlpha(r.RED, 0.8) : r.WHITE;
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
    drawParticleField(PF1_START, 0, PF1_WIDTH, HEIGHT)
    drawParticleField(PF2_START, 0, PF2_WIDTH, HEIGHT)
    drawScanner(s1X, 0, S1_WIDTH, HEIGHT, s1Color);
    drawScanner(s2X, 0, S2_WIDTH, HEIGHT, s2Color);
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