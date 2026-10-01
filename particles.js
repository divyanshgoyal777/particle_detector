const screen = require("./screen")

const particles = {
    p1: {
        start: 300,
        width: 100,
        height: screen.screen.HEIGHT,
    },
    p2: {
        start: 500,
        width: 10,
        height: screen.screen.HEIGHT,
    },
    p3: {
        start: 200,
        width: screen.screen.WIDTH,
        height: 30,
    }
}

module.exports = {
    particles,
}