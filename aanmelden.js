"use strict";

    
    //const gebruikerWachtwoord = document.getElementById("wachtwoord").value;

    profielenAfhalen();
    async function profielenAfhalen() 
    {
        const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read.php");
        if (response.ok) 
        {
            const profielen = await response.json();
            console.log(profielen);
            document.getElementById("aanmelden").onclick = function()
            {
                const gebruikerNickname = document.getElementById("user").value;
                console.log(gebruikerNickname);
                for (const profiel of profielen)
                {
                    console.log(profiel.nickname);
                    if (gebruikerNickname === profiel.nickname)
                    {
                        console.log("juist");
                        window.location.replace("gebruikers.html");
                        localStorage.setItem('gebruiker', profiel.nickname);
                    }
                    else
                    {
                        console.log("mis");
                    }
                }
            }

        } 
        else 
        {
            document.getElementById("aanmeldingFout").style.display = "block";
        };
    };



