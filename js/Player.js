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
    // this.gameEngine = new GameEngine();
  }

  getImg() {
    return this.img;
  }

  // decreaseLives(element) {
  //   if (this.lives > 0) {
  //     this.gameEngine.hasCollision = true;
  //     element.hasCollision = true;
  //     this.lives--;
  //   } else {
  //     this.gameEngine.gameOver(
  //         document.getElementById('contentMenu').innerText = "Tu n'as plus de vies !"
  //     )
  //     this.gameEngine.hasCollision = false;
  //     element.hasCollision = false;
  //   }
  // }

  loaded(callback) {
    this.img.onload = () => {
      callback();
    };
  }
}

export { Player };
