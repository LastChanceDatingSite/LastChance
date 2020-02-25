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



document.getElementById("favorietVerwijderen").onclick = function()
{
    const favorietId = localStorage.getItem("favorietId");
    const foutDiv = document.getElementById("fout");
    
        
    const rooturl = "https://scrumserver.tenobe.org/scrum/api";
        let url=rooturl+'/favoriet/delete.php';
        
        let data = {
            id: favorietId
        }

        var request = new Request(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then( function (resp)  { return resp.json(); })
            .then( function (data)  { console.log(data); 
                foutDiv.innerText = "Favoriet verwijderd";
                document.getElementById("favorietVerwijderen").style.display = "none";  })
            .catch(function (error) { console.log(error); });
    
};
        