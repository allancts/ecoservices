$(document).ready(function(){
    var isPro = false;
    var url = 'loginPar';
    var tokenName = 'ecoservicesTokenPar';
    var hrefUrl = "";

    $("#loginPar").click(function() {
        isPro = false;
        url = 'loginPar';
        tokenName = 'ecoservicesTokenPar';
        hrefUrl = "";
    });
    $("#loginPro").click(function() {
        isPro = true;
        url = 'loginPrp';
        tokenName = 'ecoservicesTokenPro';
        hrefUrl = "";
    });

    $("#butLogin").click(function() {
        console.log("*** try to Login ***");

        const mail = document.getElementById('input-mail').value;
        const pass = document.getElementById('input-pass').value;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mail: mail,
                mdp: pass
            })
        };

        fetch(`http://localhost:3000/${url}`, requestOptions)
        .then(res => {return res.json();})
        .then(data => {
            console.log(data.token);
            localStorage.setItem(tokenName, JSON.stringify(data.token));
            window.location.href = hrefUrl;
        })
        .catch(e => {console.log(e);})
    });
  });