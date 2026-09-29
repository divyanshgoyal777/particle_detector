const w = require("./screen")

const width = 40;
let velocity = 2;
let start = 0;
let hasDetected;
const height = w.HEIGHT;
const end = w.WIDTH / 2

module.exports = {
    width, velocity, start, hasDetected, height, end
}