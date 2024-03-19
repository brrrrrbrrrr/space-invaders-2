class Drawable {
    images = [];
    x = 0;
    y = 0;
    directionX = 0;
    directionY = 0;
  
    constructor(x, y, directionX, directionY, ...sources) {
      this.images = sources.map((src) => {
        const image = new Image();
        image.src = src;
        return image;
      });
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.index = 0;
    }
  
    getImg() {
      return this.images[this.index];
    }
  
    loaded(callback) {
      let count = 0;
      for (let image of this.images) {
       
        image.onload = () => {
          if (++count === this.images.length) {
            callback();
          }
        };
      }
    }
  }
  
  export { Drawable };
  
