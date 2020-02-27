var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot) {
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function () {
    /*
--------------------------------------
-- knoppen voor berichten
--------------------------------------
*/
    document.getElementById('knop20').addEventListener('click', function (e) {
        let profielId = document.getElementById('input20_1').value;

        let url = rooturl + '/bericht/read.php?profielId=' + profielId;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp) { return resp.json(); })
            .then(function (data) { console.log(data); })
            .catch(function (error) { console.log(error); });
    });

    document.getElementById('knop21').addEventListener('click', function (e) {
        let berichtId = document.getElementById('input21_1').value;

        let url = rooturl + '/bericht/read_one.php?berichtId=' + berichtId;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp) { return resp.json(); })
            .then(function (data) { console.log(data); })
            .catch(function (error) { console.log(error); });
    });

    document.getElementById('knop22').addEventListener('click', function (e) {
        let vanId = document.getElementById('input22_1').value;
        let naarId = document.getElementById('input22_2').value;
        let bericht = document.getElementById('input22_3').value;

        let url = rooturl + '/bericht/post.php';
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        let data = {
            vanId: vanId,
            naarId: naarId,
            bericht: bericht,
            status: "verzonden"
        }

        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(function (resp) { return resp.json(); })
            .then(function (data) { console.log(data); })
            .catch(function (error) { console.log(error); });
    });

    document.getElementById('knop23').addEventListener('click', function (e) {
        let id = document.getElementById('input23_1').value;

        let url = rooturl + '/bericht/delete.php';
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        let data = {
            id: id
        }

        var request = new Request(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(function (resp) { return resp.json(); })
            .then(function (data) { console.log(data); })
            .catch(function (error) { console.log(error); });
    });

    document.getElementById('knop24').addEventListener('click', function (e) {
        let id = document.getElementById('input24_1').value;
        let status = document.getElementById('input24_2').value;

        let url = rooturl + '/bericht/zet_status.php';
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        let data = {
            id: id,
            status: status
        }

        var request = new Request(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(function (resp) { return resp.json(); })
            .then(function (data) { console.log(data); })
            .catch(function (error) { console.log(error); });
    });
}

function LoveCoinsAanwezig(){
    if(sessionStorage.getItem("lovecoins") === 0){
        document.getElementById("stuurTekstFout").style.display = "inline";
        LoveCoinsVerminderenMet1();
    }
}
async function LoveCoinsVerminderenMet1(){
let bedrag = -1;                       

                const gebruikerId = localStorage.getItem('gebruiker');
                let urlUpdate =  'https://scrumserver.tenobe.org/scrum/api/profiel/lovecoinTransfer.php';

                data = {
                    "profielID": gebruikerId,
                    "bedrag": bedrag
                };

                var request = new Request(urlUpdate, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                fetch(request)
                    .then(function (resp) { return resp.json(); })
                    .then(function (data) { console.log(data); })
                    .catch(function (error) { console.log(error); });
            };
    
