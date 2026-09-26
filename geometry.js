function moveScanner(sX, minX, maxX, sSpeed, sWidth, movingBackward) {
    if (!movingBackward) {
        sX = sX + sSpeed;
        if (sX + sWidth >= maxX) {
            sX = maxX - sWidth;
        }
    } else {
        sX = sX - sSpeed;
        if (sX <= minX) {
            sX = minX
        }
    }
    return sX;
}

function detectOverlap(sX, sWidth, pfStart, pfWidth) {
    const overlapStart = sX >= pfStart - sWidth
    const overlapEnd = sX <= pfStart + pfWidth
    return overlapStart && overlapEnd ? true : false;
}

module.exports = {
    moveScanner,
    detectOverlap,
};