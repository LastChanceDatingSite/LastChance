"use strict"

//Is the user authenticated?
if (localStorage.getItem('gebruiker') === null || localStorage.getItem('gebruiker') === "undefined") {
    window.open("AccessDenied.html","_self");
}
else {
//The user is authenticated and the authentication has not expired.

}


document.getElementById("uitloggen").onclick = function() {
    localStorage.clear();
}