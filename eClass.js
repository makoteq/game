 class enemyClass {
        constructor(x, y, speed) {
          this.x = x;
          this.y = y;
          this.speed = speed;
          this.visible = false;
          this.img = new Image();
          this.img.src = "img/Asteroid.png";
        }
      
        speedUp() {
          this.y += this.speed;
        }
        setX(x) {
          this.x=x;
        }
      }
  export default enemyClass;