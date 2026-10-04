const r = require("raylib");
const d = require("./detector_behaviour");

function running() {
  return !r.WindowShouldClose();
}

function setup() {
  //Creating widths
  const windowWidth = 800;
  const windowHeight = 800;
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
  const d2 = d.createDetector(
    start2,
    0,
    d2width,
    windowHeight,
    uB2,
    lB2,
    4,
    r.WHITE,
  );
  const d3 = d.createDetector(0, 0, windowWidth, d3height, uB3, 0, 5, r.WHITE);

  const p1 = d.createParticle(300, 0, 30, windowHeight, r.BLUE);
  const p2 = d.createParticle(600, 0, 30, windowHeight, r.BLUE);
  const p3 = d.createParticle(0, 250, windowWidth, 40, r.BLUE);

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(windowWidth, windowHeight, "particle_detector");
  r.SetTargetFPS(60);
  return { d1, d2, d3, p1, p2, p3 };
}

function update(world) {
  const d1 = world.d1;
  const d2 = world.d2;
  const d3 = world.d3;

  const p1 = world.p1;
  const p2 = world.p2;
  const p3 = world.p3;

  d2.color = d.changeColorV(d2, p1, p2);
  d1.color = d.changeColorV(d1, p1, p2);
  d3.color = d.changeColorH(d3, p3, p3);

  d1.start = d.traverseDetectorV(d1);
  d2.start = d.traverseDetectorV(d2);
  d3.y = d.traverseDetectorH(d3);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  d.drawParticles(world.p1);
  d.drawParticles(world.p2);
  d.drawParticles(world.p3);

  d.drawDetectors(world.d1);
  d.drawDetectors(world.d2);
  d.drawDetectors(world.d3);

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
