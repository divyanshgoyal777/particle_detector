const r = require("raylib");
const s = require("./scanner");
const p = require("./particle");

const screen = {
    WIDTH: 800,
    HEIGHT: 500,
    TITLE: "Particle Detector",
    FPS: 60,
}

const s1 = s.createHorizontalScanner(40, 2, 0, 0, screen.WIDTH / 2, false, screen.HEIGHT);
const s2 = s.createHorizontalScanner(40, 4, screen.WIDTH / 2, screen.WIDTH / 2, screen.WIDTH, false, screen.HEIGHT);
const s3 = s.createVerticalScanner(screen.WIDTH, 3, 0, 0, screen.HEIGHT, false, 40);

const p1 = p.createHorizontalParticle(300, 100, screen.HEIGHT);
const p2 = p.createHorizontalParticle(500, 10, screen.HEIGHT);
const p3 = p.createVerticalParticle(200, screen.WIDTH, 30);

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE)
    r.InitWindow(screen.WIDTH, screen.HEIGHT, screen.TITLE);
    r.SetTargetFPS(screen.FPS)
}

function update() {
    s.updateHorizontalScanner(s1, p1, p2);
    s.updateHorizontalScanner(s2, p1, p2);
    s.updateVerticalScanner(s3, p3);
}

function draw() {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK);

    p.drawVerticalParticle(p1);
    p.drawVerticalParticle(p2);
    p.drawHorizontalParticle(p3);

    s.drawHorizontalScanner(s1);
    s.drawHorizontalScanner(s2);
    s.drawVerticalScanner(s3);

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