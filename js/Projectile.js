import { Drawable } from './Drawable.js';

class Projectile extends Drawable {
  constructor(x, y) {
    super('./assets/images/laser-blue.png', x, y);
    this.countFrame = 0;
  }
}

export { Projectile };
