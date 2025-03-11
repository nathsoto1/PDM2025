let imgBlock, imgChest;
let oscBlock, noiseBlock, filterBlock, envBlock;
let oscChest, noiseChest, filterChest, lfoChest;

function preload() {
  imgBlock = loadImage("media/marioBlock.png");
  imgChest = loadImage("media/fortniteChest.png");
}

function setup() {
  createCanvas(700, 500);
  background(200);
  
  // Block hit sound (using an envelope for a quick punchy sound)
  oscBlock = new Tone.Oscillator({ type: "square", frequency: 200 }).toDestination();
  noiseBlock = new Tone.Noise("white");
  filterBlock = new Tone.Filter(1000, "lowpass").toDestination();
  envBlock = new Tone.AmplitudeEnvelope({
    attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.1
  }).toDestination();

  noiseBlock.connect(filterBlock);
  oscBlock.connect(envBlock);

  // Fortnite chest sound (LFO modulates the pitch for a magical effect)
  oscChest = new Tone.Oscillator({ type: "sine", frequency: 100 }).toDestination();
  noiseChest = new Tone.Noise("pink");
  filterChest = new Tone.Filter(1500, "highpass").toDestination();
  noiseChest.connect(filterChest);

  lfoChest = new Tone.LFO(2, 80, 120);
  lfoChest.connect(oscChest.frequency);
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
  noiseBlock.start();
  envBlock.triggerAttackRelease(0.1);
  setTimeout(() => {
    oscBlock.stop();
    noiseBlock.stop();
  }, 200);
}

function playChestSound() {
  oscChest.start();
  noiseChest.start();
  lfoChest.start();

  setTimeout(() => {
    oscChest.stop();
    noiseChest.stop();
    lfoChest.stop();
  }, 800);
}


