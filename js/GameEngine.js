import { Player } from './Player.js';
import { Invaders } from './Invaders.js';
import { collision } from './Collision.js';
import { Projectile } from './Projectile.js';

class GameEngine {
  canvas = null;
  ctx = null;
  items = [];
  player = null;
  invader = null;
  hasCollision = false;
  projectiles = [];
  level = null;
  lastFrameTime = null;
  fpsInterval = null;
  invadersOnEarth = null;
  button = document.getElementById('startBtn');
  projectileSpeed = null;

  keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    p: false,
  };

  speed = null;
  invadersSpeed = null;
  velocity = -10;

  constructor() {
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.invader = new Invaders();
    this.player = new Player();
    this.player.x = this.canvas.width / 2 - this.player.getImg().width / 2;
    this.player.y = this.canvas.height - this.player.getImg().height;
    this.level = 1;
    this.lastFrameTime = performance.now();
    this.fpsInterval = 1000 / 100; //
    this.invadersSpeed = 6;
    this.invadersOnEarth = false;
    this.projectileSpeed = 1;
    this.speed = 5;
  }

  init() {
    if (this.button.textContent === 'Niveau suivant') {
      this.nextLevelConfig();
    }

    this.invadersOnEarth = false;
    this.currentLevel = true;
    this.initEvent();
    this.generateInvaders();
  }

  generateInvaders() {
    let count = 20;
    let invaderHeight = this.invader.height;
    let espacement = invaderHeight * 2;

    for (let i = 0; i < count; i++) {
      let newInvader = new Invaders(
        Math.random() * (this.canvas.width - this.invader.width),
        -50 - i * espacement,
        Math.random() < 0.5 ? -1 : 1,
        0.5
      );
      this.items.push(newInvader);
    }
  }

  moveInvaders() {
    for (let invader of this.items) {
      // vérif si il y a collision par défaut collision=false
      if (!invader.hasCollision) {
        // permet d'établir la vitesse de déplacement horizontale
        invader.x += invader.directionX * this.invadersSpeed;
        // permet d'établir la vitesse de descente verticale
        invader.y += (invader.directionY * this.invadersSpeed) / 3;
        // vérif si les bords sont touchés si oui la direction du déplacement est inversée avec *-1
        if (invader.x <= 0 || invader.x + invader.width >= this.canvas.width) {
          invader.directionX *= -1;
        }
        if (invader.y + invader.height > this.canvas.height) {
          // invader.y = this.canvas.height - invader.height;
          this.invadersOnEarth = true;
        }
        // va permettre la collision de chaque élément du tableau
        if (collision(this.player, invader)) {
          invader.hasCollision = true;
          this.hasCollision = true;
        }
      }
    }
  }

  initEvent() {
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          this.keys.left = true;
          break;
        case 'ArrowRight':
          this.keys.right = true;
          break;
        case ' ':
          this.keys.space = true;
          break;
        //Ajout d'une touche pour supprimer tous les invaders, pour tester le niveau suivant
        case 'p':
          this.keys.p = true;
          break;
      }
    });

    window.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          this.keys.left = false;
          break;
        case 'ArrowRight':
          this.keys.right = false;
          break;
        case ' ':
          this.keys.space = false;
          this.newProjectile();
          break;
        //Ajout d'une touche pour supprimer tous les invaders, pour tester le niveau suivant
        case 'p':
          this.keys.p = false;
          break;
      }
    });
  }

  newProjectile = () => {
    const projectile = new Projectile(null, null, this.player);

    // Pour chaque projectiles, on initialise correctement les valeurs pour que le point de depart soit le milieu du vaisseau
    projectile.x = projectile.projectileX();
    projectile.y = projectile.projectileY();
    this.projectiles.push(projectile);
  };

  update() {
    let prevX = this.player.x;
    let prevY = this.player.y;

    if (this.keys.left) {
      this.player.x -= this.speed;
    }
    if (this.keys.right) {
      this.player.x += this.speed;
    }

    this.projectiles = this.projectiles.filter(
      (projectile) => projectile.y + projectile.getImg().height > 0
    );
    for (let projectile of this.projectiles) {
      projectile.y -= this.projectileSpeed;
    }
    if (this.keys.p) {
      this.items = [];
    }

    // if (this.collisionItem()) {
    //     this.player.x = prevX
    //     this.player.y = prevY
    // }

    this.collisionBorder();
    if (this.moveInvaders()) {
      this.player.x = prevX;
      this.player.y = prevY;
    }
    if (this.invadersOnEarth || this.items.length === 0) {
      this.resetGame();
    }
  }

  collisionBorder() {
    if (this.player.x < 0) {
      this.player.x = 0;
    }
    if (this.player.y < 0) {
      this.player.y = 0;
    }
    if (this.player.x + this.player.width > this.canvas.width) {
      this.player.x = this.canvas.width - this.player.width;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let item of this.items) {
      this.ctx.drawImage(
        item.getImg(),
        item.x,
        item.y,
        item.width,
        item.height
      );
    }

    this.drawNewProjectile();
  }

  drawNewProjectile() {
    this.projectiles.forEach((projectile) => {
      this.ctx.drawImage(projectile.getImg(), projectile.x, projectile.y);
    });
    this.ctx.drawImage(this.player.getImg(), this.player.x, this.player.y);
  }

  gameLoop() {
    const currentTime = performance.now(); // Le temps maintenant
    const elapsed = currentTime - this.lastFrameTime; // Le temps ecoulé

    if (elapsed > this.fpsInterval) {
      // Mettre à jour le dernier temps de frame pour le prochain cycle
      this.lastFrameTime = currentTime - (elapsed % this.fpsInterval);
      this.update();
      this.draw();
    }

    window.requestAnimationFrame(() => {
      this.gameLoop();
    });
  }

  run() {
    this.init();
    this.gameLoop();
  }

  //Création d'une fonction nextLevel qui aura le comportement suivant si elle est call
  nextLevel() {
    this.projectiles = [];
    document.getElementById('titleMenu').innerText = 'BRAVO';
    document.getElementById('contentMenu').innerText =
      'Vous avez tué tous les envahisseurs !!!';
    document.getElementById('startBtn').innerText = 'Niveau suivant';
    document.getElementById('menu').style = 'display: flex';
  }

  //Configuration des modifications a ajouter pour le niveau suivant
  nextLevelConfig() {
    this.invadersSpeed += this.invadersSpeed;
    this.level++;
    this.projectileSpeed++;
    this.speed += this.speed;
  }

  resetGame() {
    if (this.invadersOnEarth) {
      this.gameOver();
    } else {
      this.nextLevel();
    }
  }

  gameOver() {
    this.items = [];
    this.invadersSpeed = 6;
    this.projectiles = [];
    document.getElementById('titleMenu').innerText = 'GAME OVER';
    document.getElementById('contentMenu').innerText =
      'La Terre a été envahie !!!';
    document.getElementById('startBtn').innerText = 'Restart the Game';

    document.getElementById('menu').style = 'display: flex';
  }
}

export { GameEngine };
