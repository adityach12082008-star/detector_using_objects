const r = require("raylib");
const d = require("./detector_behaviour");

function running() {
  return !r.WindowShouldClose();
}

function setup() {
  const windowWidth = 800;
  const windowHeight = 800;
  const d1width = 20;
  const d2width = 30;
  const d3height = 25;

  const d1 = d.createDetector(
    0,
    0,
    d1width,
    windowHeight,
    windowWidth / 2 - d1width,
    0,
    5,
    r.WHITE,
  );
  const d2 = d.createDetector(
    windowWidth / 2,
    0,
    d2width,
    windowHeight,
    windowWidth - d2width,
    windowWidth / 2,
    4,
    r.WHITE,
  );
  const d3 = d.createDetector(
    0,
    0,
    windowWidth,
    d3height,
    windowHeight - d3height,
    0,
    5,
    r.WHITE,
  );

  const p1 = d.createParticle(300, 0, 30, windowHeight);
  const p2 = d.createParticle(600, 0, 30, windowHeight);
  const p3 = d.createParticle(0, 250, windowWidth, 40);

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

  d2.color = d.chooseColorV(d2, p1, p2);
  d1.color = d.chooseColorV(d1, p1, p2);
  d3.color = d.chooseColorH(d3, p3, p3);

  d1.start = d.moveDetectorV(d1);
  d2.start = d.moveDetectorV(d2);
  d3.y = d.moveDetectorH(d3);
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
