 class enemyClass { 

        constructor() {
          this.visible = false;
          this.img = new Image();
          this.setPosition(0,50);
          this.setSpeed(2);
          this.setType(1) ;                
        }

        setPosition (x,y) {
          this.x = x;
          this.y = y;
        }

        setSpeed (speed) {
          this.speed=speed;
        }

        setLife (life) {
          this.life=life;
        }

        setType (type) {
          this.enemyType = type;
          switch (this.enemyType) {
          case 1: // klasyczny pocisk
            this.w=50;
            this.h=50;
            this.img.src = "img/Asteroid.png";          
            break;
          case 2: // zmodyfikowany pocisk
            this.w=100;
            this.h=100;
            this.img.src = "img/Asteroid.png";          
            break;
          }
        }

        speedUp() {
          this.y += this.speed;
        }
        decreaseLife(){
          this.life-=1;
        }
      }
      
  export default enemyClass;