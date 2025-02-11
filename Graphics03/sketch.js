let cyclops, monk, ninja;
let characters = [];

function preload() {
  cyclops = loadImage("56428.png");
  monk = loadImage("56425.png");
  ninja = loadImage("56430.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  // Create multiple characters
  let char1 = new Character(random(80, width - 80), random(80, height - 80), cyclops);
  let char2 = new Character(random(80, width - 80), random(80, height - 80), monk);
  let char3 = new Character(random(80, width - 80), random(80, height - 80), ninja);

  characters.push(char1, char2, char3);
}

function draw() {
  background(220);
  
  characters.forEach(character => character.draw());
}

function keyPressed() {
  characters.forEach(character => character.keyPressed());
}

function keyReleased() {
  characters.forEach(character => character.keyReleased());
}

class Character {
  constructor(x, y, spriteSheet) {
    this.x = x;
    this.y = y;
    this.currentAnimation = "stand";
    this.animations = {};
    this.spriteSheet = spriteSheet;

    this.addAnimation("right", new SpriteAnimation(spriteSheet, 0, 0, 6));
    let leftAnim = new SpriteAnimation(spriteSheet, 0, 0, 6);
    leftAnim.flipped = true;
    this.addAnimation("left", leftAnim);
    this.addAnimation("stand", new SpriteAnimation(spriteSheet, 0, 0, 1));
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "left":
          this.x -= 2;
          break;
        case "right":
          this.x += 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch (keyCode) {
      case LEFT_ARROW:
        this.currentAnimation = "left";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        break;
    }
  }

  keyReleased() {
    this.currentAnimation = "stand";
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {
    let s = this.flipped ? -1 : 1;
    scale(s, 1);
    image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0) this.u++;

    if (this.u === this.startU + this.duration) this.u = this.startU;
  }
}