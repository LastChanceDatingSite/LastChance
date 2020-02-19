document.querySelectorAll("body").onload = function()
{
    console.log("tothier");
    const gebruikerNickname = localStorage.getItem("gebruiker");
    console.log(gebruikerNickname);
    document.getElementById("begroeting").innerText = "Welkom" + gebruikerNickname;
}