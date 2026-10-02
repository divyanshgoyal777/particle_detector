const r = require("raylib");
const g = require("./geometry");

function createHorizontalScanner(width, velocity, x, start, end, hasDetected, height) {
    return {
        width,
        velocity,
        x,
        start,
        end,
        hasDetected,
        height,
    }
}

function createVerticalScanner(width, velocity, y, start, end, hasDetected, height) {
    return {
        width,
        velocity,
        y,
        start,
        end,
        hasDetected,
        height,
    }
}

function drawVerticalScanner(s) {
    const color = s.hasDetected ? r.ColorAlpha(r.RED, 0.8) : r.WHITE;
    r.DrawRectangle(0, s.y, s.width, s.height, color);
}

function drawHorizontalScanner(s) {
    const color = s.hasDetected ? r.ColorAlpha(r.RED, 0.8) : r.WHITE;
    r.DrawRectangle(s.x, 0, s.width, s.height, color);
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

module.exports = {
    createHorizontalScanner,
    createVerticalScanner,
    drawVerticalScanner,
    drawHorizontalScanner,
    updateHorizontalScanner,
    updateVerticalScanner,
}