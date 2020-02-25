"use strict";
let Base64;
//Is the user NOT authenticated?
// if (localStorage.getItem('gebruiker') !== null && localStorage.getItem('gebruiker') !== "undefined") {
//     window.open("gebruikers.html", "_self");
// }
// else {
//     //The user is NOT authenticated.
// }

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear() - 18;
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("geboortedatum").setAttribute("max", today);

//Als alles correct ingevuld is voegt hij de functie persoonToevoegen uit
document.getElementById("buttonInschrijven").onclick = function () {
    if (invoerCorrect()) {
        existTesten();
    }
}

//Controleert als alle velden correct ingevuld zijn
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

async function existTesten() {
let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/exists.php';
let nicknameData = {
    "nickname": document.getElementById("nickname").value
}

var request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(nicknameData),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
});

fetch(request)
    .then(function (resp) { return resp.json(); })
    .then(async function (nicknameData) {
        const FotoFileUrl = await nicknameData.fileName;
        if (nicknameData.message === "Profiel nickname beschikbaar") {
            persoonToevoegen();    
        }
        else {
            document.getElementById("nicknameFout").innerText = "Deze nickname bestaal al!"
            document.getElementById("nicknameFout").style.display = "inline";
        }

        console.log(nicknameData);
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


async function NieuweProfiel(FotoFileUrl) {
    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/create.php';

    let data = {
          beroep: document.getElementById("beroep").value,
        sexe: document.getElementById("sexe").value,
        haarkleur: document.getElementById("haarkleur").value,
     familienaam: document.getElementById("achternaam").value,
        voornaam: document.getElementById("voornaam").value,
        geboortedatum: document.getElementById("geboortedatum").value,
        email: document.getElementById("emailadres").value,
        nickname: document.getElementById("nickname").value,
        foto: FotoFileUrl,
         oogkleur: document.getElementById("oogkleur").value,
        grootte: document.getElementById("grootte").value,
        gewicht: document.getElementById("gewicht").value,
        wachtwoord: document.getElementById("wachtwoord").value,
        metadata: document.getElementById("metadata").value,
        lovecoins: "3"

    };

    var request = new Request(url, {
        method: 'POST',
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
            localStorage.setItem("gebruiker", data.id);
            window.location.replace("gebruikers.html");
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function persoonToevoegen() {

    let naam = document.getElementById("mijnfoto").files.item(0).name;
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
            const FotoFileUrl = await fotoGegevens.fileName;
            if (fotoGegevens.message === "De afbeelding werd opgeslaan") {
                NieuweProfiel(FotoFileUrl)
            }

            console.log(fotoGegevens);
        })


        .catch(function (error) { console.log(error); });
    
}