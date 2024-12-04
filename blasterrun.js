// Game Constants and Configuration
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const FPS = 60;

// Game State
const GameState = {
    MENU: 'menu',
    PLAYING: 'playing',
    GAME_OVER: 'gameOver'
};

// Game Class
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        
        // Game state
        this.currentState = GameState.MENU;
        this.score = 0;
        this.health = 100;
        
        // Game objects
        this.player = null;
        this.enemies = [];
        this.projectiles = [];
        this.powerups = [];
        
        // Initialize event listeners
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // TODO: Add event listeners for:
        // 1. Mouse movement for player control
        // 2. Click events for shooting
        // 3. Menu button clicks
        document.getElementById('startButton').addEventListener('click', () => this.startGame());
        document.getElementById('restartButton').addEventListener('click', () => this.startGame());
    }

    startGame() {
        // TODO: Initialize game state
        this.currentState = GameState.PLAYING;
        this.score = 0;
        this.health = 100;
        this.player = new Player(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50);
        this.enemies = [];
        this.projectiles = [];
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('gameOverMenu').style.display = 'none';
        this.gameLoop();
    }

    gameLoop() {
        if (this.currentState !== GameState.PLAYING) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Update game objects
        this.update();

        // Draw game objects
        this.draw();

        // Update HUD
        this.updateHUD();

        // Next frame
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // TODO: Implement update logic for:
        // 1. Player movement
        // 2. Enemy spawning and movement
        // 3. Projectile movement
        // 4. Collision detection
        // 5. Power-up spawning and collection
    }

    draw() {
        // TODO: Implement drawing logic for:
        // 1. Background
        // 2. Player
        // 3. Enemies
        // 4. Projectiles
        // 5. Power-ups
        // 6. Particles and effects
    }

    updateHUD() {
        document.getElementById('scoreValue').textContent = this.score;
        document.getElementById('healthValue').textContent = this.health;
    }

    gameOver() {
        this.currentState = GameState.GAME_OVER;
        document.getElementById('gameOverMenu').style.display = 'block';
        document.getElementById('finalScore').textContent = this.score;
    }
}

// Player Class
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.speed = 5;
        // TODO: Add player properties and methods
    }

    update() {
        // TODO: Implement player movement and shooting
    }

    draw(ctx) {
        // TODO: Implement player drawing
    }
}

// Enemy Class
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // TODO: Add enemy properties
    }

    update() {
        // TODO: Implement enemy movement patterns
    }

    draw(ctx) {
        // TODO: Implement enemy drawing
    }
}

// Projectile Class
class Projectile {
    constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        // TODO: Add projectile properties
    }

    update() {
        // TODO: Implement projectile movement
    }

    draw(ctx) {
        // TODO: Implement projectile drawing
    }
}

// Power-up Class
class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        // TODO: Add power-up properties
    }

    update() {
        // TODO: Implement power-up movement and effects
    }

    draw(ctx) {
        // TODO: Implement power-up drawing
    }
}

// Particle System for Effects
class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    createExplosion(x, y) {
        // TODO: Implement particle effects for explosions
    }

    update() {
        // TODO: Update particle positions and lifetimes
    }

    draw(ctx) {
        // TODO: Draw particles
    }
}

// Initialize game when window loads
window.onload = () => {
    const game = new Game();
}; 