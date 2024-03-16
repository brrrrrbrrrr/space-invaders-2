import { Drawable } from "./Drawable.js";

class Invaders extends Drawable {
  
  constructor(x, y, directionX, directionY, ) {
    super(x, y,directionX, directionY,"./assets/images/invader1.png");
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 20;
 
  }

  // getImg() {
  //   return super.getImg;
  // }
  
}

export { Invaders };
