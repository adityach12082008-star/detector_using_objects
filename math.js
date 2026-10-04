function calcOffset(outer, inner) {
    return (outer - inner) / 2;
}
function distanceBetweenTwoPoints(sX, sY, targetX, targetY) {
    return (
        (targetX - sX) ** 2 +
        (targetY - sY) ** 2
    ) ** 0.5;
}

module.exports = {
    calcOffset,
    distanceBetweenTwoPoints,
}