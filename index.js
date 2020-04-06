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
  prize: 36,
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
let seconds = 0;
let data = [
  {
    name: "Blok pierwszy",
    img: "./img/blok/BP ",
    description: "",
    legendary: "0",
    width: "256",
    height: "256",
    frames: "32",
  },
  {
    name: "Blok drugi",
    img: "./img/blok2/B",
    description: "",
    legendary: "0",
    width: "144",
    height: "256",
    frames: "32",
  },
  {
    name: "Blok trzeci",
    img: "./img/blok3/BW",
    description: "",
    legendary: "0",
    width: "144",
    height: "256",
    frames: "32",
  },
  {
    name: "Blok czwarty",
    img: "./img/blok4/BZ",
    description: "",
    legendary: "0",
    width: "144",
    height: "256",
    frames: "32",
  },
  {
    name: "Fabryka",
    img: "./img/fabryka/F",
    description: "",
    legendary: "0",
    width: "384",
    height: "264",
    frames: "33",
  },
  {
    name: "Katedra Św. Michała Archanioła",
    img: "./img/katedra/K",
    description: "Zgodę na budowę kościoła uzyskano po długich staraniach w 1886, kiedy liczba wiernych w praskiej parafii przy kościele Najświętszej Matki Bożej Loretańskiej sięgnęła ok. 32 tys. \
Z uwagi na ubóstwo mieszkańców, car Aleksander III wyraził zgodę na zbiórkę pieniędzy także poza Warszawą.\
 Przed zatwierdzeniem dokumentacji dokonano zmian w projekcie, wymuszonych względami oszczędnościowymi. W dniu wmurowania kamienia węgielnego zebrane fundusze wynosiły ok. 50 tys. rubli, z czego 6 tys.\
 rubli podarowała Aleksandra Potocka. Z uwagi na podmokłość terenu, zlokalizowanego na nadwiślańskich błoniach, konieczne było zastosowanie wzmocnionych fundamentów. Do budowy kościoła zamówiono cegły o podwyższonej wytrzymałości mechanicznej wytwarzane ręcznie w zakładach Kazimierza Granzowa. \
Kościół został konsekrowany 29 września 1901 – w dniu patronalnym św. Michała Archanioła – przez bpa Kazimierza Ruszkiewicza. W uroczystości uczestniczyło 30 tys. osób. Świątynia mogła pomieścić ok. 8000 wiernych. Koszt jej budowy wyniósł 300 tys. rubli. Kościół został wysadzony w powietrze przez wycofujących się Niemców 14 września 1944.\
 Do wysadzenia świątyni użyto także materiałów wybuchowych przeznaczonych pierwotnie do zniszczenia sąsiedniego Szpitala Praskiego, w wyniku czego szpital ocalał. Z całej budowli ocalały fragmenty ścian bocznych z figurami patronów świątyni, św. Michała Archanioła i św. Floriana Męczennika, wykonanymi przez Tadeusza Skoniecznego.   ",
    legendary: "1",
    width: "264",
    height: "384",
    frames: "51",
    active:"0"
  },
  {
    name: "Pałac Jana 3 Sobieskiego",
    img: "./img/PalacJ3S/PK",
    description: "Barokowy pałac królewski znajdujący się w Warszawie, w dzielnicy Wilanów. Został wzniesiony w latach 1681–1696 dla króla Jana III Sobieskiego i Marii Kazimiery według projektu Augustyna Wincentego Locciego; skrzydła boczne dobudowano w latach 1723–1729.Podczas II wojny światowej Niemcy i Węgrzy zagrabili ok. 80% wyposażenia wnętrz pałacu, zniszczono także ogród pałacowy.\
 Przejęty po ostatniej wojnie na własność państwa, po gruntownych pracach konserwatorskich i rewaloryzacyjnych oraz rewindykacji znacznej części zbiorów wywiezionych przez Niemców, został udostępniony publiczności w 1962 roku. ",
    legendary: "1",
    width: "380",
    height: "142",
    frames: "33",
    active:"0"
  },
  {
    name: "Pałac kultury",
    img: "./img/PalacKult/PK",
    description: "Pałac Kultury i Nauki- Najwyższy budynek w Polsce, razem ze wspornikiem antenowym, będącym integralną częścią iglicy, ma wysokość 237 metrów. Znajdujący się w śródmieściu Warszawy na placu Defilad 1.\
 Od 2007 gmach znajduje się w rejestrze zabytków. Pałac stanowił „dar narodu radzieckiego dla narodu polskiego”. Wybudowany został w latach 1952–1955 według projektu radzieckiego architekta Lwa Rudniewa, który inspirował się moskiewskimi drapaczami chmur.    ",
    legendary: "1",
    width: "392",
    height: "504",
    frames: "63",
    active:"0"
  },
  {
    name: "Zamek Królewski",
    img: "./img/PalacKr/PK",
    description: "Pierwotnie rezydencja książąt mazowieckich, a od XVI wieku siedziba władz I Rzeczypospolitej: króla i Sejmu.\
W swojej długiej historii Zamek Królewski był wielokrotnie grabiony i dewastowany przez wojska szwedzkie, brandenburskie, niemieckie i rosyjskie.\
 W XIX wieku, po upadku powstania listopadowego, przeznaczony na potrzeby administracji rosyjskiej. W okresie I wojny światowej rezydencja niemieckiego generalnego gubernatora.\
 W latach 1920–1922 siedziba Naczelnika Państwa, w latach 1926–1939 rezydencja Prezydenta Rzeczypospolitej Polskiej. Spalony i ograbiony przez Niemców w 1939, niemal doszczętnie zniszczony w 1944.\
W 1980 Zamek Królewski wraz ze Starym Miastem został wpisany na listę światowego dziedzictwa UNESCO.\
   ",
    legendary: "1",
    width: "368",
    height: "260",
    frames: "65",
    active:"0"
  },
  {
    name: "Pałac Łazienkowski",
    img: "./img/PalacLaz/P",
    description: "Początki dzisiejszego Pałacu na Wyspie sięgają końca XVII w. \
 Na polecenie księcia Stanisława Herakliusza Lubomirskiego, jednego z największych polityków, pisarzy i filozofów tych czasów, wybudowana została Łaźnia. \
 Barokowy pawilon ogrodowy, projektu holenderskiego architekta Tylmana z Gameren, miał służyć zarówno odpoczynkowi, rozrywce, jak i kontemplacji. Wnętrze Łaźni skrywało salę stylizowaną na grotę. Biło w niej źródło, symbolizujące źródło w starożytnej Grecji, niosące muzom natchnienie.W 1764 r.\
 Stanisław August, szukając miejsca na swą letnią królewską rezydencję, zakupił Łaźnię wraz z Ujazdowem. Za sprawą architektów - pochodzącego z Włoch Domenico Merliniego i urodzonego w Dreźnie Jana Chrystiana Kamsetzera - król przekształcił barokowy pawilon Łaźni w klasycystyczny Pałac na Wyspie. \
Stanisław August przekształcił Pałac na Wyspie w willę muzeum, w której eksponowane były najcenniejsze obrazy z jego kolekcji, liczącej według inwentarza z 1795 r. 2289 dzieł najważniejszych artystów i szkół europejskich XVII i XVIII w. Najliczniej reprezentowanymi malarzami byli artyści holenderscy,\
 z których dzieł do najcenniejszych zaliczyć należy obrazy autorstwa Rembrandta van Rijn.",
    legendary: "1",
    width: "320",
    height: "132",
    frames: "33",
    active:"0"
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
  totalCount: 413,
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
	
  ctx.drawImage(loader.loadImage("./img/moneta.png"), cw / 3 - 150, ch - 80, 30, 30);
  ctx.fillStyle = "#fcd600";
  ctx.font = "30px Helvetica";
  ctx.fillText(money, cw / 2 - 190, ch - 55);
  
  ctx.drawImage(loader.loadImage("./img/fachowiec2.png"), cw / 3 - 50, ch - 80, 30, 30);
  ctx.fillStyle = "white";
  ctx.font = "30px Helvetica";
  ctx.fillText(worker.count, cw / 2 - 90, ch - 55);
  

  ctx.drawImage(loader.loadImage("./img/fachowiec1.png"), cw / 3 + 50, ch - 80, 30, 30);
  ctx.fillStyle = "white";
  ctx.font = "30px Helvetica";
  ctx.fillText(builder.count, cw / 2 + 10, ch - 55);
  
  ctx.drawImage(loader.loadImage("./img/Chydaulik3.png"), cw / 3 + 150, ch - 80, 30, 30);
  ctx.fillStyle = "white";
  ctx.font = "30px Helvetica";
  ctx.fillText(clicker.count, cw / 2 + 110, ch - 55);
  
  ctx.drawImage(loader.loadImage("./img/Duchowny1.png"), cw / 3 + 250, ch - 80, 30, 30);
  ctx.fillStyle = "white";
  ctx.font = "30px Helvetica";
  ctx.fillText(priest.count, cw / 2 + 210, ch - 55);
}
function click() {
  sound(1);
  console.log(instance);
  if (data[instance].frames == frame) {
    if (data[instance].legendary == 1&&data[instance].active==0) {
      history.push(data[instance]);
      history.forEach((element) => {
        document.getElementById("history").innerHTML =
        document.getElementById("history").innerHTML +
        '<img src="' +
        element.img +
        element.frames +
        '.png" data-toggle="modal" onclick="showdata(`'+element.name+'`,`'+element.description+'`)"   data-target="#description" width=100  style="cursor:pointer;margin:8px" alt="">'
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
function showdata(name,des){
  document.getElementById("descriptionTitle").innerText = name;
  document.getElementById("descriptionDes").innerText = des;
}
function update(arg) {
  switch (arg) {
    case 1:
      if (money < worker.prize) {sound(3);
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
		sound(2);
      }
      break;

    case 2:
      if (money < builder.prize) {sound(3);
        break;
      } else {
        money = money - builder.prize;
        builder.prize = builder.prize * 2;
        builder.count++;
		score();
        if (builder.count=1) {counter();}
		sound(2);
      }
      break;
    case 3:
      if (money < clicker.prize) {sound(3);
        break;
      } else {
        money = money - clicker.prize;
        clicker.prize = clicker.prize * 3;
        clicker.count++;
		sound(2);
      }
      break;
    case 4:
      if (money < priest.prize) {sound(3);
        break;
      } else {
        money = money - priest.prize;
        money = money * 2;
        score();
        priest.prize = priest.prize * 4;
        priest.count++;
		sound(2);
      }
      break;
  }
}
function counter()
{
	if(seconds==8)
	{
		frame=frame+builder.count;
		console.log(frame);
		seconds=0;
	}
	else seconds++;
	setTimeout("counter()", 1000);
}


function table() {
  ctx.drawImage(loader.loadImage("./img/background.png"), 0, 0, cw, ch);
}
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
      document.getElementById("clickAudio").currentTime = 0;
      document.getElementById("clickAudio").play();
      break;
    case 2:
      document.getElementById("btnAudio").currentTime = 0;
      document.getElementById("btnAudio").play();
      break;
      case 3:
        document.getElementById("failAudio").currentTime = 0;
        document.getElementById("failAudio").play();
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
