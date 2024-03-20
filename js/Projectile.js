import { Drawable } from './Drawable.js';

class Projectile extends Drawable {
  img = null;
  constructor(x, y, player) {
    super(x, y, null, null, './assets/images/laser-blue.png');
    this.countFrame = 0;
    this.player = player;
    this.img = super.getImg();
    this.height = 50;
    this.width = 30;
  }

  projectileX() {
    return this.player.x + this.player.width / 2 - this.width / 2;
  }
  projectileY() {
    return this.player.y;
  }
}

export { Projectile };
