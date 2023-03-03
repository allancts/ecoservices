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
        fetch(`http://localhost:3000/aPanierPar`, options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
            }
        })
        .then(res => {
            if(res.status == 200){canShow = true; return res.json();}
            else canShow =false;
        })
        .then(data => {
            if(canShow){
                //console.log(data.panier)
                newPanier = data.panier;

                //console.log(productId)
                if(newPanier.Produits.includes(productId)){
                    var index = newPanier.Produits.indexOf(productId);
                    //console.log(newPanier[index]);
                    newPanier[index]++
                    //console.log(newPanier[index]);
                }
                else{
                    newPanier.Produits.push(productId);
                    newPanier.Quantites.push('1');
                }
                //console.log(newPanier);
                var newProduits = '{'; var newQuantites = '{';
                newPanier.Produits.forEach(element => {
                    newProduits += `"${element}"`;
                    newQuantites += `"${newPanier.Quantites[newPanier.Produits.indexOf(element)]}"`;
                    if(newPanier.Produits.indexOf(element) < (newPanier.Produits.length -1)){
                        newProduits += ", ";
                        newQuantites += ", ";
                    }
                });
                newProduits += '}'; newQuantites += '}';
                
                fetch(`http://localhost:3000/setPanierPar`, options = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token 
                    },
                    body: JSON.stringify({
                        prix: newPanier.Prix,
                        products: newProduits,
                        quantites: newQuantites
                    })
                })
                .then(res => {
                    console.log(res.json());
                    window.location.href = "./accueil_produit.html";
                })
                .catch(e => {console.log("***  "+e+" ***");})
            }
        })
        .catch(e => {console.log("***  "+e+" ***");})
    });
  });