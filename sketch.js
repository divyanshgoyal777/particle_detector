const r = require("raylib");
const g = require("./geometry");

const screen = {
    WIDTH: 800,
    HEIGHT: 500,
    TITLE: "Particle Detector",
    FPS: 60,
}

const scanners = {
    s1: {
        width: 40,
        velocity: 2,
        x: 0,
        start: 0,
        end: screen.WIDTH / 2,
        hasDetected: false,
        height: screen.HEIGHT,
    },
    s2: {
        width: 40,
        velocity: 4,
        x: screen.WIDTH / 2,
        start: screen.WIDTH / 2,
        end: screen.WIDTH,
        hasDetected: false,
        height: screen.HEIGHT,
    },
    s3: {
        height: 40,
        velocity: 3,
        y: 0,
        start: 0,
        end: screen.HEIGHT,
        hasDetected: false,
        width: screen.WIDTH,
    }
}

const particles = {
    p1: {
        start: 300,
        width: 100,
        height: screen.HEIGHT,
    },
    p2: {
        start: 500,
        width: 10,
        height: screen.HEIGHT,
    },
    p3: {
        start: 200,
        width: screen.WIDTH,
        height: 30,
    }
}

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE)
    r.InitWindow(screen.WIDTH, screen.HEIGHT, screen.TITLE);
    r.SetTargetFPS(screen.FPS)
}

function updateHorizontalScanner(s, p1, p2) {
    s.x += s.velocity;
    s.velocity = g.changeDirection(s.x, s.width, s.start, s.end, s.velocity);
    s.hasDetected = g.isOverlapingParticles(s.x, s.width, p1.start, p1.width, p2.start, p2.width);
}

function updateVerticalScanner(s, p3) {
    s.y += s.velocity;
    s.velocity = g.changeDirection(s.y, s.height, s.start, s.end, s.velocity);
    s.hasDetected = g.detectOverlap(s.y, s.height, p3.start, p3.height);
}

function update() {
    updateHorizontalScanner(scanners.s1, particles.p1, particles.p2);
    updateHorizontalScanner(scanners.s2, particles.p1, particles.p2);
    updateVerticalScanner(scanners.s3, particles.p3);
}

function drawVerticalParticle(p) {
    r.DrawRectangle(p.start, 0, p.width, p.height, r.SKYBLUE);
}

function drawHorizontalParticle(p) {
    r.DrawRectangle(0, p.start, p.width, p.height, r.SKYBLUE);
}

function drawVerticalScanner(s) {
    const color = s.hasDetected ? r.ColorAlpha(r.RED, 0.8) : r.WHITE;
    r.DrawRectangle(0, s.y, s.width, s.height, color);
}

function drawHorizontalScanner(s) {
    const color = s.hasDetected ? r.ColorAlpha(r.RED, 0.8) : r.WHITE;
    r.DrawRectangle(s.x, 0, s.width, s.height, color);
}

function draw() {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK);

    drawVerticalParticle(particles.p1);
    drawVerticalParticle(particles.p2);
    drawHorizontalParticle(particles.p3);

    drawHorizontalScanner(scanners.s1);
    drawHorizontalScanner(scanners.s2);
    drawVerticalScanner(scanners.s3);

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