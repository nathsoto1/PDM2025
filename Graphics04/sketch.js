let bugSprite, squishSprite;
let bugs = [];
let score = 0;
let gameState = "START";
let timer = 30;
let startTime;
let spawnInterval = 5000;
let lastSpawnTime = 0;
let maxBugs = 1;

function preload() {
  bugSprite = loadImage("media/Bug2.png");
  squishSprite = loadImage("media/BugSquished2.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(20);
  angleMode(RADIANS);
}

function draw() {
  background(220);

  if (gameState === "START") {
    drawStartScreen();
  } else if (gameState === "PLAYING") {
    drawGame();
  } else if (gameState === "GAME_OVER") {
    drawGameOver();
  }
}

function drawStartScreen() {
  fill(0);
  text("Bug Smasher!", width / 2, height / 2 - 50);
  text("Press ENTER to Start", width / 2, height / 2);
}

function drawGame() {
  let elapsedTime = millis() - startTime;
  let remainingTime = max(0, timer - floor(elapsedTime / 1000));

  if (remainingTime === 0) {
    gameState = "GAME_OVER";
  }

  fill(0);
  text("Score: " + score, width / 2, 30);
  text("Time: " + remainingTime, width - 50, 30);

  for (let i = bugs.length - 1; i >= 0; i--) {
    bugs[i].move();
    bugs[i].draw();

    if (bugs[i].shouldRemove) {
      bugs.splice(i, 1);
      spawnBug();
    }
  }

  if (millis() - lastSpawnTime > spawnInterval) {
    if (bugs.length < maxBugs) spawnBug();
    maxBugs++;
    lastSpawnTime = millis();
  }
}

function drawGameOver() {
  fill(0);
  text("Game Over!", width / 2, height / 2 - 50);
  text("Final Score: " + score, width / 2, height / 2);
  text("Press ENTER to Restart", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (gameState === "START" && keyCode === ENTER) {
    startGame();
  } else if (gameState === "GAME_OVER" && keyCode === ENTER) {
    resetGame();
  }
}

function mousePressed() {
  if (gameState === "PLAYING") {
    for (let i = bugs.length - 1; i >= 0; i--) {
      if (bugs[i].isClicked(mouseX, mouseY) && !bugs[i].isSquished) {
        score += 10;
        bugs[i].squish();
      }
    }
  }
}

function startGame() {
  gameState = "PLAYING";
  startTime = millis();
  score = 0;
  bugs = [];
  maxBugs = 1;
  spawnBug();
}

function resetGame() {
  gameState = "START";
}

function spawnBug() {
  let side = random() < 0.5 ? "left" : "right";
  let y = random(50, height - 50);
  let speed = random(2, 4);
  let direction = side === "left" ? 1 : -1;

  bugs.push(new Bug(
    side === "left" ? -40 : width + 40, // Increased spawn buffer
    y,
    speed,
    direction
  ));
}

class Bug {
  constructor(x, y, speed, direction) {
    this.x = x;
    this.y = y;
    this.speed = speed * direction;
    this.size = 32;
    this.numFrames = 4;
    this.frameWidth = 32;
    this.frameHeight = 32;
    this.currentFrame = 0;
    this.animationSpeed = 0.2;
    this.frameCounter = 0;
    this.isSquished = false;
    this.squishTime = 0;
    this.shouldRemove = false;
    this.direction = direction;
    this.visible = true;
  }

  move() {
    if (this.isSquished) {
      if (millis() - this.squishTime > 500) this.shouldRemove = true;
      return;
    }

    this.x += this.speed;
    this.frameCounter += this.animationSpeed;
    this.currentFrame = floor(this.frameCounter) % this.numFrames;
    
    // Update visibility with buffer
    this.visible = this.x > -this.size && this.x < width + this.size;
  }

  draw() {
    if (!this.visible) return;

    push();
    translate(this.x, this.y);
    
    if (this.direction === 1) scale(-1, 1);
    
    if (this.isSquished) {
      image(squishSprite, 0, 0, this.size, this.size);
    } else {
      image(bugSprite, 0, 0, this.size, this.size,
        this.currentFrame * this.frameWidth, 0,
        this.frameWidth, this.frameHeight);
    }
    pop();
  }

  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < this.size / 2;
  }

  squish() {
    this.isSquished = true;
    this.squishTime = millis();
  }
}