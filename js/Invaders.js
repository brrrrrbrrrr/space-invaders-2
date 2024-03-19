import { Drawable } from "./Drawable.js";
// import { collision } from "./Collision.js";

class Invaders extends Drawable {
  // hasCollision = false;
  // invadersSpeed = 3;
  // items = [];
  // invader = null;

  constructor(x, y, directionX, directionY) {
    super(x, y, directionX, directionY, "./assets/images/invader1.png");
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 20;
  }

  // getImg() {
  //   return super.getImg;
  // }
  // move(){

  // }

  // moveInvaders(canvasWidth) {
  //   for (let invader of this.items) {
  //     // vérif si il y a collision par défaut collision=false
  //     if (!invader.hasCollision) {
  //       // permet d'établir la vitesse de déplacement horizontale
  //       invader.x += invader.directionX * this.invadersSpeed;
  //       // permet d'établir la vitesse de descente verticale
  //       invader.y += (invader.directionY * this.invadersSpeed) / 3;
  //       // vérif si les bords sont touchés si oui la direction du déplacement est inversée avec *-1
  //       if (invader.x <= 0 || invader.x + invader.width >= canvasWidth) {
  //         invader.directionX *= -1;
  //       }
  //       // va permettre la collision de chaque élément du tableau
  //       if (collision(this.player, invader)) {
  //         invader.hasCollision = true;
  //         this.hasCollision = true;
  //       }
  //     }
  //   }
  // }
}

export { Invaders };
