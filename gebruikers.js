"use strict";


//Is the user authenticated?
if (localStorage.getItem('gebruiker') === null| localStorage.getItem('gebruiker') === "undefined") {
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
        document.getElementById("begroeting").innerText = "Welkom " + eenProfiel.nickname;
        lijstGebruikers(eenProfiel);
        
        document.getElementById("sterrenbeeld").src = sterrenbeeldAfhalen(eenProfiel);
        return eenProfiel;
    }
    else {
        document.getElementById("updateFout").innertext = "Er was een probleem.";
    }
};


// gepaste values worden in geladen
function lijstGebruikers(gebruiker) {

    console.log(gebruiker.achternaam);
    console.log(gebruiker.beroep);
    document.getElementById("gebruikerWeergave").style.display = "block";
    document.getElementById("gebruikerBeroep").innerText = gebruiker.beroep;
    document.getElementById("gebruikerSexe").innerText = gebruiker.sexe;
    document.getElementById("gebruikerOogkleur").innerText = gebruiker.oogkleur;
    document.getElementById("gebruikerHaarkleur").innerText = gebruiker.haarkleur;
    document.getElementById("gebruikerGewicht").innerText = gebruiker.gewicht;
    document.getElementById("gebruikerGrootte").innerText = gebruiker.grootte;
    console.log(gebruiker.foto);
    document.getElementById("avatar").src = "https://scrumserver.tenobe.org/scrum/img/" + gebruiker.foto;

    console.log(gebruiker.achternaam);
    document.getElementById("achternaam").value = gebruiker.familienaam;
    document.getElementById("voornaam").value = gebruiker.voornaam;
    document.getElementById("geboortedatum").value = gebruiker.geboortedatum;
    document.getElementById("emailadres").value = gebruiker.email;
    document.getElementById("nickname").value = gebruiker.nickname;
    document.getElementById("beroep").value = gebruiker.beroep;
    document.getElementById("sexe").value = gebruiker.sexe;
    document.getElementById("mijnfoto").src = gebruiker.foto;
    document.getElementById("haarkleur").value = gebruiker.haarkleur;
    document.getElementById("oogkleur").value = gebruiker.oogkleur;
    document.getElementById("grootte").value = gebruiker.grootte;
    document.getElementById("gewicht").value = gebruiker.gewicht;
    document.getElementById("wachtwoord").value = gebruiker.wachtwoord;
    

}

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

// korte lijst wordt veborgen profiel bewerken getoond
document.getElementById("bewerken").onclick = function()
     {
        document.getElementById("bewerken").style.display = "none";
        document.getElementById("gebruikerWeergave").style.display = "none";
        document.getElementById("formulierBewerken").style.display = "block";
    }

// profiel updaten
    document.getElementById("update").addEventListener('click', function (e) {  
        
        let profielId =  localStorage.getItem("gebruiker");
        let nieuweVoornaam =  document.getElementById("voornaam").value;
        let nieuweNickname = document.getElementById("nickname").value;
        const rooturl = "https://scrumserver.tenobe.org/scrum/api";  
        let url=rooturl+'/profiel/read_one.php?id='+profielId;
                      
        fetch(url)
            .then(function (resp) { return resp.json(); }) //haal de JSON op en stuur die als resultaat van je promise                         
            .then(function (data) {
                //nadat de vorige promise opgelost werd kwamen we in deze procedure tercht
                //hier kunnen we nu , met het resultat (data) van de vorige promise, aan de slag
                //we passen de voornaam aan en sturen ook dit terug zodat deze promise afgesloten kan worden                        
                let urlUpdate=rooturl+'/profiel/update.php';

               /* data['voornaam', 'nickname']= {nieuweVoornaam, 
                                                nieuweNickname}; */
                data['voornaam'] = {nieuweVoornaam};
                
                console.log(data);

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
                        if (data.message === "Het profiel kon niet ge&uuml;pdatet worden. De nickname bestaat reeds.")
                        {
                            document.getElementById("updateFout").innerText = "Deze nickname bestaat al.";
                        } })
                    .catch(function (error) { console.log(error);
                                                console.log(JSON); });



            })
            .catch(function (error) {
                console.log(error);
            });
    });