"use strict";

//Is the user authenticated?
if (localStorage.getItem('gebruiker') === null || localStorage.getItem('gebruiker') === "undefined") {
    window.open("AccessDenied.html", "_self");
}
else {
    //The user is authenticated and the authentication has not expired.

    var rooturl = "https://scrumserver.tenobe.org/scrum/api";

    // function changeURL(sNewRoot) {
    //     rooturl = sNewRoot;
    //     console.log('root set to : ' + rooturl)
    // }

    berichtenInladen();

}


// gebruiker berichten inladen 
function berichtenInladen() {
    //console.log("berichten inladen")
    let profielId = localStorage.getItem('gebruiker');

    let url = rooturl + '/bericht/read.php?profielId=' + profielId;
    //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (data) { //console.log(data);
            gebruikersDieAlGestuurdHebbenZoeken(profielId, data);
        })
        .catch(function (error) { console.log(error); });
}

//andere gebruikers zoeken die al gestuurd hebben
function gebruikersDieAlGestuurdHebbenZoeken(profielId, data) {
    console.log("gebruikers die al gestuurd hebben zoeken");
    data.forEach(verschillendePersoon => {
        //console.log(verschillendePersoon);
        var berichtenPerPersoon = verschillendePersoon[0];
        var vanPersoonId = berichtenPerPersoon["vanId"];
        var naarPersoonId = berichtenPerPersoon["naarId"];
        var gezochtePersoonId;
        if (vanPersoonId === profielId) {
            gezochtePersoonId = naarPersoonId;
        } else {
            gezochtePersoonId = vanPersoonId;
        }
        haalGezochteGebruikerFoto(gezochtePersoonId, data);

    });
}

//gebruikerfoto's zetten in lijst om op te klikken (nog niet laatste gesprek eerst)
function haalGezochteGebruikerFoto(profielId, data) {
    console.log("haal gezochte gebruiker foto");
    document.querySelector("ul").innerHTML = "";
    eenProfielAfhalen();
    async function eenProfielAfhalen() {
        const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + profielId);
        if (response.ok) {
            const gebruiker = await response.json();
            console.log(gebruiker);
            const berichtenLijst = document.querySelector("ul");

            let index = 0;
            const hyperlink = document.createElement("a");
            hyperlink.href = "#";
            hyperlink.dataset.index = index++;
            hyperlink.dataset.id = gebruiker.id;
            hyperlink.onclick = function () {
                //window.location.replace("gezochtProfiel.html");
                const gebruikerId = this.dataset.id;
                localStorage.setItem("berichtenAndereGebruiker", gebruikerId);
                localStorage.setItem("fotoVanDeAndere", gebruiker.foto)

                var div = document.getElementById("chatGesprek");
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }

                laadBerichtenVanDezeGebruiker(data);
            }

            const li = document.createElement("li");
            const img = "<img src=\" https://scrumserver.tenobe.org/scrum/img/" + gebruiker.foto + "\" >";

            hyperlink.innerHTML = "<div class='mediumIcons'>" + img + " <br> " + gebruiker.nickname + "</div>";
            li.appendChild(hyperlink);
            berichtenLijst.appendChild(li);
        } else {
            document.getElementById("nietGevonden").style.display = "block";
        }
    }

}


// op gebruiker geklikt en nu laden we de berichten van dit gesprek
function laadBerichtenVanDezeGebruiker(data) {
    console.log("laad berichten van deze gebruiker");
    const naarGebruiker = localStorage.getItem("berichtenAndereGebruiker");
    const vanGebruiker = localStorage.getItem("gebruiker");
    //console.log(data);
    var gesprek;
    data.forEach(verschillendePersoon => {
        var berichtenPerPersoon = verschillendePersoon[0];
        var vanPersoonId = berichtenPerPersoon["vanId"];
        var naarPersoonId = berichtenPerPersoon["naarId"];
        var gezochtePersoonId;
        if (vanPersoonId === vanGebruiker) {
            gezochtePersoonId = naarPersoonId;
        } else {
            gezochtePersoonId = vanPersoonId;
        }
        if (gezochtePersoonId === naarGebruiker) {
            gesprek = verschillendePersoon;
            //console.log(gesprek);
        }
    });
    //console.log("dit gesprek is gevonden");
    //console.log(gesprek);
    toonChatgesprekMetDezeGebruiker(gesprek);
}

//berichten geladen, nu de berichten tonen
function toonChatgesprekMetDezeGebruiker(dataChatgesprekDezeGebruiker) {
    console.log("toon chatgesprek met deze gebruiker");
    //console.log(dataChatgesprekDezeGebruiker);
    dataChatgesprekDezeGebruiker.forEach(element => {
        //console.log("chatbericht:");
        //console.log(element["bericht"]);
        //console.log(element["status"]);
        //console.log(element["benIkZender"]);
        toonAlGeschrevenChatbericht(element);
    });
}

// bericht schrijven in html
function toonAlGeschrevenChatbericht(chatbubble) {
    console.log("chatbericht schrijven");
    const chatGesprekMetAndereGebruiker = document.getElementById("chatGesprek");


    const benIkZender = chatbubble["benIkZender"];
    const bubbleWrapper = document.createElement("div");
    bubbleWrapper.className = "bubbleWrapper";
    const inlineContainer = document.createElement("div");
    const foto = document.createElement("img");
    const span = document.createElement("span");
    const ownBubble = document.createElement("div");
    const otherBubble = document.createElement("div");
    if (benIkZender === "0") {
        //console.log("andere");
        inlineContainer.className = "inlineContainer";
        otherBubble.className = "otherBubble other";
        otherBubble.innerText = chatbubble["bericht"];
        span.className = "other";
        foto.src = "https://scrumserver.tenobe.org/scrum/img/" + localStorage.getItem("fotoVanDeAndere");
    } else {
        //console.log("ik");
        inlineContainer.className = "inlineContainer own";
        ownBubble.className = "ownBubble own";
        ownBubble.innerText = chatbubble["bericht"];
        span.className = "own";
        foto.src = "https://scrumserver.tenobe.org/scrum/img/" + localStorage.getItem("fotoVanDeGebruiker");
    }

    foto.className = "inlineIcon";
    span.innerText = chatbubble["status"];
    inlineContainer.appendChild(foto);
    if (benIkZender === "0") {
        inlineContainer.appendChild(otherBubble);
    } else {
        inlineContainer.appendChild(ownBubble);

    }
    bubbleWrapper.appendChild(inlineContainer);
    bubbleWrapper.appendChild(span);
    chatGesprekMetAndereGebruiker.appendChild(bubbleWrapper);
}


//stuur een bericht
document.getElementById("stuurTekst").addEventListener("click", function (e) {
    let vanId = localStorage.getItem('gebruiker');
    let naarId = localStorage.getItem('berichtenAndereGebruiker');
    let bericht = document.getElementById('teSturenTekst').value;

    let url = rooturl + '/bericht/post.php';
    //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
    let data = {
        vanId: vanId,
        naarId: naarId,
        bericht: bericht,
        status: "verzonden"
    }

    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (resp) { return resp.json(); })
        .then(function (data) { console.log(data);
                window.location.replace("chatbox.html") 
            })
        .catch(function (error) { console.log(error); });
});