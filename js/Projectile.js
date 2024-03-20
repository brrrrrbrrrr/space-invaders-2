import { Drawable } from './Drawable.js';

class Projectile extends Drawable {
  img = null;
  constructor(x, y, player) {
    super(x, y, null, null, './assets/images/laser-blue.png');
    this.countFrame = 0;
    this.player = player;
    this.img = super.getImg();
  }

  projectileX() {
    return this.player.x + this.player.getImg().width / 2 - this.img.width / 2;
  }
  projectileY() {
    return this.player.y;
  }
}

export { Projectile };
