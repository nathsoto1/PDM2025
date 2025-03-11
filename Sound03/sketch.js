let imgBlock, imgChest;
let oscBlock, noiseBlock, filterBlock;
let oscChest, noiseChest, filterChest, vibrato;

function preload() {
  imgBlock = loadImage("media/marioBlock.png");
  imgChest = loadImage("media/fortniteChest.png");
}

function setup() {
  createCanvas(700, 500);
  background(200);
  
  // Block hit sound (simple bump + debris noise)
  oscBlock = new Tone.Oscillator({ type: "square", frequency: 200 }).toDestination();
  noiseBlock = new Tone.Noise("white");
  filterBlock = new Tone.Filter(1000, "lowpass").toDestination();
  noiseBlock.connect(filterBlock);

  // Fortnite chest sound (magical hum + shimmer noise)
  oscChest = new Tone.Oscillator({ type: "sine", frequency: 100 }).toDestination();
  vibrato = new Tone.Vibrato(5, 0.4).toDestination();
  oscChest.connect(vibrato);

  noiseChest = new Tone.Noise("pink");
  filterChest = new Tone.Filter(1500, "highpass").toDestination();
  noiseChest.connect(filterChest);
}

function draw() {
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(0);
  text("Click a block or chest!", 350, 50);
  
  image(imgBlock, 100, 100, 200, 200);
  image(imgChest, 400, 100, 200, 200);
}

function mousePressed() {
  if (mouseX > 100 && mouseX < 300 && mouseY > 100 && mouseY < 300) {
    console.log("Block hit!");
    playBlockSound();
  } 
  else if (mouseX > 400 && mouseX < 600 && mouseY > 100 && mouseY < 300) {
    console.log("Fortnite chest opened!");
    playChestSound();
  }
}

function playBlockSound() {
  oscBlock.start();
  setTimeout(() => oscBlock.stop(), 100);
  
  noiseBlock.start();
  setTimeout(() => noiseBlock.stop(), 80);
}

function playChestSound() {
  oscChest.start();
  noiseChest.start();
  
  setTimeout(() => {
    oscChest.stop();
    noiseChest.stop();
  }, 500);  
}


