"use strict";


eenProfielAfhalen();
async function eenProfielAfhalen() {

    console.log("tothier");
    const gebruikerId = localStorage.getItem("gebruiker");
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + gebruikerId);
    if (response.ok) {
        const eenProfiel = await response.json();
        console.log(eenProfiel);
        document.getElementById("begroeting").innerText = "Welkom " + eenProfiel.nickname;
        lijstGebruikers(eenProfiel);
        sterrenbeeldAfhalen(eenProfiel);
    }
    else {
        document.getElementById("nietGevonden").style.display = "block";
    }
};



function lijstGebruikers(gebruiker) {

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

function sterrenbeeldAfhalen(gebruiker)
{
    
}

