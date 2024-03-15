class Player {
  img = null;
  x = 0;
  y = 0;

  constructor(x = 0, y = 0) {
    this.img = new Image();
    this.img.src = './assets/images/space-ship.png';
    this.x = x;
    this.y = y;
    this.countFrame = 0;
  }

  getImg() {
    return this.img;
    // if (++this.countFrame === 20) {
    //     this.isRed = !this.isRed
    //     this.countFrame = 0
    // }
    // return this.isRed ? this.img1 : this.img2
  }

  loaded(callback) {
    this.img.onload = () => {
      callback();
    };
  }
}

export { Player };
