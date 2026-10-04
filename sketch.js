const r = require("raylib");
const d = require("./detector_behaviour");
const windowWidth = 800;
const windowHeight = 800;

//Creating widths
const start2 = windowWidth / 2;
const d1width = 20;
const d2width = 30;
const d3height = 25;

//for upperBounds and lowerBounds
const uB1 = windowWidth / 2 - d1width;
const uB2 = windowWidth - d2width;
const uB3 = windowHeight - d3height;
const lB2 = windowWidth / 2;

const d1 = d.createDetector(0, 0, d1width, windowHeight, uB1, 0, 5, r.WHITE);
const d2 = d.createDetector(start2, 0, 30, windowHeight, uB2, lB2, 4, r.WHITE);
const d3 = d.createDetector(0, 0, windowWidth, d3height, uB3, 0, 5, r.WHITE);

const p1 = d.createParticle(300, 0, 30, windowHeight, r.BLUE);
const p2 = d.createParticle(600, 0, 30, windowHeight, r.BLUE);
const p3 = d.createParticle(0, 250, windowWidth, 40, r.BLUE);

function running() {
  return !r.WindowShouldClose();
}

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(windowWidth, windowHeight, "particle_detector");
  r.SetTargetFPS(60);
}

function update() {
  d1.start = d.traverseDetectorV(d1);
  d2.start = d.traverseDetectorV(d2);
  d3.y = d.traverseDetectorH(d3);
}

function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);
  d2.color = d.changeColorV(d2, p1, p2);
  d1.color = d.changeColorV(d1, p1, p2);
  d3.color = d.changeColorH(d3, p3, p3);

  d.drawParticles(p1);
  d.drawParticles(p2);
  d.drawParticles(p3);

  d.drawDetectors(d1);
  d.drawDetectors(d2);
  d.drawDetectors(d3);

  r.EndDrawing();
}

function teardown() {
  r.CloseWindow();
}

module.exports = {
  running,
  setup,
  update,
  draw,
  teardown,
};
