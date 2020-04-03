const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;
const cw = canvas.width;
const ch = canvas.height;
let lineh =420;
let buildh=100;
let interval = 0;
let worker = {
  count:0,
  prize:9
}
let builder = {
  count:0,
  prize:32
}
let money = 0;
let frame = 1;
let framefraction=1;
let seconds="0";
let data = [
  {
    "name":"Pałac kultury",
    "description":"",
    "legendary":"1",
    "img":"./img/blok/BP ",
    "width":"256",
    "height":"256",
    "frames":"32"
  },
  {
    "name":"Pałac kultury",
    "img":"./img/fabryka/F",
    "description":"",
    "legendary":"0",
    "width":"384",
    "height":"264",
    "frames":"33"
  },
  {
    "name":"Katedra",
    "img":"./img/katedra/K",
    "description":"",
    "legendary":"1",
    "width":"264",
    "height":"384",
    "frames":"51"
  }
];
let instance =Math.floor((Math.random() * data.length));
let dirt ="./img/dirt.png"
document.getElementById("canvas").addEventListener('click',()=>{
  click();
})
let b = new Image();
b.src = data[instance].img+frame+".png";
let crane = new Image();
crane.src = './img/crane.png';
setInterval(game, 1000 / 60);
window.onload=()=>{
  worker.count=0;
  money=0;
}
function score(){
    let moneyimg = new Image();
    moneyimg.src ="./img/moneta.png";
      ctx.drawImage(moneyimg, cw/3+20, ch-80,30,30);
      ctx.fillStyle = "#fcd600";
      ctx.font = "30px Helvetica";
      ctx.fillText(money, cw/2-20, ch-55);
    let workerimg = new Image();
    workerimg.src ="./img/fachowiec1.png";
      ctx.drawImage(workerimg, cw/3+140, ch-80,30,30);
      ctx.fillStyle = "white";
      ctx.font = "30px Helvetica";
      ctx.fillText(worker.count, cw/2+100, ch-55);
	let builderimg = new Image();
    builderimg.src ="./img/fachowiec2.png";
      ctx.drawImage(builderimg, cw/3+260, ch-80,30,30);
      ctx.fillStyle = "white";
      ctx.font = "30px Helvetica";
      ctx.fillText(builder.count, cw/2+220, ch-55);
}
function click(){
  sound(2);
  console.log(instance);
  if(data[instance].frames==frame){
    frame=1;
    instance=Math.floor((Math.random() * data.length))
  }else{
    money++;
    framefraction++;
	if (framefraction==4) {frame++; framefraction=0;}
  }
  b.src = data[instance].img+frame+".png";
  console.log(data[instance].img+frame+".png")
}
function update(arg){
  switch(arg)
	{
		case 1: 
	if(money<worker.prize){
    break;
  }else{
    if(interval!=1){
      setInterval(()=>{money=money+worker.count}, 1000 )
      interval++;
    }
    money=money-worker.prize;
    worker.prize=worker.prize*2;
    worker.count++;
  } break;
  
  case 2:
  console.log(money);
    if(money<builder.prize){
    break;
  }else{
    console.log(builder.prize);
	count();
    money=money-builder.prize;
    builder.prize=builder.prize*3;
    builder.count++;
  } break;

	}
}
function count()
{
	seconds++;
	if (seconds==(8/builder.count))
	{
		frame++;
		seconds=0;
		b.src = data[instance].img+frame+".png";
	}
	setTimeout("count()", 1000);
}
function table(){
  let back = new Image();
  back.src ="./img/background.png";
  ctx.drawImage(back, 0, 0, cw, ch);
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
  ctx.drawImage(b, cw/2,  ch - 100-height/2,width/2,height/2,);
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
function game() {
  document.getElementById("workerbtn").innerText=worker.prize;
  document.getElementById("workerbtn2").innerText=builder.prize;
    table();
    build(data[instance].width,data[instance].height);
  
    cranefunction();
    score()
}
