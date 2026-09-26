function moveScanner(sX, minX, maxX, sSpeed, sWidth, movingReverse) {
    if (!movingReverse) {
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

function checkDetectsParticle(sStart, sWidth, pf1Start, pf1Width, pf2Start, pf2Width) {
    const sOverlapsPf1 = detectOverlap(sStart, sWidth, pf1Start, pf1Width);
    const sOverlapsPf2 = detectOverlap(sStart, sWidth, pf2Start, pf2Width);
    return sOverlapsPf1 || sOverlapsPf2;
}

module.exports = {
    moveScanner,
    detectOverlap,
    checkDetectsParticle,
};