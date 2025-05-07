Outline
Objects
Player

A green rectangle controlled by left/right arrow keys.

Moves horizontally along the bottom of the screen.

Obstacles

Red rectangles that fall from the top of the screen.

Speed and spawn rate increase over time.

LED Lives Indicator

3 LEDs connected to an Arduino (pins 3, 4, 5) that light up to show remaining lives.

Mechanics
Movement

Left/Right Arrow Keys: Move the player horizontally.

Obstacle Spawning

Obstacles spawn at the top of the screen at increasing rates.

Speed accelerates every 10 seconds (progressive difficulty).

Scoring

+10 points per dodged obstacle.

+50 points every 10 seconds survived (difficulty bonus).

Lives System

Start with 3 lives (all LEDs lit).

Lose 1 life (LED turns off) if an obstacle reaches the bottom.

Game ends when all lives are lost.

Win and Loss Conditions
Lose: All 3 LEDs turn off (no lives remaining).

Win: Survive as long as possible to achieve a high score (no explicit win condition; focus on endurance).

Components
Graphics
Player: Green rectangle (30x30 pixels).

Obstacles: Red rectangles (20x20 pixels).

Background: Dark gray for contrast.

HUD: Displays time, score, and lives.

Sound
(Optional in current version – add if implemented)

Collision Sound: Plays when losing a life.

Score Bonus: Plays when earning a difficulty bonus.

Hardware
Arduino Uno: Controls 3 LEDs (pins 3, 4, 5) to represent lives.

Wiring:

LEDs connected with 330Ω resistors to ground.

LED 1 (Life 1): Pin 3

LED 2 (Life 2): Pin 4

LED 3 (Life 3): Pin 5

Future Development
Power-Ups

Temporary shields, speed boosts, or score multipliers.

Obstacle Variety

Different shapes, sizes, and movement patterns.

Animated Sprites

Replace rectangles with animated characters or themes.

Soundtrack & Effects

Background music and immersive sound design.

Difficulty Modes

Adjustable speed/scaling for casual vs. hardcore players.

High Score System

Save and display top scores locally or online.

How to Play
Connect the Arduino and upload the LED control code.

Open the game in a browser and click "Connect Arduino."

Use arrow keys to dodge falling obstacles.

Survive as long as possible while LEDs track your lives!

Video Demo
(Insert link to gameplay video here)

