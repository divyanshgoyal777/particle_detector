const r = require("raylib");

function createParticle(x, y, width, height) {
    return {
        x, y, width, height,
    }
}

function drawParticle(p) {
    r.DrawRectangle(p.x, p.y, p.width, p.height, r.SKYBLUE);
}

module.exports = {
    createParticle,
    drawParticle,
}