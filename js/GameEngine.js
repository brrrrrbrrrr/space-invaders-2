import { Player } from "./Player.js";
import { Invaders } from "./Invaders.js";
import { collision } from "./Collision.js";
import { Projectile } from "./Projectile.js";
import { InvaderProjectile } from "./InvaderProjectile.js";

class GameEngine {
  canvas = null;
  ctx = null;
  items = [];
  player = null;
  hasCollision = false;
  projectiles = [];
  invaderProjectiles = [];
  //Liste de projectiles des invaders
  intervalId = null;

  keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
  };

  speed = 5;
  invadersSpeed = 3;
  velocity = -10;

  constructor() {
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.invader = new Invaders();
    this.player = new Player();
    this.player.x = this.canvas.width / 2 - this.player.width / 2;
    this.player.y = this.canvas.height - this.player.height;
  }

  init() {
    this.initEvent();
    this.generateInvaders();
    this.generateInvadersProjectiles();
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
          invader.y = this.canvas.height - invader.height;
          this.invadersSpeed = 0;
          this.gameOver();
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
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.keys.left = true;
          break;
        case "ArrowRight":
          this.keys.right = true;
          break;
        case " ":
          this.keys.space = true;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.keys.left = false;
          break;
        case "ArrowRight":
          this.keys.right = false;
          break;
        case " ":
          this.keys.space = false;
          this.newProjectile();
          break;
      }
    });
  }

  newProjectile = () => {
    const projectile = new Projectile(null, null);
    // Pour chaque projectiles, on initialise correctement les valeurs pour que le point de depart soit le milieu du vaisseau
    projectile.x =
      this.player.x +
      this.player.width / 2 -
      projectile.width / 2;

    projectile.y = this.player.y;
    this.projectiles.push(projectile);
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
      console.log(selectInvaders, "selectInvaders");
    }, 1000);
  };

  destroyPlayer() {
    for (let i = 0; i < this.invaderProjectiles.length; i++) {
      const invaderProjectile = this.invaderProjectiles[i];
      if (collision(invaderProjectile, this.player)) {
        invaderProjectile.hasCollision = true;
        // console.log(invaderProjectile, "projectile")
        this.invaderProjectiles.splice(i, 1);
        return true;
      }
    }
    // Aucun joueur n'a été détruit
    return false;
  }

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
      projectile.y -= 5;
    }

    this.invaderProjectiles = this.invaderProjectiles.filter(
      (invaderProjectile) =>
        invaderProjectile.y + invaderProjectile.getImg().height > 0
    );
    for (let invaderProjectile of this.invaderProjectiles) {
      invaderProjectile.y += 9;
    }

    // if (this.collisionItem()) {
    //     this.player.x = prevX
    //     this.player.y = prevY
    // }

    this.destroyPlayer();

    this.collisionBorder();
    if (this.moveInvaders()) {
      this.player.x = prevX;
      this.player.y = prevY;
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

  gameLoop() {
    this.update();
    this.draw();
    window.requestAnimationFrame(() => {
      this.gameLoop();
    });
  }

  run() {
    this.init();
    this.gameLoop();
  }

  gameOver() {
    clearInterval(this.intervalId);
    document.getElementById("titleMenu").innerText = "GAME OVER";
    document.getElementById("contentMenu").innerText =
      "La Terre a été envahie !!!";
    document.getElementById("startBtn").innerText = "Restart the Game";

    document.getElementById("menu").style = "display: flex";
    /* let count = 0;
    for (let projectile of this.projectiles) {
      
      
      projectile.loaded(() => {
          this.gameLoop();
      });
    }*/

    // this.projectile.loaded(() => {
    //   this.gameLoop();
    // });
    this.player.loaded(() => {
      this.gameLoop();
    });
  }
}

export { GameEngine };
