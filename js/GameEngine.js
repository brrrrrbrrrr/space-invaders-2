import { Player } from "./Player.js";
import { Invaders } from "./Invaders.js";
import { collision } from "./Collision.js";

class GameEngine {
  canvas = null;
  ctx = null;
  items = [];
  player = null;
  invader = null;
  hasCollision = false;

  keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
  };

  speed = 5;
  invadersSpeed = 6;

  constructor() {
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.player = new Player(this.canvas.width, this.canvas.height - 100);
    this.invader = new Invaders();
  }

  init() {
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
          invader.y = this.canvas.height - invader.height;
          this.invadersSpeed=0;
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
      }
    });
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
    document.getElementById('titleMenu').innerText = 'GAME OVER'
    document.getElementById('contentMenu').innerText = 'La Terre a été envahie !!!'
    document.getElementById('startBtn').innerText = 'Restart the Game'
  
    document.getElementById('menu').style = 'display: flex'
  }
}




export { GameEngine };
