"use strict";
let currentLovecoins;
//Is the user authenticated?
if (sessionStorage.getItem('gebruiker') === null || sessionStorage.getItem('gebruiker') === "undefined") {
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


    var berichtenAndereGebruiker = sessionStorage.getItem("berichtenAndereGebruiker");
    if (berichtenAndereGebruiker !== null && berichtenAndereGebruiker !== 'undefined') {
        deleteChatbubbles();
        //haalGezochteGebruikerFoto();
        justFetchData();

    }
    haalNieuweBerichtenOp();
}

function justFetchData() {
    let profielId = sessionStorage.getItem('gebruiker');

    let url = rooturl + '/bericht/read.php?profielId=' + profielId;
    //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (data) { //console.log(data);
            haalGezochteGebruikerFoto(berichtenAndereGebruiker, data);
        })
        .catch(function (error) { console.log(error); });
}

// gebruiker berichten inladen 
function berichtenInladen() {
    console.log("berichten inladen")
    let profielId = sessionStorage.getItem('gebruiker');

    let url = rooturl + '/bericht/read.php?profielId=' + profielId;
    //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {
            //console.log(data);
            gebruikersDieAlGestuurdHebbenZoeken(profielId, data);
            controleerDeStatusOpOntvangen(data)
            //console.log(profielId);
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
        if (berichtenAndereGebruiker !== gezochtePersoonId) {
            haalGezochteGebruikerFoto(gezochtePersoonId, data);
            //console.log(gezochtePersoonId);
        }

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
            //console.log(gebruiker);
            document.getElementById("naarWieStuurIk").innerText = gebruiker["nickname"];
            const berichtenLijst = document.querySelector("ul");

            let index = 0;
            const hyperlink = document.createElement("a");
            hyperlink.href = "#";
            hyperlink.dataset.index = index++;
            hyperlink.dataset.id = gebruiker.id;
            hyperlink.onclick = function () {
                deleteChatbubbles();
                laadHetBericht(this.dataset.id, gebruiker["nickname"], gebruiker.foto, data);
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

function laadHetBericht(gebruikerId, nickname, foto, data) {
    console.log("laadHetBericht");
    document.getElementById("naarWieStuurIk").innerText = nickname;
    sessionStorage.setItem("berichtenAndereGebruiker", gebruikerId);
    sessionStorage.setItem("fotoVanDeAndere", foto)

    console.log(data);
    controleerDeStatusOpGelezen(data);
    haalNieuweBerichtenOp();
}

function deleteChatbubbles() {
    var div = document.getElementById("chatGesprek");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function haalNieuweBerichtenOp() {
    console.log("haal het laatste bericht op en schrijf");

    console.log("berichten inladen")
    let profielId = sessionStorage.getItem('gebruiker');
    let url = rooturl + '/bericht/read.php?profielId=' + profielId;
    //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (data) { //console.log(data);
            laadBerichtenVanDezeGebruiker(data);
        })
        .catch(function (error) { console.log(error); });
}


// op gebruiker geklikt en nu laden we de berichten van dit gesprek
function laadBerichtenVanDezeGebruiker(data) {
    console.log("laad berichten van deze gebruiker");
    const naarGebruiker = sessionStorage.getItem("berichtenAndereGebruiker");
    const vanGebruiker = sessionStorage.getItem("gebruiker");
    //console.log(data);
    var eenEersteGesprek = 1;//1=waar, 0=niet waar
    var gesprek, gezochtePersoonId;
    data.forEach(verschillendePersoon => {
        var berichtenPerPersoon = verschillendePersoon[0];
        var vanPersoonId = berichtenPerPersoon["vanId"];
        var naarPersoonId = berichtenPerPersoon["naarId"];
        if (vanPersoonId === vanGebruiker) {
            gezochtePersoonId = naarPersoonId;
        } else {
            gezochtePersoonId = vanPersoonId;
        }
        if (gezochtePersoonId === naarGebruiker) {
            gesprek = verschillendePersoon;
            eenEersteGesprek = 0;
            //console.log(gesprek);
        }
        //console.log("een eerste gesprek: " + eenEersteGesprek)
    });

    if (eenEersteGesprek === 1) {
        console.log("undefined");

        //toonChatgesprekMetDezeGebruiker(gesprek);
        deleteChatbubbles();
    } else {
        //console.log("dit gesprek is gevonden");
        //console.log(gesprek);
        toonChatgesprekMetDezeGebruiker(gesprek);
    }
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
    // when a new message comes in...
    var chatEl = document.getElementById("chatGesprek").lastChild;
    chatEl.scrollIntoView();
}


// bericht schrijven in html
function toonAlGeschrevenChatbericht(chatbubble) {
    console.log("chatbericht schrijven");
    const chatGesprekMetAndereGebruiker = document.getElementById("chatGesprek");
    const benIkZender = chatbubble["benIkZender"];
    const bubbleWrapper = document.createElement("div");
    bubbleWrapper.className = "bubbleWrapper";
    const berichtId = document.createElement('span')
    berichtId.className = "verborgen";
    berichtId.id = "berichtId";
    berichtId.value = chatbubble["berichtId"];
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
        span.innerText = chatbubble["status"];
        span.className = "other";
        foto.src = "https://scrumserver.tenobe.org/scrum/img/" + sessionStorage.getItem("fotoVanDeAndere");
    } else {
        //console.log("ik");
        inlineContainer.className = "inlineContainer own";
        ownBubble.className = "ownBubble own";
        ownBubble.innerText = chatbubble["bericht"];
        span.className = "own";
        span.innerText = chatbubble["status"];
        var linkDelete = document.createElement("a");
        linkDelete.innerHTML = '<i class="fas fa-minus-circle"></i>';
        linkDelete.className = "delete";
        linkDelete.href = "#0";
        linkDelete.onclick = function () {
            deleteEenBericht(chatbubble["berichtId"]);
            deleteChatbubbles();
        };
        span.appendChild(linkDelete);
        span.appendChild(berichtId);
        foto.src = "https://scrumserver.tenobe.org/scrum/img/" + sessionStorage.getItem("fotoVanDeGebruiker");
    }

    foto.className = "inlineIcon";
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

function LoveCoinsAanwezig() {
    console.log(sessionStorage.getItem("lovecoins"));
    currentLovecoins = sessionStorage.getItem("lovecoins");
    if(sessionStorage.getItem("lovecoins") === "0"){
        document.getElementById("stuurTekstFout").innerText = "Niet genoeg lovecoins aanwezig";
    }
    else {
        LoveCoinsVerminderenMet1();
        BerichtPlaatsen();
    }
}
async function LoveCoinsVerminderenMet1() {
    let bedrag = -1;

    const gebruikerId = sessionStorage.getItem('gebruiker');

    let urlUpdate = 'https://scrumserver.tenobe.org/scrum/api/profiel/lovecoinTransfer.php';

    var data = {
        "profielID": gebruikerId,
        "bedrag": bedrag
    };
    console.log(sessionStorage.getItem("lovecoins"));
    var request = new Request(urlUpdate, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    fetch(request)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {
            console.log(data);

            const rooturl = "https://scrumserver.tenobe.org/scrum/api";
            let favUrl = rooturl + '/profiel/read_one.php?id=' + gebruikerId;

            fetch(favUrl)
                .then(function (resp) { return resp.json(); })
                .then(function (data) {


                    sessionStorage.setItem("lovecoins", (data.lovecoins));
                    console.log(data.lovecoins);
                    console.log(data);
                })
                .catch(function (error) { console.log(error); });
        })
}
//stuur een bericht
document.getElementById("stuurTekst").addEventListener("click", function (e) {
    LoveCoinsAanwezig();
});

async function BerichtPlaatsen() {
    console.log("ik stuur een bericht");
    let vanId = sessionStorage.getItem('gebruiker');
    let naarId = sessionStorage.getItem('berichtenAndereGebruiker');
    let bericht = document.getElementById('teSturenTekst').value;
    document.getElementById('teSturenTekst').value = "";
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
        .then(function (data) {
            console.log(data);
            // de volledige pagina refreshen. dit is niet nodig 
            //    window.location.replace("chatbox.html") 
            deleteChatbubbles();
            haalNieuweBerichtenOp();
        })
        .catch(function (error) { console.log(error); });
}

//delete een bericht
function deleteEenBericht(id) {
    let url = rooturl + '/bericht/delete.php';
    //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
    let data = {
        id: id
    }

    var request = new Request(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {
            console.log(data);
            haalNieuweBerichtenOp();
        })
        .catch(function (error) { console.log(error); });
}


//check de status op ontvangen
function controleerDeStatusOpOntvangen(data) {
    //console.log(data);
    data.forEach(perPersoon => {
        perPersoon.forEach(perBericht => {
            if (perBericht['status'] === "verzonden" && perBericht['benIkZender'] === "0") {
                veranderStatus(perBericht['berichtId'], 'ontvangen');
            }
            //console.log(perBericht);
        });
    });
}

//check de status op ontvangen
function controleerDeStatusOpGelezen(data) {
    //console.log(data);
    data.forEach(perPersoon => {
        perPersoon.forEach(perBericht => {
            if (perBericht['status'] !== "gelezen" && perBericht['benIkZender'] === "0") {
                veranderStatus(perBericht['berichtId'], 'gelezen');
            }
            //console.log(perBericht);
        });
    });
}

//alle berichten van de ander zijn ontvangen als ze nog niet gelezen zijn.
function veranderStatus(id, status) {
    //let id = document.getElementById('input24_1').value;
    //let status = 'ontvangen';

    let url = rooturl + '/bericht/zet_status.php';
    //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
    let data = {
        id: id,
        status: status
    }

    var request = new Request(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (resp) { return resp.json(); })
        .then(function (data) { console.log(data); })
        .catch(function (error) { console.log(error); });
}

