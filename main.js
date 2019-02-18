import enemyClass from './eClass.js';
import Bullet from './bClass.js';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;
const cw = canvas.width;
const ch = canvas.height;
const leftCanvas = canvas.offsetLeft;
let gunClass = {
  w: 40,
  h: 40,
  visible: true,
  playerX: 0,
}
canvas.addEventListener("mousemove", playerPosition);
let gameStart = false;
let instervalGame;
let score = 0;
let bigCout = Math.floor((Math.random() * 21) + 1);
console.log(bigCout);
let bullets = [];
bullets.length = 5;
let enemy = [];
enemy.length = 5;
for (let i = 0; i < bullets.length; i++) {
  bullets[i] = new Bullet(0, ch - 80, 30, 30, 10);
}
for (let i = 0; i < enemy.length; i++) {
  enemy[i] = new enemyClass();
}
//big guy
enemy[enemy.length-1].setType(2);
enemy[enemy.length-1].setLife(10);
enemy[enemy.length-1].setSpeed(1);
// for (let i = 0; i < enemyBig.length; i++) {
//   enemyBig[i] = new enemyClass(0, 20,100,100, 2,10);
// }
let gameidx = 0;
/*
@makotek keydown eventListener na document i w callbacku event.key === "Enter"
*/


function startScreen() {
  console.log("startScreen");
  gameStart = false;
  /*start screen*/
  for (let i = 0; i < enemy.length; i++) {
    console.log("speed=" + enemy[i].speed);
    enemy[i].visible = false;
  }
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].visible = false;
  }

  gunClass.visible = false;
  ctx.clearRect(0, 0, cw, ch);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cw, ch);
  ctx.fillStyle = "green";
  ctx.fillRect(0, ch - 20, cw, ch);
  ctx.fillStyle = "red";
  ctx.fillRect(cw / 2 - 20, ch - 60, gunClass.w, gunClass.h);
  ctx.font = "50px Helvetica";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Hello", cw / 2, ch / 2);
  ctx.font = "25px Helvetica";
  ctx.fillText("click enter to begin", cw / 2, ch / 2 + 30);
  scoreFunction()

  $(document).keypress(function (e) {
    if (e.which == 13 || event.keyCode == 13) {
      console.log("KEY PRESSED");
      gameStart = true;
      canvas.onclick = () => {
        if (!gameStart) return;
        for (let i = 0; i < bullets.length; i++) {
          if (bullets[i].visible == false) {
            bullets[i].visible = true;
            bullets[i].x = gunClass.playerX + (gunClass.w - bullets[i].w) / 2;
            break;
          }
        }
      }
      gunClass.visible = true;
    }
  });
}
window.onload = () => {
  startScreen()
  instervalGame = setInterval(game, 1000 / 60);
}



function table() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cw, ch);

}

function gun() {
  if (gunClass.visible == true) {
    ctx.fillStyle = "red";
    ctx.fillRect(gunClass.playerX, ch - 60, gunClass.w, gunClass.h);
  }
}

function ground() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, ch - 20, cw, ch);
}

function playerPosition(e) {
  gunClass.playerX = e.clientX - leftCanvas - gunClass.w / 2;
}

function strzal() {

  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].y <= 0) {
      bullets[i].visible = false;
      bullets[i].y = ch - 80;
      continue;
    }
    if (bullets[i].visible == true) {
      ctx.drawImage(bullets[i].img, bullets[i].x, bullets[i].y, bullets[i].w, bullets[i].h);
      for (let x = 0; x < enemy.length; x++) {        
        if (!enemy[x].visible) continue;
        //else if ((enemy[x].y >= bullets[i].y) && ((enemy[x].x >= bullets[i].x - (enemy[x].x+bullets[i].x)/2) && (enemy[x].x <= bullets[i].x + (enemy[x].x+bullets[i].x)/2))) {
        if ((enemy[x].y + enemy[x].h >= bullets[i].y) &&
          (
            ((bullets[i].x >= enemy[x].x) && (bullets[i].x <= enemy[x].x + enemy[x].w)) ||
            ((bullets[i].x + bullets[i].w <= enemy[x].x + enemy[x].w) && (bullets[i].x + bullets[i].w >= enemy[x].x))
          )) {
            if(enemy[x].enemyType==1){
              ++score;
              bullets[i].visible = false;
              enemy[x].visible = false;
              bullets[i].y = ch - 80;
            }else if(enemy[x].enemyType==2){
              if(enemy[x].life<=0){
                ++score;
                enemy[x].setLife(10);
                bullets[i].visible = false;
                enemy[x].visible = false;
                bullets[i].y = ch - 80;
              }else{
                enemy[x].decreaseLife();
                bullets[i].visible = false;
                bullets[i].y = ch - 80;
              }
            }
        }
      }
      bullets[i].speedUp();
    }
  }
}

function meteoAnimate() {
  for (let i = 0; i < enemy.length; i++) {
    if (enemy[i].visible == true) {
      ctx.drawImage(enemy[i].img, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
      if (enemy[i].y+enemy[i].h >= ch - 20) {
        score = 0;
        startScreen();
      } else {
        console.log("speedUp");
        enemy[i].speedUp();
      }
    }
  }
}

function scoreFunction() {
  ctx.fillStyle = "white";
  ctx.font = "30px Helvetica";
  ctx.fillText(score, cw - 40, 0 + 80);
}

function game() {
  if (!gameStart) return;

  gameidx++;
  if ((gameidx % 15) == 0) {
    console.log("cout=" + bigCout);
    bigCout--;
    if (bigCout <= 0) {
      bigCout = Math.floor((Math.random() * 100) + 1);
      for (let i = 0; i < enemy.length; i++) {
        if ((enemy[i].visible == false) && (enemy[i].enemyType == 2)) {
          console.log("GENERUJE");
          enemy[i].setPosition(Math.floor(Math.random() * (450 - 50)), 20);
          enemy[i].visible = true;
        }
      }
    }
    for (let i = 0; i < enemy.length; i++) {
      if ((enemy[i].visible == false) && (enemy[i].enemyType == 1)) {
        enemy[i].setPosition(Math.floor(Math.random() * (450 - 50)), 20);
        enemy[i].visible = true;
        console.log(enemy[i].x);
        break;
      }
    }
  }

  
  table()
  ground()
  strzal()
  scoreFunction()
  
  meteoAnimate()
  gun()
  
}
