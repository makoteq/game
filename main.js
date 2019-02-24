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
let mode = "easy";
let bigCout = Math.floor((Math.random() * 100) + 1);
let gameidx = 0;
let bullets = [];
bullets.length = 5;
let enemy = [];
enemy.length = 5;

function modes() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i] = new Bullet(0, ch - 80, 30, 30, 10);
  }
  for (let i = 0; i < enemy.length; i++) {
    enemy[i] = new enemyClass();
    enemy[i].setType(1);
  }
  //big guy
  enemy[enemy.length - 1].setType(2);
  //fast guy
}
/*
@makotek keydown eventListener na document i w callbacku event.key === "Enter"
*/

canvas.onmouseover = () => {
  document.getElementById("canvas").style.cursor = "crosshair";
}

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
  ctx.fillStyle = "green";
  ctx.textAlign = "center";
  ctx.fillText("What's up?", cw / 2, ch / 2);
  ctx.fillStyle = "white";
  ctx.font = "25px Helvetica";
  ctx.fillText("select mode to begin", cw / 2, ch / 2 + 30);
  scoreFunction()
  document.getElementById("easy").onclick =()=>{
    setMode("easy")
  }
  document.getElementById("medium").onclick =()=>{
    setMode("medium")
  }
  document.getElementById("hard").onclick =()=>{
    setMode("hard")
  }
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
function setMode(modee){
  gunClass.visible = true;
  gameStart = true;
  mode=modee;
  for(let e=0;e<3;++e){
  document.getElementsByClassName('button')[e].style.display = 'none';
  }
}


window.onload = () => {
  modes()
  startScreen()
  instervalGame = setInterval(game, 1000 / 60);
}

function overScreen() {
  for(let e=0;e<3;++e){
    document.getElementsByClassName('button')[e].style.display = 'block';
    }
  gameStart = false;
  /*start screen*/
  for (let i = 0; i < enemy.length; i++) {
    console.log("speed=" + enemy[i].speed);
    enemy[i].visible = false;
    if(enemy[i].type==2){
    enemy[i].randomCout();
    }
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
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", cw / 2, ch / 2);
  ctx.font = "25px Helvetica";
  ctx.fillStyle = "white";
  ctx.fillText("select mode to play again", cw / 2, ch / 2 + 30);
  scoreFunction()

  scoreFunction()
  document.getElementById("easy").onclick =()=>{
    setMode("easy")
  }
  document.getElementById("medium").onclick =()=>{
    setMode("medium")
  }
  document.getElementById("hard").onclick =()=>{
    setMode("hard")
  }
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
          if (enemy[x].enemyType == 1) {
            ++score;
            bullets[i].visible = false;
            enemy[x].visible = false;
            bullets[i].y = ch - 80;
          } else if (enemy[x].enemyType == 2) {
            if (enemy[x].life <= 0) {
              ++score;
              bullets[i].visible = false;
              enemy[x].visible = false;
              enemy[x].setLife(10);
              bullets[i].y = ch - 80;
            } else {
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
      if (enemy[i].y + enemy[i].h >= ch - 20) {
        score = 0;
        overScreen();
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
  ctx.fillText(score, cw - 40, 60);
  ctx.font = "25px Helvetica";
  ctx.fillText(mode, cw - 50, 90);
}

function game() {
  if (!gameStart) return;

  ++gameidx;
  for (let x = 0; x < enemy.length; x++) {
    if ((gameidx % enemy[x].how) == 0) {
      if (enemy[x].cout <= 0) {
        for (let i = 0; i < enemy.length; i++) {
          if ((enemy[i].visible == false) && (enemy[i].enemyType == 2)) {
            console.log("GENERUJE");
            enemy[i].setPosition(Math.floor(Math.random() * (450 - 50)), 20);
            enemy[i].visible = true;
            enemy[i].randomCout();
          }
        }
      } else {
        for (let i = 0; i < enemy.length; i++) {
          if ((enemy[i].visible == false) && (enemy[i].enemyType == 1)) {
            enemy[i].setPosition(Math.floor(Math.random() * (450 - 50)), 20);
            enemy[i].visible = true;
            console.log(enemy[i].x);
            continue;
          } else if ((enemy[i].visible == false) && (enemy[i].enemyType == 2)) {
            enemy[x].decraseCout();
            console.log("cout=" + enemy[i].cout);
            continue;
          }
        }
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
