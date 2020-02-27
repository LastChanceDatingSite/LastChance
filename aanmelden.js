"use strict";

//Is the user NOT authenticated?
if (sessionStorage.getItem('gebruiker') !== null && sessionStorage.getItem('gebruiker') !== "undefined") {
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
                sessionStorage.setItem('gebruiker', data.id); })
               // gebruikersInArrayEersteBezoek(data.id); })
               // sessionStorage.setItem("gebruikersArray", data.id) })
            .catch(function (error) { console.log(error); });
    });


var gebruikersArray = [];
console.log(gebruikersArray);
function gebruikersInArrayEersteBezoek(id) {

    console.log("wordt gebruikt");
    console.log(gebruikersArray);
    gebruikersArray = JSON.parse(sessionStorage.getItem("gebruikersArray"));
    console.log(id);
    gebruikersArray.push(id);
    sessionStorage.setItem("gebruikersArray", JSON.stringify(gebruikersArray));
}


/*
 var names = [];
names[0] = prompt("New member name?");
sessionStorage.setItem("names", JSON.stringify(names));

//...
var storedNames = JSON.parse(sessionStorage.getItem("names"));

*/