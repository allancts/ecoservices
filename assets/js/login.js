$(document).ready(function(){
    var isPro = false;
    var url = 'loginPar';
    var tokenName = 'ecoservicesTokenPar';
    var hrefUrl = "../pages/particulier/accueil_produit.html";
    var canLog = false;

    $("#switchLogin").click(function() {
        isPro = !isPro;

        if(!isPro){
            url = 'loginPar';
            console.log("par");
            tokenName = 'ecoservicesTokenPar';
            hrefUrl = "../pages/particulier/accueil_produit.html";
            document.getElementById('txtSwitch').textContent = "Professionel";
            document.getElementById('butInscription').href = "./particulier/inscription.html";
        }
        else{
            url = 'loginPro';
            tokenName = 'ecoservicesTokenPro';
            hrefUrl = "../pages/professionel/accueil_produit_pro.html";
            document.getElementById('txtSwitch').textContent = "Particulier";
            document.getElementById('butInscription').href = "./professionel/inscription_pro.html";
        }
        
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
            fetch(`http://10.33.8.112:3000/${url}`, requestOptions)
            .then(res => {
                if(res.status == 200){
                    canLog = true;
                    return res.json();
                }
                else if (res.status == '401'){document.getElementById('error').textContent = "Login ou mot de passe incorrect";}
                else{document.getElementById('error').textContent = "error"}
            })
            .then(data => {
                if(canLog){
                    //console.log(data.token);
                    localStorage.setItem(tokenName, JSON.stringify(data.token));
                    window.location.href = hrefUrl;
                }
            })
            .catch(e => {console.log("***  "+e+" ***");});
        }
        else{document.getElementById('error').textContent = "Veuillez remplir les champs";}

    });
  });