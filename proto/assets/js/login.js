$(document).ready(function(){
    var isPro = false;
    var url = 'loginPar';
    var tokenName = 'ecoservicesTokenPar';
    var hrefUrl = "../pages/particulier/cataloguePar.html";

    $("#loginPar").click(function() {
        isPro = false;
        url = 'loginPar';
        tokenName = 'ecoservicesTokenPar';
        hrefUrl = "../pages/particulier/cataloguePar.html";
        document.getElementById('info').textContent = "Particulier";
    });
    $("#loginPro").click(function() {
        isPro = true;
        url = 'loginPro';
        tokenName = 'ecoservicesTokenPro';
        hrefUrl = "../pages/professionel/cataloguePro.html";
        document.getElementById('info').textContent = "Professionel";
    });

    $("#butLogin").click(function() {
        const mail = document.getElementById('input-mail').value;
        const pass = document.getElementById('input-pass').value;

        if(mail != "" && pass != ""){
            console.log("*** try to Login ***");
            document.getElementById('error').textContent = "";

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mail: mail,
                    mdp: pass
                })
            };
            fetch(`http://localhost:3000/${url}`, requestOptions)
            .then(res => {
                const data = res.json();
                if(res.status == 200){
                    console.log(data.token);
                    localStorage.setItem(tokenName, JSON.stringify(data.token));
                    window.location.href = hrefUrl;
                }
                else if (res.status == '401'){document.getElementById('error').textContent = "Login ou mot de passe incorrect";}
                else{document.getElementById('error').textContent = "error"}
            })
            .catch(e => {console.log("***  "+e+" ***");});
        }
        else{document.getElementById('error').textContent = "Veuillez remplir les champs";}

    });
  });