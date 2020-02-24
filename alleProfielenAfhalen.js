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
};

/*
profielenZoeken();
async function profielenZoeken() {
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/search/.php");
    if (response.ok) {
        const profielen = await response.json();
        console.log(profielen);
    } else {
        document.getElementById("nietGevonden").style.display = "block";
    }
}


eenProfielAfhalen();
async function eenProfielAfhalen() {
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one?profielId=2.php");
    if (response.ok) {
        const eenProfiel = await response.json();
        console.log(eenProfiel);
    } else {
        document.getElementById("nietGevonden").style.display = "block";
    }
};

leesGegevens1();
        
            
        async function leesGegevens1()
        {
            const zoekProfiel = await fetch( 'https://scrumserver.tenobe.org/scrum/api/profiel/search.php?sexe="m"' );
           // https://scrumserver.tenobe.org/scrum/api
            const gezochtProfiel = await fetch(zoekProfiel); 
            console.log(gezochtProfiel);
        };
        
      //  let url=rooturl+'/profiel/search.php?geboortedatum='+ geboortedatum + '&geboortedatumOperator='+ geboortedatumOperator;


*/