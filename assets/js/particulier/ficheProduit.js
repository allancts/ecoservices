$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.has('id') ?  urlParams.get('id'): 0;
    var canShow = false;
    const token = JSON.parse(localStorage.getItem('ecoservicesTokenPar'));
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
            },
        body: JSON.stringify({id: productId})
    };
    fetch(`http://localhost:3000/aProduitPar`, requestOptions)
    .then(res => {
        if(res.status == 200){
            canShow = true;
            return res.json();
        }else  window.location.href = "./accueil_produit.html";
    })
    .then(data => {
        if(canShow){
            produit = data.product;
            document.getElementById('label').insertAdjacentHTML("beforeend", produit.Label);
            document.getElementById('description').insertAdjacentHTML("beforeend", produit.Description);
            document.getElementById('prix').insertAdjacentHTML("beforeend", produit.Prix+" Eur");
        }
    })
    .catch(e => {console.log("***  "+e+" ***"); window.location.href = "./accueil_produit.html";});

    $("#butProfil").click(function() {
        window.location.href = "../../pages/particulier/profilPar.html";
    });
    $("#butPanier").click(function() {
        window.location.href = "../../pages/particulier/panierPar.html";
    });
    $("#butLogin").click(function() {
        window.location.href = "../../pages/connexion.html";
    });
    $("#goBack").click(function() {
        window.location.href = "./accueil_produit.html";
    });
    $("#addToProduit").click(function() {
        window.location.href = "./accueil_produit.html";
    });
  });