 class enemyClass { 

        constructor() {
          this.visible = false;
          this.img = new Image();
          this.setPosition(0,50);
          this.setSpeed(2);              
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
          this.enable=true;
          this.w=50;
          this.h=50;
          this.img.src = "img/Asteroid.png";          
          this.life=1;
          this.speed =3;
          this.how=15
            break;
          case 2: // zmodyfikowany pocisk
            this.enable=true;
            this.how=15;
            this.cout= Math.floor((Math.random() * 100) + 1);
            this.w=140;
            this.h=140;
            this.img.src = "img/Asteroid_big.png";     
            this.life=10;     
            this.speed=2;
            break;
          }
        }

        speedUp() {
          this.y += this.speed;
        }
        randomCout(){
          this.cout= Math.floor((Math.random() * 100) + 1);
        }
        decreaseLife(){
          this.life-=1;
        }
        decraseCout(){
          this.cout-=1;
        }
      }
      
  export default enemyClass;