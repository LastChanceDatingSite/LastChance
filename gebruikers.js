"use strict";
let Base64;
let FotoFileUrl;
let naam;

if (sessionStorage.getItem('gebruiker') === null || sessionStorage.getItem('gebruiker') === "undefined") {
    window.open("AccessDenied.html","_self");
}
else {
//The user is authenticated and the authentication has not expired.
    if (sessionStorage.getItem("berichtenAndereGebruiker" === null || sessionStorage.getItem('berichtenAndereGebruiker') === "undefined")){
    } else{
        sessionStorage.removeItem("berichtenAndereGebruiker");
    }
}


function invoerCorrect() {
    const verkeerdeElementen = document.querySelectorAll("input:invalid,select:invalid");
    for (const element of verkeerdeElementen) {
        document.getElementById(`${element.id}Fout`).style.display = "inline";
    }
    const correcteElementen =
        document.querySelectorAll("input:valid,select:valid");
    for (const element of correcteElementen) {
        document.getElementById(`${element.id}Fout`).style.display = "";
    }
    return verkeerdeElementen.length === 0;
}
    

eenProfielAfhalen();
async function eenProfielAfhalen() {

    const gebruikerId = sessionStorage.getItem("gebruiker");
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + gebruikerId);
    if (response.ok) {
        const eenProfiel = await response.json();
        console.log(eenProfiel);
        document.getElementById("begroeting").innerText = "Welkom " + eenProfiel.nickname;
        lijstGebruikers(eenProfiel);
        document.getElementById("update").style.display = "none";
        document.getElementById("sterrenbeeld").src = sterrenbeeldAfhalen(eenProfiel);
        sessionStorage.setItem("lovecoins", eenProfiel.lovecoins);
        return eenProfiel;
    }
    else {
        document.getElementById("updateFout").innertext = "Er was een probleem.";
    }
};


// function alles in display:none zetten
function startDisplay() {
    //profiel
    document.getElementById("home").style.display = "inline-block"; //bovenste knop
    document.getElementById("gebruikerWeergave").style.display = "none"; 
    //update
    document.getElementById("bewerken").style.display = "inline-block"; //bovenste knop
    document.getElementById("formulierBewerken").style.display = "none"; 
    document.getElementById("update").style.display = "none";
    //favorieten
    document.getElementById("favorieten").style.display = "inline-block"; //bovenste knop
    document.getElementById("toonFavorieten").style.display = "none"; 
}


// gepaste values worden in geladen
function lijstGebruikers(gebruiker) {

    // kort profiel
    document.getElementById("gebruikerWeergave").style.display = "block";
    document.getElementById("gebruikerBeroep").innerText = gebruiker.beroep;
    document.getElementById("gebruikerSexe").innerText = gebruiker.sexe;
    document.getElementById("gebruikerOogkleur").innerText = gebruiker.oogkleur;
    document.getElementById("gebruikerHaarkleur").innerText = gebruiker.haarkleur;
    document.getElementById("gebruikerGewicht").innerText = gebruiker.gewicht;
    document.getElementById("gebruikerGrootte").innerText = gebruiker.grootte;
    document.getElementById("lovecoins").innerText = gebruiker.lovecoins;
    document.getElementById("avatar").src = "https://scrumserver.tenobe.org/scrum/img/" + gebruiker.foto;
    //foto lokaal opslaan
    sessionStorage.setItem("fotoVanDeGebruiker", gebruiker.foto);

    // profiel bewerken
    document.getElementById("achternaam").value = gebruiker.familienaam;
    document.getElementById("voornaam").value = gebruiker.voornaam;
    document.getElementById("geboortedatum").value = gebruiker.geboortedatum;
    document.getElementById("emailadres").value = gebruiker.email;
    document.getElementById("nickname").value = gebruiker.nickname;
    document.getElementById("beroep").value = gebruiker.beroep;
    document.getElementById("sexe").value = gebruiker.sexe;
   // console.log(gebruiker.foto);
    document.getElementById("mijnfoto").src = gebruiker.foto;
   // console.log(document.getElementById("mijnfoto").src);
    document.getElementById("haarkleur").value = gebruiker.haarkleur;
    document.getElementById("oogkleur").value = gebruiker.oogkleur;
    document.getElementById("grootte").value = gebruiker.grootte;
    document.getElementById("gewicht").value = gebruiker.gewicht;
    document.getElementById("wachtwoord").value = gebruiker.wachtwoord;

    FotoFileUrl = gebruiker.foto;
}

// sterrenbeelden afhalen en weergeven onder kort profiel
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


//profiel wordt getoond
document.getElementById("home").onclick=function(){
    startDisplay();
    //update
    document.getElementById("home").style.display = "none"; //bovenste knop
    document.getElementById("gebruikerWeergave").style.display = "inline"; 
    window.location.replace("gebruikers.html");
}


// korte lijst wordt verborgen profiel bewerken getoond
document.getElementById("bewerken").onclick = function () {
    startDisplay();
    document.getElementById("bewerken").style.display = "none"; //bovenste knop
    document.getElementById("formulierBewerken").style.display = "inline"; 
    document.getElementById("update").style.display = "inline-block";
    document.getElementById("begroeting").style.display = "none";
}

     
// profiel updaten
    document.getElementById("update").addEventListener('click', function (e) {  
        if (invoerCorrect()) {
            naam = document.getElementById("mijnfoto").value;
            if(naam){
            persoonToevoegen();
        }
        else{
            profielUpdaten();
        }
        }
        
});

function profielUpdaten() {
let profielId =  sessionStorage.getItem("gebruiker");
        let nieuweVoornaam =  document.getElementById("voornaam").value;
        let nieuweAchternaam =  document.getElementById("achternaam").value;
        let nieuweNickname = document.getElementById("nickname").value;
        let nieuweGeboortedatum = document.getElementById("geboortedatum").value;
        let nieuweBeroep = document.getElementById("beroep").value;
        let nieuweFoto = FotoFileUrl;
        let nieuweEmail = document.getElementById("emailadres").value;
        let nieuweSexe = document.getElementById("sexe").value;
        let nieuweHaarkleur = document.getElementById("haarkleur").value;
        let nieuweOogkleur = document.getElementById("oogkleur").value;
        let nieuweGrootte = document.getElementById("grootte").value;
        let nieuweGewicht = document.getElementById("gewicht").value;
        let nieuweWachtwoord = document.getElementById("wachtwoord").value;
        const rooturl = "https://scrumserver.tenobe.org/scrum/api";  
        let url=rooturl+'/profiel/read_one.php?id='+profielId;
                      
        fetch(url)
            .then(function (resp) { return resp.json(); }) //haal de JSON op en stuur die als resultaat van je promise                         
            .then(function (data) {
                //nadat de vorige promise opgelost werd kwamen we in deze procedure tercht
                //hier kunnen we nu , met het resultat (data) van de vorige promise, aan de slag
                //we passen de voornaam aan en sturen ook dit terug zodat deze promise afgesloten kan worden                        
                let urlUpdate=rooturl+'/profiel/update.php';

                data = { "id" : profielId,
                         "familienaam" : nieuweAchternaam,
                         "voornaam" : nieuweVoornaam,
                         "geboorteDatum" : nieuweGeboortedatum,
                         "email" : nieuweEmail,
                         "nickname" : nieuweNickname,
                         "foto" : nieuweFoto,
                         "beroep" : nieuweBeroep,
                         "sexe" : nieuweSexe,        
                         "haarkleur" : nieuweHaarkleur,
                         "oogkleur" : nieuweOogkleur,
                         "gewicht" : nieuweGewicht,
                         "grootte" : nieuweGrootte,
                         "wachtwoord" : nieuweWachtwoord
                         };
                
                var request = new Request(urlUpdate, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
            
        
        
            fetch(request)
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
              console.log(data);
              if (data.message === "Het profiel kon niet ge&uuml;pdatet worden. De nickname bestaat reeds.")
              {
                document.getElementById("nicknameFout").style.display = "inline";
                document.getElementById("nicknameFout").innerText = "Deze nickname bestaat al!";
                console.log("probleempje");
              }
            })
            .catch(function (error) {
                console.log(error);
            });

        });
    }

// favorieten weergeven
document.getElementById("favorieten").addEventListener('click', function (e) {
    startDisplay();
    document.getElementById("favorieten").style.display = "none";
    document.getElementById("toonFavorieten").style.display = "inline";

    const favorietenLijst = document.querySelector("ul");
    favorietenlijst.style.display = "inline-block";
    let profielId = sessionStorage.getItem("gebruiker");
    const rooturl = "https://scrumserver.tenobe.org/scrum/api";
    let url = rooturl + '/favoriet/read.php?profielId=' + profielId;

    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {
            let index = 0;
            for (const eenFavoriet of data) {
                eenProfielAfhalen();
                async function eenProfielAfhalen() {

                    const gebruikerId = eenFavoriet.anderId;
                    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + gebruikerId);
                    if (response.ok) {
                        const eenProfiel = await response.json();
                        favorietenLijstMaken(eenProfiel, data[index].id, data[index].status);
                        return eenProfiel;
                    }
                    else {
                        document.getElementById("updateFout").innertext = "Er was een probleem.";
                    }
                };

                function favorietenLijstMaken(eenProfiel, id, status) {

                    console.log(eenProfiel);
                    console.log(status);
                    let statusNaControle =  statusControle(status);
                    console.log(statusNaControle);
                    const li = document.createElement("li");
                    const hyperlink = document.createElement("a");
                    const img="<img src=\" https://scrumserver.tenobe.org/scrum/img/" + eenProfiel.foto + "\" >";
                    hyperlink.innerText = eenProfiel.nickname;
                    hyperlink.href = "#";
                    hyperlink.dataset.index = index++;
                    const favorietId = id;
                    console.log(id);
                    hyperlink.onclick = function()
                    {
                        sessionStorage.setItem("favorietId", favorietId)
                        console.log(favorietId);
                        
                        sessionStorage.setItem("gezochteGebruiker", eenProfiel.id);
                        window.location.replace("favorietProfiel.html");
                    }
                    hyperlink.innerHTML = "<div class='mediumIcons'>" + img + " <br> " + eenProfiel.nickname + " <br> <div id='statusControle'> " + statusNaControle + "</div></div>";
                    li.appendChild(hyperlink);
                    favorietenLijst.appendChild(li);
                }
            }
        })
        .catch(function (error) { console.log(error); });
});

function statusControle(status) {
    if (status === "ik heb de ander niet als favoriet")
    {
        console.log(status);
        return status = "mogelijke match";
    }
    else
    {
        return status;
    }
}


async function persoonToevoegen() {
    naam = document.getElementById("mijnfoto").files.item(0).name;
    let link = 'https://scrumserver.tenobe.org/scrum/api/image/upload.php';
    console.log(naam);


    let fotoGegevens = {
        "naam": naam,
        "afbeelding": Base64
    };

    var request = new Request(link, {
        method: 'POST',
        body: JSON.stringify(fotoGegevens),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (resp) { return resp.json(); })
        .then(async function (fotoGegevens) {
             FotoFileUrl = await fotoGegevens.fileName;
            if (fotoGegevens.message === "De afbeelding werd opgeslaan") {
                profielUpdaten(FotoFileUrl);
            }

            console.log(fotoGegevens);
        })


        .catch(function (error) { console.log(error); });
    
}

//Encoderen naar Base64
function getBase() {
    const input = document.querySelector('input[type=file]')
    const file = input.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        Base64 = reader.result
        console.log(Base64);
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}