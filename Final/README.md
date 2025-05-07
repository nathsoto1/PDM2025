# Dodge Survival  

Dodge Survival is a fast-paced avoidance game where players control a green square to dodge falling red obstacles. The goal is to survive as long as possible while the game progressively speeds up, using three Arduino-controlled LEDs to track lives. Players lose lives when obstacles hit the bottom of the screen and aim for the highest score through endurance.  

![Game Preview](dodge_survival.png)  

## Outline  

- [Objects](#objects)  
  - [Player](#player)  
  - [Obstacles](#obstacles)  
  - [LED Lives Indicator](#led-lives-indicator)  
- [Mechanics](#mechanics)  
  - [Score](#score)  
  - [Lives](#lives)  
  - [Win and Loss Conditions](#win-and-loss-conditions)  
- [Components](#components)  
  - [Graphics](#graphics)  
  - [Sound](#sound)  
  - [Hardware](#hardware)  
- [Future Development](#future-development)  
- [Video](#video)  

---

## Objects  

### Player  
A green square controlled by **left/right arrow keys**. It moves horizontally along the bottom of the screen to avoid falling obstacles.  

### Obstacles  
Red squares that fall from the top of the screen. Their speed and spawn rate increase over time, creating progressive difficulty.  

### LED Lives Indicator  
Three LEDs connected to an Arduino (pins 3, 4, 5) that visually represent remaining lives:  
- All lit = 3 lives  
- One off = 2 lives  
- All off = Game Over  

---

## Mechanics  

### Score  
- **+10 points** for each dodged obstacle.  
- **+50 points** every 10 seconds survived (difficulty bonus).  

### Lives  
- Start with **3 lives** (all LEDs lit).  
- Lose **1 life** (one LED turns off) if an obstacle reaches the bottom.  
- Game ends when all LEDs are off.  

### Win and Loss Conditions  
- **Lose**: All 3 LEDs turn off (no lives remaining).  
- **Win**: Survive as long as possible to achieve a high score (endurance-based).  

---

## Components  

### Graphics  
- **Player**: Green square (30x30 pixels).  
- **Obstacles**: Red squares (20x20 pixels).  
- **Background**: Dark gray for contrast.  
- **HUD**: Displays time, score, and lives.  

### Sound  
*(Optional – add your own!)*  
- **Collision Sound**: Plays when losing a life.  
- **Score Bonus**: Plays when earning a difficulty bonus.  

### Hardware  
- **Arduino Uno**: Controls 3 LEDs to track lives.  
- **Wiring**:  
  - **LED 1 (Life 1)**: Pin 3 → 330Ω resistor → LED → GND  
  - **LED 2 (Life 2)**: Pin 4 → 330Ω resistor → LED → GND  
  - **LED 3 (Life 3)**: Pin 5 → 330Ω resistor → LED → GND  

---

## Future Development  
- **Power-Ups**: Temporary shields or speed boosts.  
- **Obstacle Variety**: Different shapes/sizes with unique movement patterns.  
- **Animated Sprites**: Replace squares with characters or themes.  
- **Soundtrack**: Background music and immersive sound effects.  
- **High Score System**: Save and display top scores.  
- **Difficulty Modes**: Adjustable speed/scaling for casual vs. hardcore players.  

---

## Video  
[Watch Dodge Survival in Action](https://youtube.com/shorts/ZYs4rT0ATl4)  
