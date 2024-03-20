import { Drawable } from './Drawable.js';

class Projectile extends Drawable {
  constructor(x, y) {
    super(x, y, null, null, './assets/images/laser-blue.png');
    this.countFrame = 0;
    this.height= 50;
    this.width= 30;
  }
}

export { Projectile };
