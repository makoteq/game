let text="";
function bio(number)
{
	switch(number)
	{
		case 1: text='"Jestem 15 letnim (na rok 2020) uczniem LO nr. V w Gdańsku. Chodzę do klasy o profilu biologiczno-chemicznym. Moją pasję do informatyki i programowania zacząłem w 7-dmej klasie. Wtedy zacząłem uczyć się języka C++, a dzisiaj oprócz nich znam takie języki jak HTML, CSS, JavaScript. Obecnie doskonale moje umiejętności programowania webowego." ~Wiktor'; break;
		case 2: text='"Jestem początkującym programistą z Gdańska. Mam 16lat, a w projecie zająłem się się stroną techniczną."~Maciej'; break;
		case 3: text='"Jestem 16 letnim (na rok 2020) uczniem lo nr. II w Gdańsku. Chodzę do klasy o profilu Matematyczno Fizycznym. Moją pasję jaką jest grafika komputerowa i montowanie filmów, które odkryłem w 7 klasie."~Adam'; break;
		case 4: text='"Mam 15 lat i chodzę do XXI LO w Gdańsku. Interesować się grafiką zacząłem w 8 klasie. Obecnie chcę poszerzać wiedze i uczyć się robić grafiki, montować filmy czy przerabiać zdjęcia."~Maks'; break;
	}
	document.getElementById("bio").style.display="block";
	document.getElementById("bio").innerHTML+='<div style="width: 100%; text-align: right; padding: 10px 20px; cursor: pointer;" onclick="hide();"><i class="fas fa-times" style="text-align: right; font-size: 100px;"></i></div>'+text;
}
function hide()
{
	document.getElementById("bio").style.display="none";
	document.getElementById("bio").innerHTML="";
}