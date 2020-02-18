"use strict";

profielenAfhalen();
async function profielenAfhalen() {
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read.php");
    if (response.ok) {
        const profielen = await response.json();
        console.log(profielen);
    } else {
        document.getElementById("nietGevonden").style.display = "block";
    }
}



