
eenProfielAfhalen();
async function eenProfielAfhalen() 
{
    
    console.log("tothier");
    const gebruikerId = localStorage.getItem("gebruiker");
   // console.log(gebruikerNickname);
    

    
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + gebruikerId);
    if (response.ok) {
        const eenProfiel = await response.json();
        console.log(eenProfiel);
        document.getElementById("begroeting").innerText = "Welkom " + eenProfiel.nickname;
        lijstGebruikers(eenProfiel);
    } 
    else 
    {
        document.getElementById("nietGevonden").style.display = "block";
    }
};

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
