"use strict";

//Is the user NOT authenticated?
if (localStorage.getItem('gebruiker') !== null || localStorage.getItem('gebruiker') !== "undefined") {
    window.open("gebruikers.html","_self");
}
else {
//The user is NOT authenticated.
}
    
    

 /*   profielenAfhalen();
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

    */

    document.getElementById("aanmelden").addEventListener('click', function (e) {  
        let nickname =  document.getElementById("user").value; 
        let wachtwoord =  document.getElementById("wachtwoord").value;
        const rooturl = "https://scrumserver.tenobe.org/scrum/api";
        let url=rooturl+'/profiel/authenticate.php';
        
        let data = {
            nickname: nickname,
            wachtwoord: wachtwoord
        }

        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        
        fetch(request)
            .then( function (resp)  { return resp.json(); })
            .then( function (data)  { console.log(data.id); 
                window.location.replace("gebruikers.html");
                localStorage.setItem('gebruiker', data.id); })
            .catch(function (error) { console.log(error); });
    });

