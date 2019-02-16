import enemyClass from './eClass.js';
import Bullet from './bClass.js';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;
const cw = canvas.width;
const ch = canvas.height;
const gunW = 40;
const gunH = 40;

let bullets = [];
bullets.length = 4;
let enemy = [];
enemy.length = 4;
for (let i = 0; i < bullets.length; i++) {
  bullets[i] = new Bullet(0, ch - 80, 10);
}
for (let i = 0; i < enemy.length; i++) {
  enemy[i] = new enemyClass(0, 0 + 20, 5);
}
/*
więc to bardziej naprawiają media query ustawione w emach
@makotek keydown eventListener na document i w callbacku event.key === "Enter"
*/

let playerX = 0;
const leftCanvas = canvas.offsetLeft;
window.onload =()=>{

  $(document).keypress(function (e) {
    if (e.which == 13 || event.keyCode == 13) {
      click()
      setInterval(meteo, 800);
      setInterval(game, 1000 / 60);
    }
  });
/*start screen*/
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cw, ch);
  ctx.fillStyle = "green";
  ctx.fillRect(0, ch - 20, cw, ch);
  ctx.fillStyle = "red";
  ctx.fillRect(cw/2-20, ch - 60, gunW, gunH);
  ctx.font = "50px Helvetica";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Hello", cw/2, ch/2);
  ctx.font = "25px Helvetica";
  ctx.fillText("click enter to start", cw/2, ch/2+30);
  
}
canvas.addEventListener("mousemove", playerPosition);
function click(){
canvas.onclick = ()=> {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].visible == false) {
      bullets[i].visible = true;
      bullets[i].x = playerX + 5;
      break;
    }
  }
}
}


function table() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cw, ch);

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
  playerX = e.clientX - leftCanvas - gunW / 2;
}

function strzal() {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].visible == true) {
      ctx.drawImage(bullets[i].img, bullets[i].x, bullets[i].y, 30, 30);
      for (let x = 0; x < enemy.length; x++) {
        if (bullets[i].y <= 0) {
          bullets[i].visible = false;
          bullets[i].y = ch - 80;
        } else if ((enemy[x].y >= bullets[i].y) && ((enemy[x].x >= bullets[i].x -45) && (enemy[x].x <= bullets[i].x + 45))) {
          console.log("trafienie:"+bullets[i].x+","+enemy[x].x);
          bullets[i].visible = false;
          enemy[x].visible = false;
          bullets[i].y = ch - 80;
          enemy[x].y = 0 + 20;
        }
      }
      bullets[i].speedUp();
    }
  }
}

function meteoAnimate() {
  for (let i = 0; i < enemy.length; i++) {
    if (enemy[i].visible == true) {
      ctx.drawImage(enemy[i].img, enemy[i].x, enemy[i].y, 50, 50);
      if (enemy[i].y >= ch - 70) {
        enemy[i].visible = false;
        enemy[i].y = 0 + 20;
      }
      enemy[i].speedUp();
    }
  }
}

function meteo() {
  for (let i = 0; i < enemy.length; i++) {
    if (enemy[i].visible == false) {
      enemy[i].visible = true;
      enemy[i].x = Math.floor(Math.random() * (+450 - +50));
      console.log(enemy[i].x);
      break;
    }
  }
}

function game() {
  table();
  ground();
  meteoAnimate();
  gun();
  strzal();
}
