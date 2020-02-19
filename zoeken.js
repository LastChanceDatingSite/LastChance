"use strict";



document.getElementById("zoeken").onclick = async function()
{
    const rootUrl = 'https://scrumserver.tenobe.org/scrum/api/profiel/search.php?';
    const input = document.querySelectorAll("input");
    
    let urlArray = [];
    for (var area of input)
    
    {
        if (area.value !== "")
        {
            if (urlArray[0] !== "")
            {
                console.log(area.id);
                urlArray.push("&" + area.id + "=" + area.value) ;
            }
            else
                urlArray.push(area.id + "=" + area.value) ;
        }
        
    }
    const arrayToString = urlArray.join("");
    const Url = rootUrl + arrayToString ;
    const response =  await fetch(Url)
    if (response.ok) {
        const gebruikers = await response.json();
        lijstGebruikers(gebruikers);
        
    } else {
        document.getElementById("nietGevonden").style.display = "block";
    }
}

function lijstGebruikers(gebruikers)
{   
    const gebruikersLijst = document.querySelector("ul");
    let index = 0;
    for (var gebruiker of gebruikers)
    {
        const hyperlink = document.createElement("a");
        hyperlink.innerText = gebruiker.voornaam;
        hyperlink.href = "#";
        hyperlink.dataset.index = index++;
        hyperlink.onclick = function () 
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
            document.getElementById("avatar").src = "https://scrumserver.tenobe.org/scrum/img/" +gebruiker.foto;
        };
        const li = document.createElement("li");
        li.appendChild(hyperlink);
        gebruikersLijst.appendChild(li);
    }
}

