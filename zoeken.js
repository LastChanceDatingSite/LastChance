"use strict";


document.getElementById("zoeken").onclick = async function()
{
    document.querySelector("ul").innerHTML = "";
   
    const rootUrl = 'https://scrumserver.tenobe.org/scrum/api/profiel/search.php?';
    const input = document.querySelectorAll(".search");

    const geenResultaten = document.getElementById("geenResultaten");
    
    
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
    console.log(Url);
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
        hyperlink.innerText = gebruiker.nickname;
        hyperlink.href = "#";
        hyperlink.dataset.index = index++;
        hyperlink.dataset.id = gebruiker.id;
        hyperlink.onclick = function () 
        {
            window.location.replace("gezochtProfiel.html");
            const gebruikerId = this.dataset.id;
            console.log(this);
            console.log(this.dataset.id);
            console.log(gebruikerId);
            localStorage.setItem("gebruiker", gebruikerId);
        }
       
        const li = document.createElement("li");
        li.appendChild(hyperlink);
       // gebruikersLijst.appendChild(li);
        console.log(gebruiker);
        const img = document.createElement("img");
        img.src = "https://scrumserver.tenobe.org/scrum/img/" + gebruiker.foto;
       // const imgLi = document.createElement("li");
        li.appendChild(img);
        gebruikersLijst.appendChild(li);
        
       

    }
    
}

