function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 225);
  angleMode(DEGREES);
}

function draw() {
  background(50, 50, 50);
  //Example 1
  noStroke()
  fill(118, 118, 90);
  rect(100, 40, 215, 110);
  
  stroke('black');
  strokeWeight(1)
  fill(0, 0, 100);
  circle(155, 95, 90);
  square(215, 50, 90);

  //Example 2

  noStroke();
  square(100, 180, 215);

  fill(0, 60, 120, 150);
  circle(210, 250, 110);
  fill(240, 60, 100, 150);
  circle(170, 320, 110);
  fill(100,60,100, 150);
  circle(250, 320, 110);

  //Example 3
  fill(0,0,0);
  rect(100, 425, 215, 110);

  fill(60,100,100);

  arc(160, 480, 90, 90, 220, 140);

  fill(360,100,100);
  rect(220, 475, 85, 50)

  arc(262, 475, 85, 80, 180, 360);

  fill(0, 0, 100);
  circle(243, 475, 25);
  circle(282, 475, 25);

  fill(220, 100, 100);
  circle(243, 475, 15);
  circle(282, 475, 15);
  
  //Example 4
  fill(255, 100 , 50);
  square(400, 180, 215);

  fill(120, 80, 50);
  stroke('white');
  strokeWeight(3);
  circle(510, 290, 100);

  fill(0, 100, 100)
  beginShape();
  for (let i = 0; i < 5; i++) {
    let outerAngle = i * 72 - 90;
    let innerAngle = outerAngle + 36;

    let xOuter = 510 + cos(outerAngle) * 50;
    let yOuter = 290 + sin(outerAngle) * 50;
   vertex(xOuter, yOuter);

   let xInner = 510 + cos(innerAngle) * 20;
   let yInner = 290 + sin(innerAngle) * 20;
   vertex(xInner, yInner);
  }
  endShape(CLOSE);

}

