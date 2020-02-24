"use strict";

//Is the user NOT authenticated?
if (localStorage.getItem('gebruiker') !== null || localStorage.getItem('gebruiker') !== "undefined") {
    window.open("gebruikers.html","_self");
}
else {
//The user is NOT authenticated.
}