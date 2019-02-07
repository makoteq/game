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
  setX(x) {
    this.x=x;
  }
}


/*Pobranie elementu canvas*/
const canvas = document.querySelector("canvas");
/*przypisanie kontekstu graficznego - nowe właściwości i metody do których odwałamy sie za pomocą obiektu ctx*/
const ctx = canvas.getContext("2d");
/*nadajemy canvas wysokość i szerokosć (domyślnie 300 x 150)*/
canvas.width = 500;
canvas.height = 600;

/*wysokosć i szerokość przypisujemy do zmiennych - będzie nam łatwiej się do nich odowływać*/
const cw = canvas.width;
const ch = canvas.height;
const gunW = 40;
const gunH = 40;

var bullets=[0,0,0];
for(i=0; i<bullets.length; i++){
  bullets[i]= new Bullet(0, ch-80, 10);    
}


let playerX = 0;

const leftCanvas = canvas.offsetLeft;
canvas.addEventListener("mousemove", playerPosition);
canvas.onclick = function () {
  
  for(i=0; i<bullets.length; i++) {
    if (bullets[i].visible == false) {
      bullets[i].visible = true;
      bullets[i].x = playerX+5;
      console.log("click:"+i);
      break;
    }
  }
  // if (koniec_strzalu == 1) {
  //   koniec_strzalu = 0;
  //   ball.ballX = playerX+5;
  // }
};

function table() {
  ctx.fillStyle = "black"; //ten kolor będzie aktywny dopóki nie zostaniue nadpisany kolejnym ctx.fillStyle
  ctx.fillRect(0, 0, cw, ch);
  //Metoda fillRect wymaga podania 4 argumentów. Pierwsze dwa to parametry startowe na osi x i y. drugie dwa to szerokość (oś x) i wysokosć (oś y). Lewy górny róg to parmetry (0,0) a szerokosć w tym wypadku ma 1000px (taką wartość ma zmienna cw) i wysokość 500 px (taką wartość ma zmienna ch)
}

function gun() {
  ctx.fillStyle = "red";
  ctx.fillRect(playerX, ch - 60, gunW, gunH);
}

function ground() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, ch - 20, cw, ch);
}

function playerPosition(e) {
  //console.log("pozycja myszy to: " + (e.clientX - leftCanvas));
  playerX = e.clientX - leftCanvas - gunW / 2; //żeby była myszka na środku
  //gdy próbuje wyjachać rakietka na dole poza canvas
}

function strzal() {
  //console.log("x:" + koniec_strzalu);

  //console.log(bullets[0]);
  //console.log(bullets[1]);
 // console.log(bullets[2]);
  for(i=0; i<bullets.length; i++) {
    if (bullets[i].visible==true) {
      ctx.fillStyle = "white";
      ctx.drawImage(bullets[i].img, bullets[i].x, bullets[i].y, 30, 30);
      if (bullets[i].y <= 0) {
        bullets[i].visible = false;
        bullets[i].y = ch - 80;
      }
      bullets[i].speedUp();
    }
  }
}

/* wywołujemy funkcję game, która wywołuje wszystkie inne funkcje */
function game() {
  table();
  ground();
  gun();
  strzal();
}

//funkcja setInterval przyjmuje dwa argumenty. Funkcję, którą ma wywołać oraz czas co jaki ma nastąpić wywołanie. Wyrażenie 1000/60 (czyli 60 razy na sekundę) daje 16.666 milisekund i co tyle zostanie wywołana funkcja game, która wywoła wszystkie inne funkcje.
setInterval(game, 1000 / 60);
