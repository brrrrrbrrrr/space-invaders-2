import { Drawable } from './Drawable.js';
// import { collision } from "./Collision.js";

class Invaders extends Drawable {
  // hasCollision = false;
  // invadersSpeed = 3;
  // items = [];
  // invader = null;

  constructor(x, y, directionX, directionY, isBonus) {
    super(x, y, directionX, directionY, './assets/images/invader1.png');
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 20;
    this.isBonus = isBonus;
  }
}

export { Invaders };
