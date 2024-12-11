// consts
const TILE_SIZE = 60;
const GRID_WIDTH = 30;
const GRID_HEIGHT = 20;
const CANVAS_WIDTH = GRID_WIDTH * TILE_SIZE;
const CANVAS_HEIGHT = GRID_HEIGHT * TILE_SIZE;
const GAME_TIME = 180;
const REQUIRED_CARROTS = 15;
const ENEMY_MOVE_INTERVAL = 500;
const TNT_COOLDOWN = 1000;
const ENEMY_SIZE = TILE_SIZE * 2.5;
const PARTICLE_COUNT = 50;
const MAX_TNT = 5;

// game types
const ASSETS = {
    player: null,
    carrot: null,
    enemy: null,
    trap: null,
    gate: null,
    wall: null,
    tnt: null
};

// tile types (used in 2D array)
const TILE_TYPES = {
    EMPTY: 0,
    WALL: 1,
    CARROT: 2,
    TRAP: 3,
    GATE: 4,
    TNT: 5
};

// directions to move
const DIRECTIONS = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
];

// starting map
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

// parse the 2d array
let LEVEL_MAP = JSON.parse(JSON.stringify(ORIGINAL_MAP));

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        // spawn enemies roughly in each corner
        this.enemies = [
            new Enemy(6 * TILE_SIZE, 5 * TILE_SIZE),
            new Enemy(14 * TILE_SIZE, 8 * TILE_SIZE),
            new Enemy(3 * TILE_SIZE, 12 * TILE_SIZE),
            new Enemy(20 * TILE_SIZE, 15 * TILE_SIZE),
            new Enemy(25 * TILE_SIZE, 3 * TILE_SIZE)
        ];
        
        this.state = 'menu';
        // create player at top left corner
        this.player = new Blaster(TILE_SIZE, TILE_SIZE);

        // initialize vallues
        this.carrots = 0;
        this.timeLeft = GAME_TIME;
        this.lastTime = 0;
        this.lastTNTTime = 0;
        this.tntRemaining = 5;
        
        this.loadAssets();
        this.initializeEventListeners();
    }

    // load assets as images
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

    // add event listener to buttons and keyboard keys
    initializeEventListeners() {
        document.getElementById('startButton').addEventListener('click', () => this.startGame());
        document.getElementById('restartButton').addEventListener('click', () => this.startGame());
        
        window.addEventListener('keydown', (e) => {
            if (this.state !== 'playing') return;
            
            // can move with arrows or wasd
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
                default:
                    break;
            }
        });
    }


    // start game
    startGame() {
            // reset map
            LEVEL_MAP = JSON.parse(JSON.stringify(ORIGINAL_MAP));
            this.player.reset();
            this.enemies.forEach(enemy => enemy.reset());
        this.state = 'playing';
        this.carrots = 0;
        this.timeLeft = GAME_TIME;
        this.tntRemaining = 5;
        // hide menu
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('gameOverMenu').style.display = 'none';
        this.lastTime = performance.now();
        this.updateTNTDisplay();
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    // update tnt to reflect how many remaining
    updateTNTDisplay() {
        for (let i = 1; i <= MAX_TNT; i++) {
            const tntIcon = document.getElementById(`tnt${i}`);
            if (tntIcon) {
                // update used. if used, css makes lowers opacity to give greyed out look
                tntIcon.classList.toggle('used', i > this.tntRemaining);
            }
        }
    }

    
    gameLoop(timestamp) {
        if (this.state !== 'playing') return;

        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // update time
        this.timeLeft -= deltaTime;
        if (this.timeLeft <= 0) {
            this.gameOver('Time\'s up!');
            return;
        }
    
        // update game
        this.update();

        // clear old canvas
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // redraw
        this.draw();

        this.updateHUD();

        // // check if player won
        // if ((LEVEL_MAP[Math.floor(this.player.y / TILE_SIZE)][Math.floor(this.player.x / TILE_SIZE)] === TILE_TYPES.GATE) && this.carrots >= REQUIRED_CARROTS) {
        //     this.win();
        //     return;
        // }

        // recursively call gameloop
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    update() {
        const currentTime = performance.now();
        

        // update each enemies
        this.enemies.forEach(enemy => {
            enemy.update(LEVEL_MAP, this.player, currentTime);
            if (enemy.checkCollision(this.player)) {
                this.gameOver('Caught by enemy!');
            }
        });


        // check for carrot collision (if picked up)
        const playerTile = LEVEL_MAP[Math.floor(this.player.y / TILE_SIZE)][Math.floor(this.player.x / TILE_SIZE)];
        if (playerTile === TILE_TYPES.CARROT) {
            this.carrots++;
            // remove carrot from this tile
            LEVEL_MAP[Math.floor(this.player.y / TILE_SIZE)][Math.floor(this.player.x / TILE_SIZE)] = TILE_TYPES.EMPTY;
        }

        // check for trap collision (rare because they are stationary)
        if (playerTile === TILE_TYPES.TRAP) {
            this.gameOver('Fell into a trap!');
        }

        // check if player meets win requirements (has enough carrots and is on gate tile)
        if (playerTile === TILE_TYPES.GATE && this.carrots >= REQUIRED_CARROTS) {
            this.win();
        }
    }

    draw() {
        this.ctx.fillStyle = '#8FBC8F';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // draw map
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const tile = LEVEL_MAP[y][x];
                const xPos = x * TILE_SIZE;
                const yPos = y * TILE_SIZE;

                // draw appropriate asset at appropriate location
                if (tile == TILE_TYPES.WALL) {
                    this.ctx.drawImage(ASSETS.wall, xPos, yPos, TILE_SIZE, TILE_SIZE);
                } else if (tile == TILE_TYPES.CARROT) {
                    this.ctx.drawImage(ASSETS.carrot, xPos, yPos, TILE_SIZE, TILE_SIZE);
                } else if (tile == TILE_TYPES.TRAP) {
                    this.ctx.drawImage(ASSETS.trap, xPos, yPos, TILE_SIZE, TILE_SIZE);
                } else if (tile == TILE_TYPES.GATE) {
                    this.ctx.drawImage(ASSETS.gate, xPos, yPos, TILE_SIZE, TILE_SIZE);
                } else if (tile == TILE_TYPES.TNT) {
                    this.ctx.drawImage(ASSETS.tnt, xPos, yPos, TILE_SIZE, TILE_SIZE);
                }
            }
        }

        // draw player
        this.player.draw(this.ctx);

        // draw enemies
        this.enemies.forEach(enemy => enemy.draw(this.ctx));


    }

    updateHUD() {
        // update health and score
        document.getElementById('scoreValue').textContent = `${this.carrots}/${REQUIRED_CARROTS}`;
        document.getElementById('healthValue').textContent = Math.ceil(this.timeLeft);
    }

    gameOver(reason) {
        // show game over screen with reason
        this.state = 'gameOver';
        document.getElementById('gameOverMenu').style.display = 'block';
        document.getElementById('gameOverText').style.color = "#FF4500";
        document.getElementById('gameOverText').textContent = "Game Over";
        document.getElementById('finalScore').textContent = `${this.carrots} carrots - ${reason}`;
        LEVEL_MAP = JSON.parse(JSON.stringify(ORIGINAL_MAP));
    }

    win() {
        // show game over screen but Win verson
        this.state = 'gameOver';
        document.getElementById('gameOverMenu').style.display = 'block';
        document.getElementById('gameOverText').style.color = "#56D643";
        document.getElementById('gameOverText').textContent = "You win!";
        document.getElementById('finalScore').textContent = `Victory! Escaped with ${this.carrots} carrots!`;
    }

    // place tnt if past 1 second cooldown and available
    placeTNT(currentTime) {
        if (currentTime - this.lastTNTTime < TNT_COOLDOWN) return false;
        if (this.tntRemaining <= 0) return false;

        const playerGridX = Math.floor(this.player.x / TILE_SIZE);
        const playerGridY = Math.floor(this.player.y / TILE_SIZE);

        // can only place tnt on empty tile
        if (LEVEL_MAP[playerGridY][playerGridX] === TILE_TYPES.EMPTY) {
            LEVEL_MAP[playerGridY][playerGridX] = TILE_TYPES.TNT;
            this.lastTNTTime = currentTime;
            this.tntRemaining--;
            this.updateTNTDisplay();
            return true;
        }
        return false;
    }
}

// blaster class
class Blaster {
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

    // move in indicated direction
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

    // draw donkey png
    draw(ctx) {
        ctx.drawImage(ASSETS.player, this.x, this.y, TILE_SIZE, TILE_SIZE);
    }
}

// enemies class 
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

    // move enemy towards blaster and check collisions
    update(levelMap, player, currentTime) {
        if (!this.isAlive) return;

        // move only every 500ms
        if (currentTime - this.lastMoveTime < ENEMY_MOVE_INTERVAL) return;

        // check if stepped on tnt
        const currentTile = levelMap[this.gridY][this.gridX];
        if (currentTile === TILE_TYPES.TNT) {
            this.isAlive = false;
            levelMap[this.gridY][this.gridX] = TILE_TYPES.EMPTY;
            return;
        }

        const playerGridX = Math.floor(player.x / TILE_SIZE);
        const playerGridY = Math.floor(player.y / TILE_SIZE);
        
        let bestDirection = null;
        let bestDistance = Infinity;

        /* PATHFINDING! */
        // chcek each direction and see which decreases distance to player
        for (const dir of DIRECTIONS) {
            const newX = this.gridX + dir.x;
            const newY = this.gridY + dir.y;

            // if in bounds and not a wall
            if (newX >= 0 && newX < GRID_WIDTH && 
                newY >= 0 && newY < GRID_HEIGHT && 
                levelMap[newY][newX] !== TILE_TYPES.WALL) {
                
                const distance = Math.abs(newX - playerGridX) + Math.abs(newY - playerGridY);
                // if distance is lowest with this move, set direction
                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestDirection = dir;
                }
            }
        }

        // move in best direction, if found
        if (bestDirection) {
            this.gridX += bestDirection.x;
            this.gridY += bestDirection.y;
            this.screenX = this.gridX * TILE_SIZE;
            this.screenY = this.gridY * TILE_SIZE;
            this.lastMoveTime = currentTime;
        }
    }

    // draw enemy if not dead.
    draw(ctx) {
        if (!this.isAlive) return;
        
        // draw enemy with offset to center it
        const offsetX = (ENEMY_SIZE - TILE_SIZE) / 2;
        const offsetY = (ENEMY_SIZE - TILE_SIZE) / 2;
        
        
        ctx.drawImage(ASSETS.enemy, 
            this.screenX - offsetX, 
            this.screenY - offsetY, 
            ENEMY_SIZE, 
            ENEMY_SIZE
        );
        
        ctx.restore();
    }

    // check if hit player (if alive)
    checkCollision(player) {
        if (!this.isAlive) return false;
        
        const playerGridX = Math.floor(player.x / TILE_SIZE);
        const playerGridY = Math.floor(player.y / TILE_SIZE);
        
        
        const dx = Math.abs(this.gridX - playerGridX);
        const dy = Math.abs(this.gridY - playerGridY);
        // if one away, collision happened (might make this zero to make itt more realistic)
        return dx <= 1 && dy <= 1; 
    }
}

// on load, start game
window.onload = () => {
    window.game = new Game();
}; 