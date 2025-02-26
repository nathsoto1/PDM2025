let samples, sampler, button1, button2, button3, button4, button11, button22, button33, button44, delTimeSlider, feedbackSlider, distSlider, wetSlider, startContext, stopButton;

let rev = new Tone.Reverb(5).toDestination()
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).connect(dist);
del.wet.value = 0.5;

function preload() { 
  samples = new Tone.Players({
    pluh: "media/pluh.mp3",
    ohio: "media/ohio.mp3",
    sus: "media/sus.mp3",
    anime: "media/animePunch.mp3"
  }).connect(del);
}

function setup() {
  createCanvas(400, 400);

  button1 = createButton("Pluh");
  button1.position(10, 30);
  button11 = createButton("Stop");
  button11.position(60, 30);

  button2 = createButton("Ohio");
  button2.position(10, 60);
  button22 = createButton("Stop");
  button22.position(60,60);

  button3 = createButton("Sus");
  button3.position(10, 90);
  button33 = createButton("Stop");
  button33.position(55,90);

  button4 = createButton("Anime");
  button4.position(10, 120);
  button44 = createButton("Stop");
  button44.position(70,120);

  button1.mousePressed(() => {samples.player("pluh").start()});
  button2.mousePressed(() => {samples.player("ohio").start()});
  button3.mousePressed(() => {samples.player("sus").start()});
  button4.mousePressed(() => {samples.player("anime").start()});
  
  button11.mousePressed(() =>samples.player("pluh").stop());
  button22.mousePressed(() => samples.player("ohio").stop());
  button33.mousePressed(() => samples.player("sus").stop());
  button44.mousePressed(() => samples.player("anime").stop());

  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(20, 170);
  delTimeSlider.input(() => {del.delayTime.value = delTimeSlider.value()});
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 170);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(20, 200);
  distSlider.input(() => {dist.distortion = distSlider.value()});
  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(200, 200);
  wetSlider.input(() => {rev.wet.value = wetSlider.value()});
}

function draw() {
  background(220);
  textSize(20);
  text("Groofy sound board", 100 , 15);
  
  textSize(14);
  text("Delay Time: " + delTimeSlider.value(), 25, 170);
  text("Feedback Amount: " + feedbackSlider.value(), 205, 170);
  text("Distortion Amount: " + distSlider.value(), 25, 200);
  text("Reverb Wet Amount: " + wetSlider.value(), 205, 200)
}

function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already running")
  }
}