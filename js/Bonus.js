import { Drawable } from './Drawable.js';

class Bonus extends Drawable {
  constructor(x, y) {
    super(x, y, null, null, 'assets/images/bonus.png');
    (this.width = 50), (this.height = 50);
    this.img = super.getImg();
  }
}

export { Bonus };
