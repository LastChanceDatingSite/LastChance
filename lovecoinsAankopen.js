"use strict";
document.getElementById("aankoopKnop").onclick = function()
{   let aantal = document.getElementById("aankoopLovecoins").value;
    let teBetalen=0;
    if(aantal !==null){
        
        if(aantal <5){
            teBetalen = aantal*2;
            console.log(teBetalen);            
        }
        else {
            teBetalen = Math.floor((aantal*0.8)*10)/10;
            console.log(teBetalen);
        }
        document.getElementById("aantalCredits").innerText=aantal;
        document.getElementById("aantalEuro").innerText=teBetalen;
        document.querySelector(".verborgen").style.display="inline";
        document.querySelector(".zichtbaar").style.display="none";
    }
    
    document.getElementById("annuleren").onclick =function(){
        console.log("functie starten")
        aantal=0;
        document.getElementById("aankoopLovecoins").value="";
        document.getElementById("aantalCredits").innerText=0;
        document.getElementById("aantalEuro").innerText=0;
        document.querySelector(".verborgen").style.display="none";
        document.querySelector(".zichtbaar").style.display="inline";

    }




}
