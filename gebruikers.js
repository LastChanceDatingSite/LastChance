document.querySelectorAll("body").onload = function()
{
    console.log("tothier");
    const gebruikerId = localStorage.getItem("gebruiker");
   // console.log(gebruikerNickname);
    

    eenProfielAfhalen();
    async function eenProfielAfhalen() {
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + gebruikerId);
    if (response.ok) {
        const eenProfiel = await response.json();
        console.log(eenProfiel);
        document.getElementById("begroeting").innerText = "Welkom" + eenProfiel.nickname;
    } 
    else 
    {
        document.getElementById("nietGevonden").style.display = "block";
    }
};
}