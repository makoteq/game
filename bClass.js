  class Bullet {
        constructor(x, y,w,h ,speed) {
          this.w =w;
          this.h=h;
          this.x = x;
          this.y = y;
          this.speed = speed;
          this.visible = false;
          this.img = new Image();
          this.img.src = "img/Fireball.png";
        }
      
        speedUp() {
          this.y -= this.speed;
        }
      }
      export default  Bullet;
                                                                                                        