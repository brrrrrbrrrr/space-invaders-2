// import { Drawable } from "./Drawable.js";
import { Player } from './Player.js';
import { Projectile } from './Projectile.js';

class GameEngine {
  canvas = null;
  ctx = null;
  items = [];
  player = null;
  projectiles = [];


  keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
  };

  speed = 5;
  velocity = -10;

  constructor() {
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.player = new Player(this.canvas.width / 2.5, this.canvas.height);
    this.projectile = new Projectile(this.player.x, this.player.y - this.player.img.width);

    // this.rateOfFire = 5;
    // this.shootCoolDown = 0;
  }

  init() {
    this.initEvent();

    // this.items = [
    //     new Player( 200, 200),
    // ]
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
          break;
      }
    });
  }

  // timeCycle() {
  //     if (this.keys.space === true) {
  //         if(this.shootCoolDown === 0){
  //             this.shootCoolDown = this.rateOfFire;
  //             this.projectiles.push(new Projectile(this.player.x, this.player.y));
  //         }
  //     }
  //     if (this.shootCoolDown > 0){
  //         this.shootCoolDown --;
  //     }
  // }

  update() {
      let prevX = this.player.x;
      let prevY = this.player.y;

      if (this.keys.left) {
          this.player.x -= this.speed;
      }
      if (this.keys.right) {
          this.player.x += this.speed;
      }
      if (this.keys.space) {
          // setInterval(() => this.timeCycle(), 50);
          this.projectiles.push(new Projectile(this.projectile.x, this.projectile.y += this.velocity));
          if (this.keys.left || this.keys.right) {

          }
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
    for (let projectile of this.projectiles) {
      this.ctx.drawImage(projectile.getImg(), projectile.x, projectile.y);
    }
    this.ctx.drawImage(this.player.getImg(), this.player.x, this.player.y);
    // this.ctx.drawImage(
    //   this.projectile.getImg(),
    //   this.projectile.x,
    //   this.projectile.y
    // );
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
    // let count = 0;
      for (let projectile of this.projectiles)
      {
          projectile.loaded(() => {
             this.gameLoop()
          })
      }

    // this.projectile.loaded(() => {
    //   this.gameLoop();
    // });
    this.player.loaded(() => {
      this.gameLoop();
    });
  }
}

export { GameEngine };
