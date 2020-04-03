const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;
const cw = canvas.width;
const ch = canvas.height;
let lineh =420;
let buildh=100;
let width = 512;
let height = 512
let frame = 1;
let data = [
  {
    "name":"Pałac kultury",
    "img":"./img/blok/BP ",
    "width":"768",
    "height":"768",
    "frames":"33"
  }
];
let dirt ="./img/dirt.png"
document.getElementById("canvas").addEventListener('click',()=>{
  click();
})
let b = new Image();
b.src = data[0].img+frame+".png";
let crane = new Image();
crane.src = './img/crane.png';
setInterval(game, 1000 / 60);
  var audio = new Audio();
audio.src = "./click.mp3";
window.onload=()=>{
}
function click(){
   frame=frame+0.25;
  console.log(buildh);
  b.src = data[0].img+frame+".png";
  console.log(data[0].img+frame+".png")
 /* if(buildh!=b.height/2+100){
    buildh=buildh+5;
  }else{
    console.log("next")
  }*/
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
function build(width,height){
  ctx.drawImage(b, cw/2,  ch - 100-height/4,width/4,height/4,);
}
function game() {
  build(data[0].width,data[0].height);
  ground();
  cranefunction();
 
}
function sound(type)
{
	switch(type)
	{
		case 1: 
		document.getElementById("myAudio").currentTime=0;
		document.getElementById("myAudio").play(); break;
		case 2: 
		document.getElementById("btnAudio").currentTime=0;
		document.getElementById("btnAudio").play(); break;
	}
}