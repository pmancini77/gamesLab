// === STUDENT ZONE: Customize your game here! ===
let birdChar = "🐤";
let gravity = 0.5;
let jumpStrength = -10;
let pipeSpeed = 2;
let pipeColor = "green"; // any CSS color
// ===============================================
































// Game setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let animationId;
let bird, pipes, frame, score;

document.addEventListener("keydown", () => {
  bird.v = jumpStrength;
});

function drawBird() {
  ctx.font = "30px Arial";
  ctx.fillText(birdChar, bird.x, bird.y);
}

function drawPipe(pipe) {
  ctx.fillStyle = pipeColor;
  ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
  ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height - pipe.bottom);
}

function resetGame() {
  cancelAnimationFrame(animationId);
  alert("Game Over! Your score: " + score);
  startGame(); // Restart everything
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird physics
  bird.v += gravity;
  bird.y += bird.v;

  // Generate pipes
  if (frame % 90 === 0) {
    let gap = 120;
    let top = Math.random() * (canvas.height - gap - 100) + 50;
    pipes.push({
      x: canvas.width,
      width: 50,
      top: top,
      bottom: top + gap
    });
  }

  // Draw and move pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    let pipe = pipes[i];
    pipe.x -= pipeSpeed;
    drawPipe(pipe);

    // Collision detection
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + 30 > pipe.x &&
      (bird.y < pipe.top || bird.y > pipe.bottom)
    ) {
      return resetGame();
    }

    if (pipe.x + pipe.width < 0) {
      pipes.splice(i, 1);
      score++;
    }
  }

  // Out of bounds
  if (bird.y > canvas.height || bird.y < 0) {
    return resetGame();
  }

  drawBird();
  frame++;
  animationId = requestAnimationFrame(updateGame);
}

function startGame() {
  // Reset all state
  bird = { x: 80, y: 200, v: 0 };
  pipes = [];
  frame = 0;
  score = 0;

  updateGame(); // Start loop
}

startGame();
