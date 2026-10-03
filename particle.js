const r = require("raylib");

function createParticle(start, width, height) {
    return {
        start,
        width,
        height,
    }
}

function drawVerticalParticle(p) {
    r.DrawRectangle(p.start, 0, p.width, p.height, r.SKYBLUE);
}

function drawHorizontalParticle(p) {
    r.DrawRectangle(0, p.start, p.width, p.height, r.SKYBLUE);
}

module.exports = {
    createParticle,
    drawVerticalParticle,
    drawHorizontalParticle,
}