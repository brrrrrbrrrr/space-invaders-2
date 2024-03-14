// import { Drawable } from "./Drawable.js";
import { Player } from "./Player.js";
import { Invaders } from "./Invaders.js";

class GameEngine {
  canvas = null;
  ctx = null;
  items = [];
  player = null;
  invader = [];

  keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
  };

  speed = 5;

  constructor() {
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.player = new Player(this.canvas.width / 2.5, this.canvas.height);
    this.invader = new Invaders();
    //  this.Player = new Drawable('asset/police_car.png',  300, 500)
  }

  init() {
    this.initEvent();
    this.generateInvaders();
    // this.items = [
    //     new Invaders( 200, 200),
    //     new Invaders( 100, 500),
    //     new Invaders( 240, 250),
    //     new Invaders( 300, 200),
    //     new Invaders( 280, 200),
    // ]
  }

  generateInvaders() {
    let count = 10;
    for (let i = 0; i < count; i++) {
      console.log(
        // Math.floor(Math.random() * (this.canvas.width - this.invader.width)),
        // "RANDOM"
        typeof this.invader.width
      );
      let newInvader = new Invaders(
        Math.floor(Math.random() * (this.canvas.width - this.invader.width)),
        Math.floor(Math.random() * (this.canvas.height - this.invader.height))
      );
      this.items.push(newInvader);
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
        // case ' ':
        //     break;
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
        // case ' ':
        //     break;
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

    // if (this.collisionItem()) {
    //     this.player.x = prevX
    //     this.player.y = prevY
    // }

    this.collisionBorder();
  }

  // collisionItem() {
  //     for (let item of this.items)
  //     {
  //         if (
  //             this.player.x < item.getImg().width + item.x
  //             && this.player.x + this.player.getImg().width > item.x
  //             && this.player.y < item.getImg().height + item.y
  //             && this.player.y + this.player.getImg().height > item.y
  //         ) {
  //             return true
  //         }
  //     }
  //     return false
  // }

  collisionBorder() {
    if (this.player.x < 0) {
      this.player.x = 0;
    }
    if (this.player.y < 0) {
      this.player.y = 0;
    }
    if (this.player.x + this.player.img.width > this.canvas.width) {
      this.player.x = this.canvas.width - this.player.img.width;
    }
    if (this.player.y + this.player.img.height > this.canvas.height) {
      this.player.y = this.canvas.height - this.player.img.height;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let item of this.items) {
      this.ctx.drawImage(item.getImg(), item.x, item.y, item.width, item.height);
    //   this.ctx.drawImage(this.invader.getImg(), this.invader.x, this.invader.y, this.invader.width, this.invader.height);

    }
    this.ctx.drawImage(this.player.getImg(), this.player.x, this.player.y);
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
    let count = 0;
    for (let item of this.items) {
      item.loaded(() => {
        console.log(item);
        if (++count === this.items.length) {
          this.gameLoop();
        }
      });
    }
    this.player.loaded(() => {
      this.gameLoop();
    });
    // this.invader.loaded(() => {
    //   this.gameLoop();
    //  })
  }
}

export { GameEngine };
