$(document).ready(function(){

    const token = JSON.parse(localStorage.getItem('ecoservicesTokenPro')); console.log(token);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
            },
    };
    fetch(`http://localhost:3000/allProduitPro`, requestOptions)
    .then(res => {return res.json();})
    .then(data =>{console.log(data.products)})
    .catch(e => {console.log("***  "+e+" ***");});

    $("#butProfil").click(function() {
        window.location.href = "../../pages/professionel/profilPro.html";
    });
    $("#butPanier").click(function() {
        window.location.href = "../../pages/professionel/panierPro.html";
    });
    $("#butLogin").click(function() {
        window.location.href = "../../pages/connexion.html";
    });
  });