import { Drawable } from './Drawable.js';

class Projectile extends Drawable {
  constructor(x, y) {
    super('./assets/images/laser-blue.png', x, y);
    this.velocity = -5;

    console.log(this.img.src);
  }
}

export { Projectile };
