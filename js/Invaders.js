class Invaders {
    img = null;
    x = 0;
    y = 0;
    directionX = 0;
    directionY = 0;
  
    constructor(x, y, directionX, directionY) {
      this.img = new Image();
      this.img.src = "./assets/images/invader1.png";
      this.x = x;
      this.y = y;
      this.width = 40;
      this.height = 20;
      this.directionX = directionX;
      this.directionY = directionY;
      this.countFrame = 0;
    }
  
    getImg() {
      return this.img;
    }
    
  
    loaded(callback) {
      this.img.onload = () => {
        callback();
      };
    }
  }
  
  export { Invaders };
  