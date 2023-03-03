$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.has('id') ?  urlParams.get('id'): 0;
    var canShow = false;
    const token = JSON.parse(localStorage.getItem('ecoservicesTokenPro'));
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
            },
        body: JSON.stringify({id: productId})
    };
    fetch(`http://10.33.8.112:3000/aProduitPro`, requestOptions)
    .then(res => {
        if(res.status == 200){
            canShow = true;
            return res.json();
        }else  window.location.href = "./accueil_produit_pro.html";
    })
    .then(data => {
        if(canShow){
            produit = data.product;
            document.getElementById('label').insertAdjacentHTML("beforeend", produit.Label);
            document.getElementById('description').insertAdjacentHTML("beforeend", produit.Description);
            document.getElementById('prix').insertAdjacentHTML("beforeend", produit.Prix+" Eur");
        }
    })
    .catch(e => {console.log("***  "+e+" ***"); window.location.href = "./accueil_produit_pro.html";});

    $("#butProfil").click(function() {
        window.location.href = "../../pages/professionel/profilPro.html";
    });
    $("#butPanier").click(function() {
        window.location.href = "../../pages/professionel/panierPro.html";
    });
    $("#butLogin").click(function() {
        window.location.href = "../../pages/connexion.html";
    });
    $("#goBack").click(function() {
        window.location.href = "./accueil_produit_pro.html";
    });
    $("#addToProduit").click(function() {
        fetch(`http://10.33.8.112:3000/aPanierPro`, options = {
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
                
                fetch(`http://10.33.8.112:3000/setPanierPro`, options = {
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
                    window.location.href = "./accueil_produit_pro.html";
                })
                .catch(e => {console.log("***  "+e+" ***");})
            }
        })
        .catch(e => {console.log("***  "+e+" ***");})
    });
  });