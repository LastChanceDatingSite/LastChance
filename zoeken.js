"use strict";

// een zoek url maken en gebruiken om profielen te fetchen
document.getElementById("zoeken").onclick = async function()
{
    document.querySelector("ul").innerHTML = "";
    const rootUrl = 'https://scrumserver.tenobe.org/scrum/api/profiel/search.php?';
    const input = document.querySelectorAll(".search");
    const geenResultaten = document.getElementById("geenResultaten");
    geenResultaten.innerText = "";
    
    //zoekvelden worden overlopen waardes in url opgenomen
    let urlArray = [];
    for (var area of input)
    {
        if (area.value !== "" || area.value !== 0)
        {
              /*  if (area.id === "nickname")
                {
                    urlArray.push("&" + area.id + "=" + area.value + "&nicknameFuzzy=1" );
                }*/
                if (area.id ==="rangeMinGrootte" )
                {
                    console.log(area.id);
                    urlArray.push("&grootteOperator=range");
                }
                if (area.id === "rangeMinGeboortedatum")
                {
                    urlArray.push("&geboortedatumOperator=range");
                }
                urlArray.push("&" + area.id + "=" + area.value) ;
        }
                else
                {
                    urlArray.push("&" + area.id + "=" + area.value);
                }
        
    }
    const arrayToString = urlArray.join("");
    const Url = rootUrl + arrayToString ;
    console.log(Url);
    // profielen worden af gehaald mogelijke foutmeldingen weergeven
    const response =  await fetch(Url)
    if (response.ok) {
        const gebruikers = await response.json();
        console.log(gebruikers);
        if (gebruikers.message === "Geen profielen gevonden.")
        {
            console.log("geen resultaten");
            geenResultaten.innerText = "Er voldeden geen profielen aan uw standaarden..";
        }
        else
        {
            lijstGebruikers(gebruikers);
        }
    } else {
        geenResultaten.innerText = "Er liep iets fout.";
    }
}

// functie maakt een lijst van hyperlinks op basis van zoek url
function lijstGebruikers(gebruikers)
{   
    console.log(gebruikers);
    const gebruikersLijst = document.querySelector("ul");
    
    let index = 0;
    for (var gebruiker of gebruikers)
    {
        const hyperlink = document.createElement("a");
        hyperlink.href = "#";
        hyperlink.dataset.index = index++;
        hyperlink.dataset.id = gebruiker.id;
        hyperlink.onclick = function () 
        {
            window.location.replace("gezochtProfiel.html");
            const gebruikerId = this.dataset.id;
            localStorage.setItem("gebruiker", gebruikerId);
        }
       
        const li = document.createElement("li");
        const img="<img src=\" https://scrumserver.tenobe.org/scrum/img/" + gebruiker.foto + "\" >";
        hyperlink.innerHTML = img + " <br> " + gebruiker.nickname;
        li.appendChild(hyperlink);
        gebruikersLijst.appendChild(li);
    }
    
}

