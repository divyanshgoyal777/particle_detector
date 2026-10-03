const r = require("raylib");
const g = require("./geometry");

function createScanner(x, y, width, velocity, start, end, hasDetected, height) {
    return {
        x, y, width, velocity, start, end, hasDetected, height,
    }
}

function drawScanner(s) {
    const color = s.hasDetected ? r.ColorAlpha(r.RED, 0.8) : r.WHITE;
    r.DrawRectangle(s.x, s.y, s.width, s.height, color);
}

function updateHorizontalScanner(s, p1, p2) {
    s.x += s.velocity;
    s.velocity = g.changeDirection(s.x, s.width, s.start, s.end, s.velocity);
    s.hasDetected = g.isOverlapingParticles(s.x, s.width, p1.x, p1.width, p2.x, p2.width);
}

function updateVerticalScanner(s, p3) {
    s.y += s.velocity;
    s.velocity = g.changeDirection(s.y, s.height, s.start, s.end, s.velocity);
    s.hasDetected = g.detectOverlap(s.y, s.height, p3.y, p3.height);
}

module.exports = {
    createScanner,
    drawScanner,
    updateHorizontalScanner,
    updateVerticalScanner,
}