"use strict";

//Is the user NOT authenticated?
if (localStorage.getItem('gebruiker') !== null && localStorage.getItem('gebruiker') !== "undefined") {
    window.open("gebruikers.html","_self");
}/*
else {
//The user is NOT authenticated.
}
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

