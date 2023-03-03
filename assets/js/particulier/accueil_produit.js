function addCart(produit){
    const card = `<article class="card__article">
        <div class="card__data">
          <img src="../../public/image_test.png" alt="card image" class="card__img">

          <h1 class="card__title">${produit.Label}</h1>
          <p class="card__description">${produit.Description}</p>

          <a href="./fiche_produit.html?id=${produit.idProduitPar}" class="button">
            Voir l'article
          </a>
        </div>

        <div class="card__shapes">
          <span class="card__shape"></span>
          <span class="card__shape"></span>
          <span class="card__shape"></span>
          <span class="card__shape"></span>
          <span class="card__shape"></span>
          <span class="card__shape"></span>
          <span class="card__shape"></span>
          <span class="card__shape"></span>
        </div>
      </article>`;
      //console.log(card);
      document.getElementById("listeProduits").insertAdjacentHTML("beforeend", card);
}

$(document).ready(function(){

    const token = JSON.parse(localStorage.getItem('ecoservicesTokenPar'));
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
            },
    };
    fetch(`http://localhost:3000/allProduitPar`, requestOptions)
    .then(res => {return res.json();})
    .then(data =>{
        console.log(data.products); 
        const produits = data.products;
        produits.forEach(element => {addCart(element)});
    })
    .catch(e => {console.log("***  "+e+" ***");});

    $("#butProfil").click(function() {
        window.location.href = "../../pages/particulier/profilPar.html";
    });
    $("#butPanier").click(function() {
        window.location.href = "../../pages/particulier/panierPar.html";
    });
    $("#butLogin").click(function() {
        window.location.href = "../../pages/connexion.html";
    });
  });