$(document).ready(function(){

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
        fetch('http://localhost:3000/loginPar', requestOptions)
            .then(res => {return res.json();})
            .then(data => {
                console.log(data.token);
                localStorage.setItem('ecoservicesTokenPar', JSON.stringify(data.token));
                window.location.href="C://Users/allan/Documents/G4/Projets/Site E_commerce/ecoservices_ecommerce/front/assets/pages/fiche_produit.html";
            })
            .catch(e => {console.log(e);})

    });
  });