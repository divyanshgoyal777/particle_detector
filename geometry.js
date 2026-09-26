function isBoundaryTouch(scannerX, scannerWidth, startPos, endPos) {
    return (scannerX + scannerWidth >= endPos) || (scannerX === startPos);
}

function detectOverlap(scannerX, scannerWidth, particleStart, particleWidth) {
    return (scannerX >= particleStart - scannerWidth) && (scannerX <= particleStart + particleWidth) ? true : false;
}

function detectParticle(scannerX, scannerWidth, particle1Start, particle1Width, particle2Start, particle2Width) {
    const overlap1 = detectOverlap(scannerX, scannerWidth, particle1Start, particle1Width);
    const overlap2 = detectOverlap(scannerX, scannerWidth, particle2Start, particle2Width);
    return overlap1 || overlap2;
}

module.exports = {
    isBoundaryTouch,
    detectOverlap,
    detectParticle,
};