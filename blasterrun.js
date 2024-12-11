const TILE_SIZE = 60;
const GRID_WIDTH = 30;
const GRID_HEIGHT = 20;
const CANVAS_WIDTH = GRID_WIDTH * TILE_SIZE;
const CANVAS_HEIGHT = GRID_HEIGHT * TILE_SIZE;
const GAME_TIME = 180;
const REQUIRED_CARROTS = 15;
const ENEMY_MOVE_INTERVAL = 500;
const TNT_COOLDOWN = 4000;
const ENEMY_SIZE = TILE_SIZE * 2.5;
const EXPLOSION_DURATION = 1000;
const PARTICLE_COUNT = 50;

const ASSETS = {
    player: null,
    carrot: null,
    enemy: null,
    trap: null,
    gate: null,
    wall: null,
    tnt: null
};

const TILE_TYPES = {
    EMPTY: 0,
    WALL: 1,
    CARROT: 2,
    TRAP: 3,
    GATE: 4,
    TNT: 5
};

const DIRECTIONS = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
];

const ORIGINAL_MAP = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 1, 0, 0, 2, 0, 0, 0, 0, 2, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 3, 1, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 2, 1, 0, 1, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let LEVEL_MAP = JSON.parse(JSON.stringify(ORIGINAL_MAP));

class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.startTime = performance.now();
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = (Math.PI * 2 * i) / PARTICLE_COUNT;
            const speed = 2 + Math.random() * 3;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                color: `hsl(${Math.random() * 30 + 15}, 100%, 50%)`
            });
        }
    }

    update() {
        const elapsed = performance.now() - this.startTime;
        const progress = elapsed / EXPLOSION_DURATION;

        if (progress >= 1) return false;

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life = 1 - progress;
        });

        return true;
    }

    draw(ctx) {
        ctx.save();
        this.particles.forEach(particle => {
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, TILE_SIZE / 4, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        
        this.state = 'menu';
        this.player = new Player(TILE_SIZE, TILE_SIZE);
        this.enemies = [
            new Enemy(6 * TILE_SIZE, 5 * TILE_SIZE),
            new Enemy(14 * TILE_SIZE, 8 * TILE_SIZE),
            new Enemy(3 * TILE_SIZE, 12 * TILE_SIZE),
            new Enemy(20 * TILE_SIZE, 15 * TILE_SIZE),
            new Enemy(25 * TILE_SIZE, 3 * TILE_SIZE)
        ];
        this.carrots = 0;
        this.timeLeft = GAME_TIME;
        this.lastTime = 0;
        this.explosions = [];
        this.lastTNTTime = 0;
        
        this.loadAssets();
        this.initializeEventListeners();
    }

    async loadAssets() {
        const loadImage = (src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.src = src;
            });
        };

        ASSETS.player = await loadImage('images/donkey.png');
        ASSETS.carrot = await loadImage('images/carrot.png');
        ASSETS.enemy = await loadImage('images/enemy.png');
        ASSETS.trap = await loadImage('images/trap.png');
        ASSETS.gate = await loadImage('images/gate.png');
        ASSETS.wall = await loadImage('images/wall.png');
        ASSETS.tnt = await loadImage('images/tnt.png');
    }

    initializeEventListeners() {
        document.getElementById('startButton').addEventListener('click', () => this.startGame());
        document.getElementById('restartButton').addEventListener('click', () => this.startGame());
        
        window.addEventListener('keydown', (e) => {
            if (this.state !== 'playing') return;
            
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                    this.player.move(0, -1, LEVEL_MAP);
                    break;
                case 'ArrowDown':
                case 's':
                    this.player.move(0, 1, LEVEL_MAP);
                    break;
                case 'ArrowLeft':
                case 'a':
                    this.player.move(-1, 0, LEVEL_MAP);
                    break;
                case 'ArrowRight':
                case 'd':
                    this.player.move(1, 0, LEVEL_MAP);
                    break;
                case ' ':
                    this.placeTNT(performance.now());
                    break;
            }
        });
    }

    resetMap() {
        // Reset the map to its original state
        LEVEL_MAP = JSON.parse(JSON.stringify(ORIGINAL_MAP));
    }

    startGame() {
        this.state = 'playing';
        this.carrots = 0;
        this.timeLeft = GAME_TIME;
        this.resetMap();
        this.player.reset();
        this.enemies.forEach(enemy => enemy.reset());
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('gameOverMenu').style.display = 'none';
        this.lastTime = performance.now();
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    gameLoop(timestamp) {
        if (this.state !== 'playing') return;

        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Update time
        this.timeLeft -= deltaTime;
        if (this.timeLeft <= 0) {
            this.gameOver('Time\'s up!');
            return;
        }

        this.update();

        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        this.draw();

        this.updateHUD();

        if (this.checkWinCondition()) {
            this.win();
            return;
        }

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    update() {
        const currentTime = performance.now();
        
        // Update explosions
        this.explosions = this.explosions.filter(explosion => explosion.update());

        // Update enemies
        this.enemies.forEach(enemy => {
            enemy.update(LEVEL_MAP, this.player, currentTime);
            if (enemy.checkCollision(this.player)) {
                this.gameOver('Caught by enemy!');
            }
        });

        // Check for carrot collection
        const playerTile = LEVEL_MAP[Math.floor(this.player.y / TILE_SIZE)][Math.floor(this.player.x / TILE_SIZE)];
        if (playerTile === TILE_TYPES.CARROT) {
            this.carrots++;
            LEVEL_MAP[Math.floor(this.player.y / TILE_SIZE)][Math.floor(this.player.x / TILE_SIZE)] = TILE_TYPES.EMPTY;
        }

        // Check for trap collision
        if (playerTile === TILE_TYPES.TRAP) {
            this.gameOver('Fell into a trap!');
        }

        // Check for gate (win condition)
        if (playerTile === TILE_TYPES.GATE && this.carrots >= REQUIRED_CARROTS) {
            this.win();
        }
    }

    draw() {
        // Clear with background
        this.ctx.fillStyle = '#8FBC8F';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw map
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const tile = LEVEL_MAP[y][x];
                const xPos = x * TILE_SIZE;
                const yPos = y * TILE_SIZE;

                switch (tile) {
                    case TILE_TYPES.WALL:
                        this.ctx.drawImage(ASSETS.wall, xPos, yPos, TILE_SIZE, TILE_SIZE);
                        break;
                    case TILE_TYPES.CARROT:
                        this.ctx.drawImage(ASSETS.carrot, xPos, yPos, TILE_SIZE, TILE_SIZE);
                        break;
                    case TILE_TYPES.TRAP:
                        this.ctx.drawImage(ASSETS.trap, xPos, yPos, TILE_SIZE, TILE_SIZE);
                        break;
                    case TILE_TYPES.GATE:
                        this.ctx.drawImage(ASSETS.gate, xPos, yPos, TILE_SIZE, TILE_SIZE);
                        break;
                    case TILE_TYPES.TNT:
                        this.ctx.drawImage(ASSETS.tnt, xPos, yPos, TILE_SIZE, TILE_SIZE);
                        break;
                }
            }
        }

        // Draw player
        this.player.draw(this.ctx);

        // Draw enemies
        this.enemies.forEach(enemy => enemy.draw(this.ctx));

        // Draw explosions on top
        this.explosions.forEach(explosion => explosion.draw(this.ctx));
    }

    updateHUD() {
        document.getElementById('scoreValue').textContent = `${this.carrots}/${REQUIRED_CARROTS}`;
        document.getElementById('healthValue').textContent = Math.ceil(this.timeLeft);
    }

    checkWinCondition() {
        const playerTile = LEVEL_MAP[Math.floor(this.player.y / TILE_SIZE)][Math.floor(this.player.x / TILE_SIZE)];
        return playerTile === TILE_TYPES.GATE && this.carrots >= REQUIRED_CARROTS;
    }

    gameOver(reason) {
        this.state = 'gameOver';
        document.getElementById('gameOverMenu').style.display = 'block';
        document.getElementById('finalScore').textContent = `${this.carrots} carrots - ${reason}`;
        this.resetMap();
    }

    win() {
        this.state = 'gameOver';
        document.getElementById('gameOverMenu').style.display = 'block';
        document.getElementById('finalScore').textContent = `Victory! Escaped with ${this.carrots} carrots!`;
    }

    addExplosion(x, y) {
        this.explosions.push(new Explosion(x, y));
    }

    placeTNT(currentTime) {
        if (currentTime - this.lastTNTTime < TNT_COOLDOWN) return false;

        const playerGridX = Math.floor(this.player.x / TILE_SIZE);
        const playerGridY = Math.floor(this.player.y / TILE_SIZE);

        if (LEVEL_MAP[playerGridY][playerGridX] === TILE_TYPES.EMPTY) {
            LEVEL_MAP[playerGridY][playerGridX] = TILE_TYPES.TNT;
            this.lastTNTTime = currentTime;
            return true;
        }
        return false;
    }
}

class Player {
    constructor(x, y) {
        this.startX = x;
        this.startY = y;
        this.lastBiteTime = 0;
        this.reset();
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

    move(dx, dy, levelMap) {
        const newX = this.x + dx * TILE_SIZE;
        const newY = this.y + dy * TILE_SIZE;
        
        const tileX = Math.floor(newX / TILE_SIZE);
        const tileY = Math.floor(newY / TILE_SIZE);

        if (tileX >= 0 && tileX < GRID_WIDTH && 
            tileY >= 0 && tileY < GRID_HEIGHT && 
            levelMap[tileY][tileX] !== TILE_TYPES.WALL &&
            (levelMap[tileY][tileX] !== TILE_TYPES.GATE || game.carrots >= REQUIRED_CARROTS)) {
            this.x = newX;
            this.y = newY;
        }
    }

    bite(enemies, currentTime) {

        if (currentTime - this.lastBiteTime < BITE_COOLDOWN) return false;

        const playerGridX = Math.floor(this.x / TILE_SIZE);
        const playerGridY = Math.floor(this.y / TILE_SIZE);
        let biteHit = false;

        enemies.forEach(enemy => {
            if (!enemy.isAlive) return;

            const dx = Math.abs(enemy.gridX - playerGridX);
            const dy = Math.abs(enemy.gridY - playerGridY);
            
            if (dx <= BITE_RANGE && dy <= BITE_RANGE) {
                enemy.isAlive = false;
                biteHit = true;
            }
        });

        if (biteHit) {
            this.lastBiteTime = currentTime;
        }
        return biteHit;
    }

    draw(ctx) {
        ctx.drawImage(ASSETS.player, this.x, this.y, TILE_SIZE, TILE_SIZE);
    }
}

class Enemy {
    constructor(x, y) {
        this.gridX = Math.floor(x / TILE_SIZE);
        this.gridY = Math.floor(y / TILE_SIZE);
        this.startGridX = this.gridX;
        this.startGridY = this.gridY;
        this.lastMoveTime = 0;
        this.isAlive = true;
        this.screenX = this.gridX * TILE_SIZE;
        this.screenY = this.gridY * TILE_SIZE;
    }

    reset() {
        this.gridX = this.startGridX;
        this.gridY = this.startGridY;
        this.screenX = this.gridX * TILE_SIZE;
        this.screenY = this.gridY * TILE_SIZE;
        this.isAlive = true;
    }

    update(levelMap, player, currentTime) {
        if (!this.isAlive) return;

        if (currentTime - this.lastMoveTime < ENEMY_MOVE_INTERVAL) return;

        // Check for TNT collision
        const currentTile = levelMap[this.gridY][this.gridX];
        if (currentTile === TILE_TYPES.TNT) {
            this.isAlive = false;
            levelMap[this.gridY][this.gridX] = TILE_TYPES.EMPTY;
            game.addExplosion(this.screenX + ENEMY_SIZE/2, this.screenY + ENEMY_SIZE/2);
            return;
        }

        const playerGridX = Math.floor(player.x / TILE_SIZE);
        const playerGridY = Math.floor(player.y / TILE_SIZE);
        
        let bestDirection = null;
        let bestDistance = Infinity;

        for (const dir of DIRECTIONS) {
            const newX = this.gridX + dir.x;
            const newY = this.gridY + dir.y;

            if (newX >= 0 && newX < GRID_WIDTH && 
                newY >= 0 && newY < GRID_HEIGHT && 
                levelMap[newY][newX] !== TILE_TYPES.WALL) {
                
                const distance = Math.abs(newX - playerGridX) + Math.abs(newY - playerGridY);
                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestDirection = dir;
                }
            }
        }

        if (bestDirection) {
            this.gridX += bestDirection.x;
            this.gridY += bestDirection.y;
            this.screenX = this.gridX * TILE_SIZE;
            this.screenY = this.gridY * TILE_SIZE;
            this.lastMoveTime = currentTime;
        }
    }

    draw(ctx) {
        if (!this.isAlive) return;
        
        // Draw massive enemy with offset to center it
        const offsetX = (ENEMY_SIZE - TILE_SIZE) / 2;
        const offsetY = (ENEMY_SIZE - TILE_SIZE) / 2;
        
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;
        
        ctx.drawImage(ASSETS.enemy, 
            this.screenX - offsetX, 
            this.screenY - offsetY, 
            ENEMY_SIZE, 
            ENEMY_SIZE
        );
        
        ctx.restore();
    }

    checkCollision(player) {
        if (!this.isAlive) return false;
        
        const playerGridX = Math.floor(player.x / TILE_SIZE);
        const playerGridY = Math.floor(player.y / TILE_SIZE);
        
        // Increased collision box for massive enemies
        const dx = Math.abs(this.gridX - playerGridX);
        const dy = Math.abs(this.gridY - playerGridY);
        return dx <= 1 && dy <= 1; // Larger collision area
    }
}

// Initialize game when window loads
window.onload = () => {
    window.game = new Game();
}; 