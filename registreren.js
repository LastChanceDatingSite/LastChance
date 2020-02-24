"use strict";
//Is the user NOT authenticated?
if (localStorage.getItem('gebruiker') !== null && localStorage.getItem('gebruiker') !== "undefined") {
    window.open("gebruikers.html","_self");
}
else {
//The user is NOT authenticated.
}

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear()-18;
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("geboortedatum").setAttribute("max", today);

document.getElementById("buttonInschrijven").onclick = function() {
    if (invoerCorrect()) 
    {
        persoonToevoegen();
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

async function persoonToevoegen() {

        let naam =  document.getElementById("nickname").value; 
        let afbeelding =  document.getElementById("mijnfoto").value; 
        console.log(document.getElementById('mijnfoto').src);
        console.log(afbeelding);

        let link = 'https://scrumserver.tenobe.org/scrum/api/image/upload.php';
        
        let fotoGegevens = {
            "naam": naam,
            "afbeelding": afbeelding
        };

        var request = new Request(link, {
            method: 'POST',
            body: JSON.stringify(fotoGegevens),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then( function (resp)  { return resp.json(); })
            .then( function (fotoGegevens)  { console.log(fotoGegevens);  })
            .catch(function (error) { console.log(error); });


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
            console.log("heydaarqsdfsdf");
            localStorage.setItem("gebruiker", data.id);
            // window.location.replace("gebruikers.html");
        })
                .catch(function(error) {
                console.log(error);
        });




    

    
    
    

}