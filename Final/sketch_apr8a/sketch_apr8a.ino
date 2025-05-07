const int LED_PINS[3] = {2, 8, 12};
int lives = 3;

void setup() {
  Serial.begin(9600);
  // Initialize all LEDs ON (HIGH = on)
  for(int i = 0; i < 3; i++) {
    pinMode(LED_PINS[i], OUTPUT);
    digitalWrite(LED_PINS[i], HIGH);
  }
}

void loop() {
  if(Serial.available()) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    
    if(command == "LOSE_LIFE") {
      if(lives > 0) {
        lives--;
        digitalWrite(LED_PINS[lives], LOW); // Turn off current life LED
      }
    }
    else if(command == "RESET_LIVES") {
      lives = 3;
      for(int i = 0; i < 3; i++) {
        digitalWrite(LED_PINS[i], HIGH); // Turn all LEDs back on
      }
    }
  }
}