Blaster's Great Escape - A Maze Adventure Game
Brady Ancell, Matias Pena, Colton Morris, Marc Kamradt

Game Overview:
Help Blaster the donkey escape from a challenging maze! As a clever donkey with access to TNT, Blaster must strategically place explosives to defeat giant monsters while collecting carrots to unlock the final gate. This engaging game combines maze navigation, strategic trap placement, and timing-based gameplay.

Technical Implementation Details:

1. Core Technologies:
  - HTML Canvas for rendering
  - Modern JavaScript
  - CSS with advanced features

2. Game Architecture:
  - Tile-based maze system with collision detection
  - Enemy AI with pathfinding
  - TNT placement and explosion system
  - Timer-based gameplay mechanics
  - Carrot collection and gate unlocking system
  - Responsive controls using keyboard input

3. Key Features:
  - Interactive maze with walls, traps, and collectibles
  - Strategic TNT placement mechanics
  - Enemies that chase the player
  - Time-based challenge system (dont run out of time)
  - Gate unlocking mechanics (get enough carrots)
  - Intuitive keyboard controls (WASD/Arrow keys + Space)

4. Challenging Aspects:
  - Implementing smooth collision detection for maze walls and objects
  - Creating engaging enemy pathfinding (mostly works but enemies can get stuck if theres no tile that is directly closer)
  - Balancing game difficulty with time limits, enemy size, and number of enemies
  - Tnt placement and detection

5. File Structure:
- index.html: Main game page with canvas and UI elements
- blasterrun.css: styling
- blasterrun.js: Game logic and classes
- images/: Directory containing game assets (images)
  - donkey.png: Player character sprite (donkey)
  - carrot.png: Collectible item sprite (carrot)
  - enemy.png: enemy sprite (ghost lookin things)
  - trap.png: Trap sprite (bear trap)
  - gate.png: Gate sprite (tile to escape)
  - wall.png: Wall sprite (brick wall)
  - tnt.png: TNT sprite (tnt that gets placed)
- thumbnail.png: Game thumbnail / favicon (200x200px)

6. Implementation Notes:
The game uses a class-based architecture with the following main components:
- Game: main game, holds level/tile data, player, enemies, etc.
- Player: Blaster movement and TNT placement
- Enemy: Enemy behavior and movement

Combat Mechanics:
  - PLace TNT strategically using spacebar
  - Lure enemies into TNT traps
  - Time your TNT placement carefully (you only have 5!!)
  - Use maze layout for tactical advantage

This project shows understanding of:
- JavaScript programming practices such as classes and events/event listeners
- HTML structure and elements
- CSS styling and making site visually appealing
- Object-oriented programming (use of classes)
- Collision detection and user interaction logic (similar to what we made in the first few labs using JavaScript)