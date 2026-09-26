const r = require("raylib");
const g = require("./geometry")

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 500;

const scanner1Width = 40;
let scanner1Speed = 1;
let scanner1X = 0;

const scanner2Width = 40;
let scanner2Speed = 2;
let scanner2X = SCREEN_WIDTH / 2;

const scanner3Height = 40;
let scanner3Speed = 3;
let scanner3Y = 0;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const FPS = 60;
    r.InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Particle Detector");
    r.SetTargetFPS(FPS)
}

function selectColor(detect) {
    return detect ? r.ColorAlpha(r.RED, 0.8) : r.WHITE;
}

function update() {
    const scanner1End = SCREEN_WIDTH / 2
    const scanner2End = SCREEN_WIDTH;
    const scanner3End = SCREEN_HEIGHT;

    scanner1X = scanner1X + scanner1Speed;
    scanner2X = scanner2X + scanner2Speed;
    scanner3Y = scanner3Y + scanner3Speed;

    if (g.isBoundaryTouch(scanner1X, scanner1Width, 0, scanner1End))
        scanner1Speed = -scanner1Speed;
    if (g.isBoundaryTouch(scanner2X, scanner2Width, SCREEN_WIDTH / 2, scanner2End))
        scanner2Speed = -scanner2Speed;
    if (g.isBoundaryTouch(scanner3Y, scanner3Height, 0, scanner3End))
        scanner3Speed = -scanner3Speed;
}

function draw() {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK);

    const particle1Start = 300;
    const particle1Width = 100;
    const particle1Height = SCREEN_HEIGHT

    const particle2Start = 500;
    const particle2Width = 10;
    const particle2Height = SCREEN_HEIGHT

    const particle3Start = 200;
    const particle3Width = SCREEN_WIDTH
    const particle3Height = 30;

    const scanner1Height = SCREEN_HEIGHT;
    const scanner2Height = SCREEN_HEIGHT;
    const scanner3Width = SCREEN_WIDTH

    const scanner1Overlap = g.detectParticle(scanner1X, scanner1Width, particle1Start, particle1Width, particle2Start, particle2Width)
    const scanner2Overlap = g.detectParticle(scanner2X, scanner2Width, particle1Start, particle1Width, particle2Start, particle2Width)
    const scanner3Overlap = g.detectOverlap(scanner3Y, scanner3Height, particle3Start, particle3Height);

    const scanner1Color = selectColor(scanner1Overlap);
    const scanner2Color = selectColor(scanner2Overlap);
    const scanner3Color = selectColor(scanner3Overlap);

    r.DrawRectangle(particle1Start, 0, particle1Width, particle1Height, r.SKYBLUE);
    r.DrawRectangle(particle2Start, 0, particle2Width, particle2Height, r.SKYBLUE);
    r.DrawRectangle(0, particle3Start, particle3Width, particle3Height, r.SKYBLUE);

    r.DrawRectangle(scanner1X, 0, scanner1Width, scanner1Height, scanner1Color);
    r.DrawRectangle(scanner2X, 0, scanner2Width, scanner2Height, scanner2Color);
    r.DrawRectangle(0, scanner3Y, scanner3Width, scanner3Height, scanner3Color);

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