const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;
const cw = canvas.width;
const ch = canvas.height;
let lineh = 420;
let buildh = 100;
let interval = 0;
let worker = {
  count: 0,
  prize: 9,
};
let builder = {
  count: 0,
  prize: 2,
};
let clicker = {
  count: 0,
  prize: 10,
};
let priest = {
  count: 0,
  prize: 100,
};
let history = [];
let money = 0;
let frame = 1;
let framefraction = 1;
let seconds = "0";
let data = [
  {
    name: "Pałac kultury",
    description: "",
    legendary: "1",
    img: "./img/blok/BP ",
    width: "256",
    height: "256",
    frames: "32",
  },
  {
    name: "Pałac kultury",
    img: "./img/fabryka/F",
    description: "",
    legendary: "1",
    width: "384",
    height: "264",
    frames: "33",
  },
  {
    name: "Katedra",
    img: "./img/katedra/K",
    description: "",
    legendary: "1",
    width: "264",
    height: "384",
    frames: "51",
  },
];
let instance = Math.floor(Math.random() * data.length);
let dirt = "./img/dirt.png";
document.getElementById("canvas").addEventListener("click", () => {
  click();
});
setInterval(game, 1000 / 60);
window.onload = () => {
  for (let i = 0; i < data.length; i++) {
    for (let x = 1; x < data[i].frames; x++) {
      loader.loadImage(data[i].img + x + ".png");
      console.log(loader.loadedCount);
    }
  }
  worker.count = 0;
  money = 0;
};
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("con").style.display = "block";
}
let loader = {
  loadedCount: 0,
  totalCount: 123,
  loadImage: (url) => {
    loader.loadedCount++;
    let img = new Image(); // Create new img element
    img.addEventListener(
      "load",
      function () {
        // execute drawImage statements here
      },
      false
    );
    img.src = url; // Set source path
    if (loader.loadedCount == loader.totalCount) {
      showPage();
    }
    return img;
  },
};
loader.loadImage(data[instance].img + frame + ".png");
loader.loadImage("./img/crane.png");
function score() {
  let moneyimg = new Image();
  moneyimg.src = "./img/moneta.png";
  ctx.drawImage(moneyimg, cw / 3 - 150, ch - 80, 30, 30);
  ctx.fillStyle = "#fcd600";
  ctx.font = "30px Helvetica";
  ctx.fillText(money, cw / 2 - 190, ch - 55);
  let workerimg = new Image();
  workerimg.src = "./img/fachowiec1.png";
  ctx.drawImage(workerimg, cw / 3 - 50, ch - 80, 30, 30);
  ctx.fillStyle = "white";
  ctx.font = "30px Helvetica";
  ctx.fillText(worker.count, cw / 2 - 90, ch - 55);
  let builderimg = new Image();
  builderimg.src = "./img/fachowiec2.png";
  ctx.drawImage(builderimg, cw / 3 + 50, ch - 80, 30, 30);
  ctx.fillStyle = "white";
  ctx.font = "30px Helvetica";
  ctx.fillText(builder.count, cw / 2 + 10, ch - 55);
  let clickerimg = new Image();
  clickerimg.src = "./img/Chydaulik3.png";
  ctx.drawImage(clickerimg, cw / 3 + 150, ch - 80, 30, 30);
  ctx.fillStyle = "white";
  ctx.font = "30px Helvetica";
  ctx.fillText(clicker.count, cw / 2 + 110, ch - 55);
  let priestimg = new Image();
  priestimg.src = "img/Duchowny1.png";
  ctx.drawImage(priestimg, cw / 3 + 250, ch - 80, 30, 30);
  ctx.fillStyle = "white";
  ctx.font = "30px Helvetica";
  ctx.fillText(priest.count, cw / 2 + 210, ch - 55);
}
function click() {
  sound(2);
  console.log(instance);
  if (data[instance].frames == frame) {
    if (data[instance].legendary == 1) {
      history.push(data[instance]);
      history.forEach((element) => {
        document.getElementById("history").innerHTML =
          document.getElementById("history").innerHTML +
          '<img src="' +
          element.img +
          element.frames +
          '.png" width=100 style="cursor:pointer;margin:8px" alt="">';
      });
    }
    frame = 1;
    instance = Math.floor(Math.random() * data.length);
  } else {
    money = money + 1 + clicker.count;
    framefraction++;
    if (framefraction == 2) {
      frame++;
      framefraction = 0;
    }
  }
  loader.loadImage(data[instance].img + frame + ".png");
}
function update(arg) {
  switch (arg) {
    case 1:
      if (money < worker.prize) {
        break;
      } else {
        money = money - worker.prize;
        worker.prize = worker.prize * 2;
        worker.count++;
        if (interval != 1) {
          setInterval(() => {
            money = money + worker.count;
          }, 1000);
          interval++;
        }
      }
      break;

    case 2:
      if (money < builder.prize) {
        break;
      } else {
        money = money - builder.prize;
        builder.prize = builder.prize * 2;
        builder.count++;
        if (interval != 1) {
          setInterval(() => {
            if (frame == data[instance].frames) {
              instance = Math.floor(Math.random() * data.length);
              frame=0;
            }
            frame = frame + builder.count;
          }, 1000);
          interval++;
        }
      }
      break;
    case 3:
      if (money < clicker.prize) {
        break;
      } else {
        money = money - clicker.prize;
        clicker.prize = clicker.prize * 3;
        clicker.count++;
      }
      break;
    case 4:
      if (money < priest.prize) {
        break;
      } else {
        money = money - priest.prize;
        money = money * 2;
        score();
        priest.prize = priest.prize * 4;
        priest.count++;
      }
      break;
  }
}
function count() {
  frame++;
}
function table() {
  ctx.drawImage(loader.loadImage("./img/background.png"), 0, 0, cw, ch);
}

/*function ground() {
  let img = new Image();
  img.src = "./img/dirt.png";
  let pattern = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, ch - 100, cw, ch);
}*/
function cranefunction() {
  ctx.drawImage(
    loader.loadImage("./img/crane.png"),
    50,
    0,
    loader.loadImage("./img/crane.png").width - 220,
    loader.loadImage("./img/crane.png").height - 220
  );
}
function build(width, height) {
  ctx.drawImage(
    loader.loadImage(data[instance].img + frame + ".png"),
    cw / 2,
    ch - 100 - height / 2,
    width / 2,
    height / 2
  );
}
function sound(type) {
  switch (type) {
    case 1:
      document.getElementById("myAudio").currentTime = 0;
      document.getElementById("myAudio").play();
      break;
    case 2:
      document.getElementById("btnAudio").currentTime = 0;
      document.getElementById("btnAudio").play();
      break;
  }
}
function game() {
  document.getElementById("workerbtn").innerText = worker.prize;
  document.getElementById("workerbtn2").innerText = builder.prize;
  document.getElementById("workerbtn3").innerText = clicker.prize;
  document.getElementById("workerbtn4").innerText = priest.prize;
  table();
  build(data[instance].width, data[instance].height);
  cranefunction();
  score();
}
