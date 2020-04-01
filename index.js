const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;
const cw = canvas.width;
const ch = canvas.height;
let lineh =420;
let buildh=200;
setInterval(game, 1000 / 60);
let dirt ="./img/dirt.png"
document.getElementById("canvas").addEventListener('click',()=>{
  click();
})
window.onload=()=>{

}
function click(){
  console.log(buildh)
  buildh=buildh+5;
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
function build(){
  let b = new Image();
  b.src = './img/house2.png';
  ctx.drawImage(b, cw/2,  ch - 555);
}
function game() {
  table();
  ground();
 crane();
 build();
}
