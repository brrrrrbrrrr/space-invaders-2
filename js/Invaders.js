class Invaders {
    img = null;
    x = 0;
    y = 0;
  
    constructor(x, y) {
      this.img = new Image();
      this.img.src = "./assets/images/invader1.png";
      this.x = x;
      this.y = y;
      this.width= 100;
      this.height= 100;
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
  