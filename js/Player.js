// import { GameEngine } from "./GameEngine";

class Player {
  img = null;
  x = 0;
  y = 0;

  constructor(x = 0, y = 0) {
    this.img = new Image();
    this.img.src = './assets/images/space-ship.png';
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.countFrame = 0;
    this.lives = 3;
  }

  getImg() {
    return this.img;
  }

  loaded(callback) {
    this.img.onload = () => {
      callback();
    };
  }
}

export { Player };
