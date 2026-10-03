const r = require("raylib");
const s = require("./scanner");
const p = require("./particle");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE)

    const world = {};
    world.WIDTH = 800;
    world.HEIGHT = 500;
    world.TITLE = "Particle Detector"
    world.FPS = 60;

    r.InitWindow(world.WIDTH, world.HEIGHT, world.TITLE);
    r.SetTargetFPS(world.FPS)

    world.s1 = s.createScanner(0, 0, 40, 2, 0, world.WIDTH / 2, false, world.HEIGHT);
    world.s2 = s.createScanner(world.WIDTH / 2, 0, 40, 4, world.WIDTH / 2, world.WIDTH, false, world.HEIGHT);
    world.s3 = s.createScanner(0, 0, world.WIDTH, 3, 0, world.HEIGHT, false, 40);

    world.p1 = p.createParticle(300, 0, 100, world.HEIGHT);
    world.p2 = p.createParticle(500, 0, 10, world.HEIGHT);
    world.p3 = p.createParticle(0, 200, world.WIDTH, 30);

    return world;
}

function update(world) {
    s.updateHorizontalScanner(world.s1, world.p1, world.p2);
    s.updateHorizontalScanner(world.s2, world.p1, world.p2);
    s.updateVerticalScanner(world.s3, world.p3);
}

function draw(world) {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK);

    p.drawParticle(world.p1);
    p.drawParticle(world.p2);
    p.drawParticle(world.p3);

    s.drawScanner(world.s1);
    s.drawScanner(world.s2);
    s.drawScanner(world.s3);

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