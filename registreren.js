"use strict";

document.getElementById("buttonInschrijven").onclick = function() {
    if (invoerCorrect()) 
    {
        persoonToevoegen();
    }
}

function invoerCorrect() {
    const verkeerdeElementen =
        document.querySelectorAll("input:invalid,select:invalid");
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

async function persoonToevoegen() {
    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/create.php';

    let data = {
        familienaam: document.getElementById("achternaam").value,
        voornaam: document.getElementById("voornaam").value,
        geboortedatum: document.getElementById("geboortedatum").value,
        email: document.getElementById("emailadres").value,
        nickname: document.getElementById("nickname").value,
        foto: document.getElementById("mijnfoto").value,
        beroep: document.getElementById("beroep").value,
        sexe: document.getElementById("sexe").value,
        haarkleur: document.getElementById("haarkleur").value,
        oogkleur: document.getElementById("oogkleur").value,
        grootte: document.getElementById("grootte").value,
        gewicht: document.getElementById("gewicht").value,
        wachtwoord: document.getElementById("wachtwoord").value,
        metadata: document.getElementById("metadata").value,
        lovecoins: "3"
    };

    console.log(data.lovecoins);

   

    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            console.log(data);
        })
        .catch(function(error) {
            console.log(error);
        });
}