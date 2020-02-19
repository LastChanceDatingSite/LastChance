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

    /* let quotes=["Chuck Norris can divide by zero.",
    "Chuck Norris can kill two stones with one bird.",
    "Outer space exists because it's afraid to be on the same planet with Chuck Norris.",
    "Chuck Norris counted to infinity ... three times.",
    "Chuck Norris can slam a revolving door.",
    "There is no theory of evolution. Just a list of creatures Chuck Norris has allowed to live.",
    "Chuck Norris is so fast, he can run around the world and punch himself in the back of the head.",
    "If you have five dollars and Chuck Norris has five dollars, Chuck Norris has more money than you."];

    let min = 0;
    let max = quotes.length-1;
    let rndIndex = Math.floor(Math.random() * (max - min + 1) + min);

    let data = {
        familienaam: "Norris",
        voornaam: "Chuck" ,
        geboortedatum: "0001-01-01",
        email: "me@Chuck.Norris",
        nickname: "The Chuck" + Date.now(),
        foto: "no_picture.jpg",
        beroep: "Moviestar",
        sexe: "x",
        haarkleur: "brown",
        oogkleur: "blue",
        grootte: "1095",
        gewicht: "",
        wachtwoord: "iamgod",
        metadata: "",
        lovecoins: "1000000"
    } */

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