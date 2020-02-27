"use strict"

//Is the user authenticated?
if (sessionStorage.getItem('gebruiker') === null || sessionStorage.getItem('gebruiker') === "undefined") {
    window.open("AccessDenied.html","_self");
}
else {
//The user is authenticated and the authentication has not expired.

}

eenProfielAfhalen();
async function eenProfielAfhalen() {

    const gebruikerId = sessionStorage.getItem("gebruiker");
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + gebruikerId);
    if (response.ok) {
        const eenProfiel = await response.json();
        console.log(eenProfiel);
        document.getElementById("aantalLoveCoins").innerText = eenProfiel.lovecoins;
        sessionStorage.setItem("lovecoins", eenProfiel.lovecoins);
        return eenProfiel;
    }
    else {
        console.log("Er liet iets fout.")
    }
};
