// === STUDENT ZONE: Customize your game here! ===
let snakeColor = "yellow";
let foodColor = "blue";
let gridSize = 20;      // Size of each square
let moveSpeed = 100;    // Milliseconds between moves (lower = faster)
// ===============================================


































const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const rows = canvas.width / gridSize;

let snake, food, dx, dy, score, gameInterval;

function startGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 1; dy = 0;
  placeFood();
  score = 0;

  clearInterval(gameInterval);
  gameInterval = setInterval(updateGame, moveSpeed);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * rows)
  };
}

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
}

function updateGame() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Check wall collision
  if (head.x < 0 || head.y < 0 || head.x >= rows || head.y >= rows) {
    return gameOver();
  }

  // Check self collision
  for (let part of snake) {
    if (part.x === head.x && part.y === head.y) {
      return gameOver();
    }
  }

  snake.unshift(head); // move snake

  // Check food collision
  if (head.x === food.x && head.y === food.y) {
    placeFood();
    score++;
  } else {
    snake.pop(); // remove tail
  }

  drawGame();
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSquare(food.x, food.y, foodColor);
  for (let part of snake) {
    drawSquare(part.x, part.y, snakeColor);
  }
}

function gameOver() {
  clearInterval(gameInterval);
  alert("Game Over! Score: " + score);
  startGame();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
  if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
  if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
  if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
});

startGame();
