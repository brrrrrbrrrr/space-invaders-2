import { Player } from './Player.js';
import { Invaders } from './Invaders.js';
import { collision } from './Collision.js';
import { Projectile } from './Projectile.js';
import { InvaderProjectile } from './InvaderProjectile.js';

class GameEngine {
  canvas = null;
  ctx = null;
  items = [];
  player = null;
  hasCollision = false;
  projectiles = [];
  level = null;
  lastFrameTime = null;
  fpsInterval = null;
  invadersOnEarth = null;
  button = document.getElementById('startBtn');
  projectileSpeed = null;
  invaderProjectiles = [];
  //Liste de projectiles des invaders
  intervalId = null;

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

  constructor() {
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.invader = new Invaders();
    this.player = new Player();
    this.player.x = this.canvas.width / 2 - this.player.width / 2;
    this.player.y = this.canvas.height - this.player.height;
    this.level = 1;
    this.lastFrameTime = performance.now();
    this.fpsInterval = 1000 / 100; //

    this.invadersOnEarth = false;
    this.projectileSpeed = 10;
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

    this.generateInvadersProjectiles();
  }

  generateInvaders() {
    let count = 5;
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
      // vérifier s'l y a collision par défaut collision=false
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
          invader.y = this.canvas.height - invader.height;
          this.invadersSpeed = 0;
          this.gameOver('La Terre a été envahie !!!');
        }
        // va permettre la collision de chaque élément du tableau
        if (collision(this.player, invader)) {
          if (this.player.lives > 1) {
            invader.hasCollision = true;
            this.hasCollision = true;
            this.player.lives--;
          } else {
            this.hasCollision = true;
            this.player.lives = 0;
            this.gameOver("Tu t'es fait eclaté par un vaisseau !!!");
          }
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

    // Check for collision with player
    if (collision(this.player, projectile)) {
      projectile.hasCollision = true;
      this.hasCollision = true;
    }
  };

  // generateInvadersProjectiles = () => {
  // this.intervalId = setInterval(() => {
  //     for (let invader of this.items) {
  //       const invaderProjectile = new InvaderProjectile(
  //         invader.x,
  //         invader.y,
  //         5,
  //         -100,
  //         invader.getImg().width / 2
  //       );

  //       console.log(invaderProjectile, 'invaderProjectile');

  //       this.invaderProjectiles.push(invaderProjectile);
  //     }
  //   }, 1000);
  // };

  generateInvadersProjectiles = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      const selectInvaders = Math.floor(Math.random() * this.items.length);
      const invaderProjectile = new InvaderProjectile(
        this.items[selectInvaders].x,
        this.items[selectInvaders].y,
        5,
        -100,
        this.items[selectInvaders].getImg().width / 2
      );
      this.invaderProjectiles.push(invaderProjectile);
    }, 1000);
  };

  //*******************************DESTRUCTION PLAYER ET INVADERS ***************************************//
  destroyPlayer() {
    for (let i = 0; i < this.invaderProjectiles.length; i++) {
      const invaderProjectile = this.invaderProjectiles[i];
      if (collision(invaderProjectile, this.player)) {
        if (this.player.lives > 1) {
          invaderProjectile.hasCollision = true;
          this.invaderProjectiles.splice(i, 1);
          this.player.lives--;
          return true;
        } else {
          this.player.lives = 0;
          this.gameOver("Tu n'as plus de vies !");
        }
      }
    }
    return false;
  }

  destroyInvaders() {
    for (let i = 0; i < this.projectiles.length; i++) {
      const playerProjectile = this.projectiles[i];
      for (let j = 0; j < this.items.length; j++) {
        if (collision(playerProjectile, this.items[j])) {
          playerProjectile.hasCollision = true;

          this.projectiles.splice(i, 1);
          this.items.splice(j, 1);
          return true;
        }
      }
    }
    return false;
  }
  //*************************************************************************************//
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

    this.invaderProjectiles = this.invaderProjectiles.filter(
      (invaderProjectile) =>
        invaderProjectile.y + invaderProjectile.getImg().height > 0
    );
    for (let invaderProjectile of this.invaderProjectiles) {
      invaderProjectile.y += 3;
    }

    // if (this.collisionItem()) {
    //     this.player.x = prevX
    //     this.player.y = prevY
    // }

    this.destroyPlayer();
    this.destroyInvaders();
    this.collisionBorder();
    if (this.moveInvaders()) {
      this.player.x = prevX;
      this.player.y = prevY;
    }
    // if (this.invadersOnEarth || this.items.length === 0) {
    //   this.resetGame();
    // }
    if (this.invadersOnEarth) {
      this.gameOver('Les envahisseurs ont atteint la terre');
    }
    if (this.items.length === 0) {
      this.nextLevel();
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
    this.ctx.drawImage(
      this.player.getImg(),
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );
    this.drawNewProjectile();
    this.drawInvaderProjectile();
    this.drawLives();
  }

  drawNewProjectile() {
    this.projectiles.forEach((projectile) => {
      this.ctx.drawImage(
        projectile.getImg(),
        projectile.x,
        projectile.y,
        projectile.width,
        projectile.height
      );
    });
  }

  drawInvaderProjectile() {
    this.invaderProjectiles.forEach((invaderProjectile) => {
      this.ctx.drawImage(
        invaderProjectile.getImg(),
        invaderProjectile.x,
        invaderProjectile.y,
        invaderProjectile.width,
        invaderProjectile.height
      );
    });
    //   this.ctx.drawImage(this.player.getImg(), this.player.x, this.player.y);
  }

  drawLives() {
    const lives = document.getElementById('lives');
    lives.innerText = `Vies: ${this.player.lives}`;
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
    this.resetConfig();
    this.init();
    this.gameLoop();
  }

  //Création d'une fonction nextLevel qui aura le comportement suivant si elle est call
  nextLevel() {
    this.projectiles = [];
    this.invaderProjectiles = [];
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
    this.player.lives = 3;
  }

  resetConfig() {
    this.player.lives = 3;
    this.speed = 5;
    this.items = [];
    this.invadersSpeed = 1;
    this.projectiles = [];
    this.invaderProjectiles = [];
    this.hasCollision = false;
  }

  gameOver(contentMenu) {
    document.getElementById('titleMenu').innerText = 'GAME OVER';
    document.getElementById('contentMenu').innerText = contentMenu;
    document.getElementById('startBtn').innerText = 'Restart the Game';
    document.getElementById('menu').style = 'display: flex';
  }
}

export { GameEngine };
