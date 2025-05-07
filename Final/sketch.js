let port;
let connectButton;
let data = { pause: 0, end: 0 };

// Game elements
let playerX, playerY, playerSize = 30, speed = 5;
let obstacles = [];
let baseObstacleSpeed = 3, obstacleSpeed;
let baseSpawnRate = 60, spawnRate;
let frameCounter = 0, lives = 3, score = 0;
let lastCollision = 0, collisionCooldown = 1000;

// Timing elements
let gameStartTime, pausedTime = 0, lastPauseTime;
let difficultyInterval = 10000;
let lastDifficultyIncrease = 0;

// Game states
let gameState = "start";

function setup() {
  createCanvas(600, 400);
  playerX = width / 2;
  playerY = height - 40;
  obstacleSpeed = baseObstacleSpeed;
  spawnRate = baseSpawnRate;

  port = createSerial();
  connectButton = createButton(' Connect Arduino');
  connectButton.position(10, 410);
  
  connectButton.mousePressed(() => port.open('Arduino', 9600));
}

function draw() {
  background(30);
  if (port.opened()) {
    let str = port.readUntil('\n');
    if (str !== "") {
      const values = str.trim().split(',');
      if (values.length === 2) {
        data.pause = int(values[0]);
        data.end = int(values[1]);
      }
    }
  }

  handleInput();
  updateGame();
  displayGame();
  displayHUD();
  
  if(frameCount % 60 === 0) console.log("Lives:", lives);
}

function handleInput() {
  if (data.pause === 1 && gameState !== "gameOver") togglePause();
  if (data.end === 1) endGame();
  
  if (keyIsDown(LEFT_ARROW)) playerX -= speed;
  if (keyIsDown(RIGHT_ARROW)) playerX += speed;
  playerX = constrain(playerX, 0, width - playerSize);
}

function updateGame() {
  switch(gameState) {
    case "start": showStartScreen(); break;
    case "playing": runGameLogic(); break;
    case "paused": showPaused(); break;
    case "gameOver": showGameOver(); break;
  }
}

function runGameLogic() {
  // Spawn obstacles
  if (frameCounter % spawnRate === 0) {
    obstacles.push({ x: random(0, width - 20), y: 0 });
  }
  frameCounter++;

  // Update obstacles
  fill(255, 0, 0);
  for(let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].y += obstacleSpeed;
    rect(obstacles[i].x, obstacles[i].y, 20, 20);

    // Collision detection
    if(millis() - lastCollision > collisionCooldown && 
       collision(playerX, playerY, playerSize, obstacles[i].x, obstacles[i].y, 20)) {
      handleCollision();
    }

    if(obstacles[i].y > height) {
      obstacles.splice(i, 1);
      score += 10;
    }
  }

  // Progressive difficulty
  if(millis() - lastDifficultyIncrease > difficultyInterval) {
    obstacleSpeed *= 1.2;
    spawnRate *= 0.8;
    score += 50;
    lastDifficultyIncrease = millis();
  }
}

function handleCollision() {
  if(port.opened()) port.write("LOSE_LIFE\n");
  lives--;
  lastCollision = millis();
  if(lives <= 0) endGame();
}

function displayGame() {
  // Draw player
  fill(0, 255, 0);
  rect(playerX, playerY, playerSize, playerSize);
}

function displayHUD() {
  // HUD background
  fill(0, 150);
  rect(5, 5, 150, 70, 5);
  
  // HUD text
  fill(255);
  textAlign(LEFT, TOP);
  textSize(14);
  text(`Time: ${formatTime()}`, 10, 10);
  text(`Score: ${score}`, 10, 30);
  text(`Lives: ${lives}`, 10, 50);
}

function formatTime() {
  let elapsed = gameState === "playing" ? millis() - gameStartTime - pausedTime : 0;
  return nf(floor(elapsed/60000), 2) + ":" + nf(floor((elapsed%60000)/1000), 2);
}

function togglePause() {
  if(gameState === "paused") {
    pausedTime += millis() - lastPauseTime;
    gameState = "playing";
  } else {
    lastPauseTime = millis();
    gameState = "paused";
  }
}

function endGame() {
  gameState = "gameOver";
}

function resetGame() {
  if(port.opened()) port.write("RESET_LIVES\n");
  obstacles = [];
  playerX = width / 2;
  frameCounter = 0;
  lives = 3;
  score = 0;
  obstacleSpeed = baseObstacleSpeed;
  spawnRate = baseSpawnRate;
  gameStartTime = millis();
  lastDifficultyIncrease = 0;
  pausedTime = 0;
  gameState = "playing";
}

// UI Screens
function showStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("DODGE GAME", width/2, height/2 - 40);
  textSize(20);
  text("Press SPACE to Start", width/2, height/2);
}

function showPaused() {
  fill(255, 255, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("PAUSED", width/2, height/2);
}

function showGameOver() {
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("GAME OVER", width/2, height/2);
  textSize(20);
  text(`Final Score: ${score}`, width/2, height/2 + 40);
  text("Press SPACE to Restart", width/2, height/2 + 80);
}

function keyPressed() {
  if (key === ' ') {
    if (gameState === "start" || gameState === "gameOver") resetGame();
  }
}

function collision(x1, y1, s1, x2, y2, s2) {
  return x1 < x2 + s2 && x1 + s1 > x2 &&
         y1 < y2 + s2 && y1 + s1 > y2;
}