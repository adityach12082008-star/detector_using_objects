const r = require("raylib");
// creating detector
function createDetector(
  start,
  y,
  width,
  height,
  upperBound,
  lowerBound,
  velocity,
  color,
) {
  return {
    start,
    y,
    width,
    height,
    upperBound,
    lowerBound,
    velocity,
    color,
  };
}

// creating particle
function createParticle(start, y, width, height) {
  return {
    start,
    y,
    width,
    height,
  };
}

//These functions moves vertical detector in between bounds
function updateDetectorV(d, pOne, pTwo) {
  d.start = moveDetectorV(d);
  d.color = getUpdatedColorV(d, pOne, pTwo);
  return d;
}

function getUpdatedVelocityV(d) {
  return hasReachedBoundsV(d) ? -d.velocity : d.velocity;
}

function hasReachedBoundsV(d) {
  return d.start < d.lowerBound || d.start > d.upperBound;
}

function moveDetectorV(d) {
  d.velocity = getUpdatedVelocityV(d);
  return d.start + d.velocity;
}

function isParticleDetectedV(d, p) {
  return d.start + d.width >= p.start && d.start <= p.start + p.width;
}

function getUpdatedColorV(d, pOne, pTwo) {
  return isParticleDetectedV(d, pOne) || isParticleDetectedV(d, pTwo)
    ? r.RED
    : r.WHITE;
}

//these function moves horizontal detector in between bounds
function updateDetectorH(d, pOne, pTwo) {
  d.y = moveDetectorH(d);
  d.color = getUpdatedColorH(d, pOne, pTwo);
  return d;
}
function getUpdatedVelocityH(d) {
  return hasReachedBoundsH(d) ? -d.velocity : d.velocity;
}

function hasReachedBoundsH(d) {
  return d.y < d.lowerBound || d.y > d.upperBound;
}

function moveDetectorH(d) {
  d.velocity = getUpdatedVelocityH(d);
  return d.y + d.velocity;
}

//Horizontal detector detecting particle

function isParticleDetectedH(d, p) {
  return d.y + d.height >= p.y && d.y <= p.y + p.height;
}

function getUpdatedColorH(d, pOne, pTwo) {
  return isParticleDetectedH(d, pOne) || isParticleDetectedH(d, pTwo)
    ? r.RED
    : r.WHITE;
}

// drawing Particles
function drawParticles(p) {
  r.DrawRectangle(p.start, p.y, p.width, p.height, r.BLUE);
}

//drawing detectors
function drawDetectors(d) {
  r.DrawRectangle(d.start, d.y, d.width, d.height, d.color);
}

module.exports = {
  createDetector,
  createParticle,

  getUpdatedColorV,
  drawDetectors,
  moveDetectorV,
  drawParticles,
  updateDetectorV,
  updateDetectorH,
};
