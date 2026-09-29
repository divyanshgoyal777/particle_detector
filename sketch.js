const r = require("raylib");
const g = require("./geometry");
const screen = require("./screen");

const s1 = require("./s1");
const s2 = require("./s2");
const s3 = require("./s3");

const p1 = require("./p1");
const p2 = require("./p2");
const p3 = require("./p3");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE)
    r.InitWindow(screen.WIDTH, screen.HEIGHT, screen.TITLE);
    r.SetTargetFPS(screen.FPS)
}

function drawScanner(x, y, width, height, hasDetected) {
    hasDetected
        ? r.DrawRectangle(x, y, width, height, r.ColorAlpha(r.RED, 0.8))
        : r.DrawRectangle(x, y, width, height, r.WHITE)
}

function drawParticle(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function update() {
    s1.start += s1.velocity;
    s2.start += s2.velocity;
    s3.start += s3.velocity;

    s1.velocity = g.changeDirection(s1.start, s1.width, 0, s1.end, s1.velocity);
    s2.velocity = g.changeDirection(s2.start, s2.width, screen.WIDTH / 2, s2.end, s2.velocity);
    s3.velocity = g.changeDirection(s3.start, s3.height, 0, s3.end, s3.velocity);

    s1.hasDetected = g.isOverlapingParticles(s1.start, s1.width, p1.start, p1.width, p2.start, p2.width)
    s2.hasDetected = g.isOverlapingParticles(s2.start, s2.width, p1.start, p1.width, p2.start, p2.width)
    s3.hasDetected = g.detectOverlap(s3.start, s3.height, p3.start, p3.height);
}

function draw() {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK);

    drawParticle(p1.start, 0, p1.width, p1.height, r.SKYBLUE);
    drawParticle(p2.start, 0, p2.width, p2.height, r.SKYBLUE);
    drawParticle(0, p3.start, p3.width, p3.height, r.SKYBLUE);

    drawScanner(s1.start, 0, s1.width, s1.height, s1.hasDetected);
    drawScanner(s2.start, 0, s2.width, s2.height, s2.hasDetected);
    drawScanner(0, s3.start, s3.width, s3.height, s3.hasDetected);

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