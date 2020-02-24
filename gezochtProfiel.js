"use strict";



eenProfielAfhalen();

// juiste profiel wordt afgehaald
async function eenProfielAfhalen() 
{
    const gebruikerId = localStorage.getItem("gebruiker");
   /* console.log(gezochteGebruiker);
    const gebruikerId = gezochteGebruiker.id;*/
    const response =
        await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + gebruikerId);
    if (response.ok) {
        const eenProfiel = await response.json();
        console.log(eenProfiel);
        profielWeergeven(eenProfiel);
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
