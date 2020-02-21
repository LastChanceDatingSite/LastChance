"use strict";

    
    

    profielenAfhalen();
    async function profielenAfhalen() 
    {
        const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read.php");
        if (response.ok) 
        {
            const profielen = await response.json();
            console.log(profielen);
    
            document.getElementById("aanmelden").onclick = async function()
            {
                const gebruikerWachtwoord = document.getElementById("wachtwoord").value;
                const gebruikerNickname = document.getElementById("user").value;
                console.log(gebruikerNickname);
               /* let url = "https://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php";
                let data =
                {
                    nickname: gebruikerNickname,
                    wachtwoord: gebruikerWachtwoord
                }
                var request = new Request(url,{
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                fetch(request)
                    
                    .then(function (resp) { console.log(resp.json())});
                console.log(resp.id);
                if (request.ok)
                {
                   const profiel = await request.json();
                   console.log(profiel.id);
                  // window.location.replace("gebruikers.html")

                }
                else
                {
                    console.log("probleem");
                }
                */
            

                for (const profiel of profielen)
                {
                    console.log(profiel.nickname);
                    if (gebruikerNickname === profiel.nickname && gebruikerWachtwoord === profiel.wachtwoord)
                    {
                        const gebruikerId = profiel.id;
                        console.log(gebruikerId);
                        window.location.replace("gebruikers.html");
                        localStorage.setItem('gebruiker', gebruikerId);
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



