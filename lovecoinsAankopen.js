"use strict";


//Is the user authenticated?
if (localStorage.getItem('gebruiker') === null || localStorage.getItem('gebruiker') === "undefined") {
    window.open("AccessDenied.html","_self");
}
else {
//The user is authenticated and the authentication has not expired.

}


eenProfielAfhalen();
async function eenProfielAfhalen() {

    const gebruikerId = localStorage.getItem("gebruiker");
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + gebruikerId);
    if (response.ok) {
        const eenProfiel = await response.json();
        console.log(eenProfiel);
        document.getElementById("begroeting").innerText = eenProfiel.nickname;
        document.getElementById("aantalLoveCoins").innerText = eenProfiel.lovecoins;
        return eenProfiel;
    }
    else {
        console.log("Er liet iets fout.")
    }
};

document.getElementById("aankoopKnop").addEventListener('click', function (e)
{   let aantal = document.getElementById("aankoopLovecoins").value;
    let teBetalen=0;
    if(aantal !==null){
        
        if(aantal < 5){
            teBetalen = aantal*2;
        }
        else {
            teBetalen = Math.floor((aantal*1.8)*10)/10;
        }
        document.getElementById("aantalCredits").innerText=aantal;
        document.getElementById("aantalEuro").innerText=teBetalen;
        document.querySelector(".verborgen").style.display="inline";
        document.querySelector(".zichtbaar").style.display="none";
    }
    
    document.getElementById("annuleren").onclick =function(){
        aantal=0;
        document.getElementById("aankoopLovecoins").value="";
        document.getElementById("aantalCredits").innerText=0;
        document.getElementById("aantalEuro").innerText=0;
        document.querySelector(".verborgen").style.display="none";
        document.querySelector(".zichtbaar").style.display="inline";

    }
})
    document.getElementById("betalen").addEventListener('click', function (e) {  
        let profielId =  localStorage.getItem("gebruiker");
        let bedrag =  document.getElementById("aankoopLovecoins").value;
        const rooturl = "https://scrumserver.tenobe.org/scrum/api";
        let url=rooturl+'/profiel/read_one.php?id='+profielId;
                       
        fetch(url)
            .then(function (resp) { return resp.json(); }) //haal de JSON op en stuur die als resultaat van je promise                         
            .then(function (data) {
                //nadat de vorige promise opgelost werd kwamen we in deze procedure tercht
                //hier kunnen we nu , met het resultat (data) van de vorige promise, aan de slag
                //we passen de voornaam aan en sturen ook dit terug zodat deze promise afgesloten kan worden                        
                let urlUpdate=rooturl+'/profiel/lovecoinTransfer.php';

                data = {"profielID": profielId,
                            "bedrag": bedrag}; 

                var request = new Request(urlUpdate, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                fetch(request)
                    .then(function (resp)   { return resp.json(); })
                    .then(function (data)   { console.log(data);
                                              window.location.replace("lovecoinsAangekocht.html"); })
                    .catch(function (error) { console.log(error); });



            })
            .catch(function (error) {
                console.log(error);
            });
    });





