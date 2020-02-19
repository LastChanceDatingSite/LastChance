"use strict";

/*profielenAfhalen();
async function profielenAfhalen() {
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read.php");
    if (response.ok) {
        const profielen = await response.json();
        console.log(profielen);
    } else {
        document.getElementById("nietGevonden").style.display = "block";
    }
};


profielenZoeken();
async function profielenZoeken() {
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/search/.php");
    if (response.ok) {
        const profielen = await response.json();
        console.log(profielen);
    } else {
        document.getElementById("nietGevonden").style.display = "block";
    }
}


eenProfielAfhalen();
async function eenProfielAfhalen() {
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one?profielId=2.php");
    if (response.ok) {
        const eenProfiel = await response.json();
        console.log(eenProfiel);
    } else {
        document.getElementById("nietGevonden").style.display = "block";
    }
};

leesGegevens1();
        
            
        async function leesGegevens1()
        {
            const zoekProfiel = await fetch( 'https://scrumserver.tenobe.org/scrum/api/profiel/search.php?sexe="m"' );
           // https://scrumserver.tenobe.org/scrum/api
            const gezochtProfiel = await fetch(zoekProfiel); 
            console.log(gezochtProfiel);
        };
        
      //  let url=rooturl+'/profiel/search.php?geboortedatum='+ geboortedatum + '&geboortedatumOperator='+ geboortedatumOperator;


*/

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
    console.log(Url);
    const response =  await fetch(Url)
    if (response.ok) {
        const gebruikers = await response.json();
        lijstGebruikers(gebruikers);
        
    } else {
        document.getElementById("nietGevonden").style.display = "block";
    }

          /*  .then(function (resp)   { return resp.json(); })
            .then(function (data)   { console.log(data);  })
            .then(function (data)   { lijstGebruikers(data);  })
            .then(function(data)    { console.log(gebruikersArray[0]); })
            .catch(function (error) { console.log(error); })*/
            
            
}

function lijstGebruikers(gebruikers)
{   
    let index = 0;
    for (var gebruiker of gebruikers)
    //gebruiker = gebruiker.data;
    console.log(gebruiker.voornaam);
    const hyperlink = document.createElement("a");
    hyperlink.innerText = gebruiker.voornaam;
    hyperlink.href = "#";
    hyperlink.dataset.index = index++;
    hyperlink.onclick = function () 
    {
    const gebruiker = users.data[this.dataset.index];
    document.getElementById("gebruikerWeergave").style.display = "block";
    document.getElementById("gebruikerNickname").innerText = gebruiker.nickname;
    document.getElementById("gebruikerBeroep").innerText = gebruiker.beroep;
    document.getElementById("gebruikerSexe").innerText = gebruiker.sexe;
    document.getElementById("gebruikerOogkleur").innerText = gebruiker.oogkleur;
    document.getElementById("gebruikerHaarkleur").innerText = gebruiker.haarkleur;
    document.getElementById("gebruikerGewicht").innerText = gebruiker.gewicht;
    document.getElementById("gebruikerGrootte").innerText = gebruiker.grootte;
};
const li = document.createElement("li");
const gebruikersLijst = document.getElementById("gebruikersLijst");
li.appendChild(hyperlink);
gebruikersLijst.appendChild(li);
}





//page='+page+'&pageSize='+pageSize

    /*  document.getElementById("zoeken").onclick = async function()
      {
        
        let geslacht  =  document.getElementById('sexe').value;
        const rooturl = 'https://scrumserver.tenobe.org/scrum/api';
        let url =rooturl+'/profiel/search.php?sexe='+geslacht;
        
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { console.log(data);  })
            .catch(function (error) { console.log(error); })
      };
    //  zoekOpGeslacht();*/