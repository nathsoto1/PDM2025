let synth1, filt, rev, polySynth, noise1, ampEnv1, filt1, wetSlider, cutoffSlider;

let activeKey = null;

let keyNotes = {
  'a': 'A4',
  's': 'B4',
  'd': 'C5',
  'f': 'D5'
};

let keyNotes1 = {
  'q': 'D4',
  'w': 'F4',
  'e': 'A4'
};

function setup() {
  createCanvas(400, 400);
  
  // Lowpass filter
  filt = new Tone.Filter(1500, "lowpass").toDestination();
  
  // Reverb effect
  rev = new Tone.Reverb(2).connect(filt);
  
  // Monophonic synth
  synth1 = new Tone.Synth({
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.9,
      release: 0.3
    }
  }).connect(rev);
  
  synth1.portamento = 0.05;
  
  // Polyphonic synth
  polySynth = new Tone.PolySynth(Tone.Synth).connect(rev);
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 1,
      release: 0.1
    },
    oscillator: {
      type: 'sawtooth'
    }
  });
  
  polySynth.volume.value = -6;

  // Noise generator with amplitude envelope
  ampEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.5,
    sustain: 0,
    release: 0.1
  }).toDestination();
  
  filt1 = new Tone.Filter(1500, "highpass").connect(ampEnv1);
  noise1 = new Tone.Noise('pink').start().connect(filt1);

  // Reverb Wet Amount Slider
  wetSlider = createSlider(0, 1, 0.5, 0.01);
  wetSlider.position(200, 200);
  wetSlider.input(() => {
    rev.wet.value = wetSlider.value();
  });

  // Filter Cutoff Frequency Slider (New Feature)
  cutoffSlider = createSlider(200, 5000, 1500, 10);
  cutoffSlider.position(200, 250);
  cutoffSlider.input(() => {
    filt.frequency.value = cutoffSlider.value();
  });
}

function draw() {
  background(220);
  text("keys a-f are the monophonic synth,  \nkeys q-e are the polyphonic synth, \nkey z is the noise.", 20, 20);
  text("Reverb Wet Amount: " + wetSlider.value(), 205, 190);
  text("Filter Cutoff: " + cutoffSlider.value() + " Hz", 205, 240);
}

function keyPressed() {
  let keyPressed = key.toLowerCase();
  let pitch = keyNotes[keyPressed];
  let pitch1 = keyNotes1[keyPressed];

  if (pitch && keyPressed !== activeKey) {
    synth1.triggerRelease();
    activeKey = keyPressed;
    synth1.triggerAttack(pitch);
  } else if (pitch1) {
    polySynth.triggerAttack(pitch1);
  } else if (keyPressed === "z") {
    ampEnv1.triggerAttackRelease(0.1);
  }
}

function keyReleased() {
  let keyReleased = key.toLowerCase();
  let pitch1 = keyNotes1[keyReleased];

  if (keyReleased === activeKey) {
    synth1.triggerRelease();
    activeKey = null;
  } else if (pitch1) {
    polySynth.triggerRelease(pitch1);
  }
}