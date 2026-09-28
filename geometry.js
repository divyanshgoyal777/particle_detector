function isBoundaryTouch(scannerStart, scannerWidth, rangeStart, rangeEnd) {
    return (scannerStart + scannerWidth >= rangeEnd) || (scannerStart === rangeStart);
}

function changeDirection(scannerStart, scannerWidth, rangeStart, rangeEnd, velocity) {
    return isBoundaryTouch(scannerStart, scannerWidth, rangeStart, rangeEnd) ? -velocity : velocity;
}

function scannerOverlapStartDetection(scannerStart, particleStart, scannerWidth) {
    return scannerStart >= particleStart - scannerWidth
}

function isStillOverlaping(scannerStart, particleStart, particleWidth) {
    return scannerStart <= particleStart + particleWidth;
}

function detectOverlap(scannerStart, scannerWidth, particleStart, particleWidth) {
    return scannerOverlapStartDetection(scannerStart, particleStart, scannerWidth) && isStillOverlaping(scannerStart, particleStart, particleWidth);
}

function isOverlapingParticles(scannerStart, scannerWidth, particle1Start, particle1Width, particle2Start, particle2Width) {
    const overlap1 = detectOverlap(scannerStart, scannerWidth, particle1Start, particle1Width);
    const overlap2 = detectOverlap(scannerStart, scannerWidth, particle2Start, particle2Width);
    return overlap1 || overlap2;
}

module.exports = {
    isBoundaryTouch,
    changeDirection,
    detectOverlap,
    isOverlapingParticles,
};