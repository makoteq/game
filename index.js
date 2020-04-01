const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;
const cw = canvas.width;
const ch = canvas.height;
let lineh =420;
let buildh=100;
let width = 392;
let height = 520
let data = [
  {
    "name":"Pałac kultury",
    "img":"./img/PK.png"
  }
]
let b = new Image();
b.src = './img/PK.png';
setInterval(game, 1000 / 60);
let dirt ="./img/dirt.png"
document.getElementById("canvas").addEventListener('click',()=>{
  click();
})
window.onload=()=>{
  console.log(b.height/2);
}
function click(){
  console.log(buildh)
  if(buildh!=b.height/2+100){
    buildh=buildh+5;
  }else{
    console.log("next")
  }
}
function table(){
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, cw, ch);
}
function ground() {
  let img = new Image();
  img.src = './img/dirt.png';
  let pattern = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0,  ch - 100, cw, ch);
}
function crane(){
  let crane = new Image();
  crane.src = './img/crane.png';
  ctx.drawImage(crane, 0, 0);
}
function line(){
  ctx.fillStyle = "blue";
  ctx.fillRect(cw/2+cw/4,  ch - 520, 5, lineh);
}
function build(width,height){
  ctx.drawImage(b, cw/2+cw/4-width/4,  ch - buildh,width/2,height/2);
}
function game() {
  table();
  line();
  build(width,height);
  ground();
 crane();
 
}
