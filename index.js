"use strict";

//Is the user NOT authenticated?
if (sessionStorage.getItem('gebruiker') !== null && sessionStorage.getItem('gebruiker') !== "undefined") {
    window.open("gebruikers.html","_self");
}
else {
//The user is NOT authenticated.
}