"use strict";


//Is the user authenticated?
if (localStorage.getItem('gebruiker') === null || localStorage.getItem('gebruiker') === "undefined") {
    window.open("AccessDenied.html","_self");
}
else {
//The user is authenticated and the authentication has not expired.

}


eenProfielAfhalen();

// juiste profiel wordt afgehaald
async function eenProfielAfhalen() 
{
    const gebruikerId = localStorage.getItem("gezochteGebruiker");
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
        foutDiv.innerText = "Er liep iets fout.";
    }
};

// profiel wordt weergegeven
async function profielWeergeven(gebruiker) 
{
    await favorietControle(gebruiker.id);
    document.getElementById("gebruikerWeergave").style.display = "block";
    document.getElementById("gebruikerNickname").innerText = gebruiker.nickname;
    document.getElementById("gebruikerBeroep").innerText = gebruiker.beroep;
    document.getElementById("gebruikerSexe").innerText = gebruiker.sexe;
    document.getElementById("gebruikerOogkleur").innerText = gebruiker.oogkleur;
    document.getElementById("gebruikerHaarkleur").innerText = gebruiker.haarkleur;
    document.getElementById("gebruikerGewicht").innerText = gebruiker.gewicht;
    document.getElementById("gebruikerGrootte").innerText = gebruiker.grootte;
    document.getElementById("avatar").src = "https://scrumserver.tenobe.org/scrum/img/" + gebruiker.foto;
}

// sterrenbeeld wordt bepaald en weergegeven
function sterrenbeeldAfhalen(gebruiker) {

    const geboortedatum = new Date(gebruiker.geboortedatum);
    const month = geboortedatum.getMonth() + 1;
    const day = geboortedatum.getDay();

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

        if (data.lovecoins === "0")
                {
                    foutDiv.innerText = "Geen lovecoins meer!"
                }
                else if (data.message === "Kon favoriet niet aanmaken.")
                {
                    foutDiv.innerText = "kon favoriet niet aanmaken.";
                }
                else
                {
        fetch(request)
            .then( function (resp)  { return resp.json(); })
            .then( function (data)  { console.log(data);
                                       favorietInstellen(gezochteId); 
                                     /*  favorietControle(gezochteId); */})
            .catch(function (error) { console.log(error); });}
   

     
        let bedrag =  -1;
        let favUrl=rooturl+'/profiel/read_one.php?id='+ gebruikerId;
                       
        fetch(favUrl)
            .then(function (resp) { return resp.json(); }) //haal de JSON op en stuur die als resultaat van je promise                         
            .then(function (data) {
                //nadat de vorige promise opgelost werd kwamen we in deze procedure tercht
                //hier kunnen we nu , met het resultat (data) van de vorige promise, aan de slag
                //we passen de voornaam aan en sturen ook dit terug zodat deze promise afgesloten kan worden                        
                if (data.lovecoins === "0")
                {
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
                                              if (data.message === "Transactie werd uitgevoerd.")
                                              {
                                              console.log("gelukt");
                                              
                     }                           })
                    .catch(function (error) { console.log(error); });



            }})
            .catch(function (error) {
                console.log(error);
            });
    });

    async function favorietInstellen(id) 
    {
    const rooturl = "https://scrumserver.tenobe.org/scrum/api";  
    let url=rooturl+'/profiel/read_one.php?id='+ id;
                  
    fetch(url)
        .then(function (resp) { return resp.json(); }) //haal de JSON op en stuur die als resultaat van je promise                         
        .then(function (data) {
            //nadat de vorige promise opgelost werd kwamen we in deze procedure tercht
            //hier kunnen we nu , met het resultat (data) van de vorige promise, aan de slag
            //we passen de voornaam aan en sturen ook dit terug zodat deze promise afgesloten kan worden                        
            document.getElementById("favoriet").style.display = "none";
            let urlUpdate=rooturl+'/profiel/update.php';

            data = { "id" : id,
                     "metadata" : "favoriet"
                     };
            
            var request = new Request(urlUpdate, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });

    
    
        fetch(request)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });

    })};

async function favorietControle(id)
{
    const gebruikerId = id;
    const response =
        await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + gebruikerId);
    if (response.ok) {
        const eenProfiel = await response.json();
        if (eenProfiel.metadata === "favoriet")
        {
            console.log(eenProfiel);
            document.getElementById("favoriet").style.display = "none";
        }
    }                                      
    else {
        foutDiv.innerText = "Er liep iets fout.";
    }
}
        