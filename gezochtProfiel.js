"use strict";



eenProfielAfhalen();

// juiste profiel wordt afgehaald
async function eenProfielAfhalen() 
{
    const gebruikerId = localStorage.getItem("gezochteGebruiker");
   /* console.log(gezochteGebruiker);
    const gebruikerId = gezochteGebruiker.id;*/
    const response =
        await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + gebruikerId);
    if (response.ok) {
        const eenProfiel = await response.json();
        console.log(eenProfiel);
        profielWeergeven(eenProfiel);
        document.getElementById("sterrenbeeld").src = sterrenbeeldAfhalen(eenProfiel);
        return eenProfiel;
    }                                      
    else {
        document.getElementById("nietGevonden").style.display = "block";
    }
};

// profiel wordt weergegeven
function profielWeergeven(gebruiker) 
{
    document.getElementById("gebruikerWeergave").style.display = "block";
    document.getElementById("gebruikerNickname").innerText = gebruiker.nickname;
    document.getElementById("gebruikerBeroep").innerText = gebruiker.beroep;
    document.getElementById("gebruikerSexe").innerText = gebruiker.sexe;
    document.getElementById("gebruikerOogkleur").innerText = gebruiker.oogkleur;
    document.getElementById("gebruikerHaarkleur").innerText = gebruiker.haarkleur;
    document.getElementById("gebruikerGewicht").innerText = gebruiker.gewicht;
    document.getElementById("gebruikerGrootte").innerText = gebruiker.grootte;
    console.log(gebruiker.foto);
    document.getElementById("avatar").src = "https://scrumserver.tenobe.org/scrum/img/" + gebruiker.foto;
}

// sterrenbeeld wordt bepaald en weergegeven
function sterrenbeeldAfhalen(gebruiker) {

    console.log(gebruiker.geboortedatum);
    const geboortedatum = new Date(gebruiker.geboortedatum);
    const month = geboortedatum.getMonth() + 1;
    console.log(month);
    const day = geboortedatum.getDay();
    console.log(day);

    if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
        return "img/sterrenbeeld/steenbok.png";
    } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
        return "img/sterrenbeeld/waterman.png";
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        return "img/sterrenbeeld/vissen.png";
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
        return "img/sterrenbeeld/ram.png";
    } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
        return "img/sterrenbeeld/stier.png";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        return "img/sterrenbeeld/tweelingen.png";
    } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
        return "img/sterrenbeeld/kreeft.png";
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
        return "img/sterrenbeeld/leeuw.png";
    } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
        return "img/sterrenbeeld/maagd.png";
    } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
        return "img/sterrenbeeld/weegschaal.png";
    } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
        return "img/sterrenbeeld/schorpioen.png";
    } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
        return "img/sterrenbeeld/boogschutter.png";
    }
}

// een favoriet maken

        document.getElementById("favoriet").addEventListener('click', function (e) {  
        const foutDiv = document.getElementById("fout");
        let gebruikerId =  localStorage.getItem("gebruiker"); 
        let gezochteId =  localStorage.getItem("gezochteGebruiker");
        const rooturl = "https://scrumserver.tenobe.org/scrum/api";
        let url=rooturl+"/favoriet/like.php";
        
        let data = {
            "mijnId": gebruikerId,
            "anderId": gezochteId
        }

        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        
        fetch(request)
            .then( function (resp)  { return resp.json(); })
            .then( function (data)  { console.log(data);  })
            .catch(function (error) { console.log(error); });
   

     
      //  let profielId =  localStorage.getItem("gebruiker");
       // console.log(profielId);
        let bedrag =  -1;
        console.log(bedrag);
      //  const rooturl = "https://scrumserver.tenobe.org/scrum/api";
        let favUrl=rooturl+'/profiel/read_one.php?id='+ gebruikerId;
                       
        fetch(favUrl)
            .then(function (resp) { return resp.json(); }) //haal de JSON op en stuur die als resultaat van je promise                         
            .then(function (data) {
                //nadat de vorige promise opgelost werd kwamen we in deze procedure tercht
                //hier kunnen we nu , met het resultat (data) van de vorige promise, aan de slag
                //we passen de voornaam aan en sturen ook dit terug zodat deze promise afgesloten kan worden                        
                if (data.lovecoins === "0")
                {
                    console.log(data.lovecoins);
                    foutDiv.innerText = "Geen lovecoins meer!"
                }
                else
                {
                let urlUpdate=rooturl+'/profiel/lovecoinTransfer.php';

                data = {"profielID": gebruikerId,
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
                                              if (data.message === "Transactie werd niet uitgevoerd. Geen Lovecoins genoeg")
                                              {
                                              console.log("gelukt");
                                              
                     }                           })
                    .catch(function (error) { console.log(error); });



            }})
            .catch(function (error) {
                console.log(error);
            });
    });
        