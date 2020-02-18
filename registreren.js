"use strict";

document.getElementById("Registreren").onclick = new function() {
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

    if (invoerCorrect) {
        toevoegen();
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


async function profielToevoegen() {
    {
        id: document.getElementById("id").nodeValue;
        familienaam: document.getElementById("familienaam").nodeValue;
        voornaam: document.getElementById("voornaam").nodeValue;
        geboortedatum: document.getElementById("geboortedatum").nodeValue;
        email: document.getElementById("email").nodeValue;
        nickname: document.getElementById("nickname").nodeValue;
        foto: document.getElementById("foto").nodeValue;
        beroep: document.getElementById("beroep").nodeValue;
        sexe: document.getElementById("sexe").nodeValue;
        haarkleur: document.getElementById("haarkleur").nodeValue;
        oogkleur: document.getElementById("oogkleur").nodeValue;
        grootte: document.getElementById("grootte").nodeValue;
        gewicht: document.getElementById("gewicht").nodeValue;
        wachtwoord: document.getElementById("wachtwoord").nodeValue;
        metadate: document.getElementById("metadate").nodeValue;
        lovecoins: document.getElementById("lovecoins").nodeValue;
    }
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/create.php");
    if (response.ok) {
        const profielen = await response.json();
        console.log(profielen);
    } else {
        document.getElementById("nietGevonden").style.display = "block";
    }
}