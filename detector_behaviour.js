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
function createParticle(start, y, width, height, color) {
  return {
    start,
    y,
    width,
    height,
    color,
  };
}

//for moving vertical detector

function detectorVelocityV(d) {
  return hasReachedBoundsV(d) ? -d.velocity : d.velocity;
}

function hasReachedBoundsV(d) {
  return d.start < d.lowerBound || d.start > d.upperBound;
}

function moveDetectorV(d) {
  return d.start + d.velocity;
}

function traverseDetectorV(d) {
  d.velocity = detectorVelocityV(d);
  return moveDetectorV(d);
}

//for moving horizontal detector
function detectorVelocityH(d) {
  return hasReachedBoundsH(d) ? -d.velocity : d.velocity;
}

function hasReachedBoundsH(d) {
  return d.y < d.lowerBound || d.y > d.upperBound;
}

function moveDetectorH(d) {
  return d.y + d.velocity;
}

function traverseDetectorH(d) {
  d.velocity = detectorVelocityH(d);
  return moveDetectorH(d);
}

//Vertical detector detecting particle
function detectorDetectsParticleV(d, p) {
  return d.start + d.width >= p.start && d.start <= p.start + p.width;
}

function changeColorV(d, pOne, pTwo) {
  return detectorDetectsParticleV(d, pOne) || detectorDetectsParticleV(d, pTwo)
    ? r.RED
    : r.WHITE;
}

//Horizontal detector detecting particle
function detectorDetectsParticleH(d, p) {
  return d.y + d.height >= p.y && d.y <= p.y + p.height;
}

function changeColorH(d, pOne, pTwo) {
  return detectorDetectsParticleH(d, pOne) || detectorDetectsParticleH(d, pTwo)
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
  detectorVelocityH,
  hasReachedBoundsH,
  moveDetectorH,
  createParticle: createParticle,
  detectorDetectsParticleV,
  traverseDetectorH,
  changeColorV,
  drawParticles,
  drawDetectors,
  detectorVelocityV,
  hasReachedBoundsV,
  moveDetectorV,
  traverseDetectorV,
  detectorDetectsParticleH,
  changeColorH,
};
