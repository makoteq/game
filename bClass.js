  class Bullet {
        constructor(x, y, speed) {
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
                                                                                                        