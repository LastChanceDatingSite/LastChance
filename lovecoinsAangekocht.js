eenProfielAfhalen();
async function eenProfielAfhalen() {

    const gebruikerId = localStorage.getItem("gebruiker");
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + gebruikerId);
    if (response.ok) {
        const eenProfiel = await response.json();
        console.log(eenProfiel);
        document.getElementById("aantalLoveCoins").innerText = eenProfiel.lovecoins;
        return eenProfiel;
    }
    else {
        console.log("Er liet iets fout.")
    }
};
