import { Drawable } from './Drawable.js';

class InvaderProjectile extends Drawable {
  constructor(x, y, directionX,directionY) {
    super(x, y,directionX,directionY, '../assets/images/laser.png');
    this.countFrame = 0;
    this.speed = 5;
    this.height= 50;
    this.width= 30;
  }

}

export { InvaderProjectile };
