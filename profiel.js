"use script";

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