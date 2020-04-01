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
let crane = new Image();
crane.src = './img/PK2.png';
setInterval(game, 1000 / 60);
let dirt ="./img/dirt.png"
document.getElementById("canvas").addEventListener('click',()=>{
  click();
})
window.onload=()=>{
  console.log(b.height/2);
}
function click(){
  crane.width=crane.width+5
  crane.height=crane.height+5
  setTimeout(function(){  crane.width=crane.width-5
    crane.height=crane.height-5 }, 50);
  console.log(buildh)
  if(buildh!=b.height/2+100){
    buildh=buildh+5;
  }else{
    console.log("next")
  }
}
function table(){
  ctx.fillStyle = "white";
  ctx.fillRect(0,0, cw, ch);
}
function ground() {
  let img = new Image();
  img.src = './img/dirt.png';
  let pattern = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0,  ch - 100, cw, ch);
}
function cranefunction(){
  ctx.drawImage(crane, 50, 0,crane.width-220,crane.height-220);
}
function line(){
  ctx.fillStyle = "black";
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
  cranefunction();
 
}
