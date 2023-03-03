$(document).ready(function(){
    const errorField = document.getElementById('error');

    $("#butInscription").click(function() {
        const nom = document.getElementById('input-nom').value;
        const prenom = document.getElementById('input-prenom').value;
        const mail = document.getElementById('input-mail').value;
        const pass = document.getElementById('input-pass').value;

        const adr = document.getElementById('input-adr').value;
        const ville = document.getElementById('input-ville').value;
        const cp = document.getElementById('input-cp').value == "" ? '0' : document.getElementById('input-cp').value;
        const pays = document.getElementById('input-pays').value;
        const  tel = document.getElementById('input-tel').value;
        

        if(nom != "" && prenom != "" && mail != "" && pass != ""){
            if(document.getElementById('input-check').checked){
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        prenom: prenom,
                        nom: nom,
                        mail: mail,
                        adr: adr,
                        cp: cp,
                        ville: ville,
                        region: '',
                        pays: pays,
                        tel: tel,
                        naissance: '2000-01-01',
                        mdp: pass
                    })
                };
                fetch('http://localhost:3000/addPar', requestOptions)
                    .then(res => {
                        const data = res.json();
                        if(res.status == '200'){
                            errorField.style.color="green";
                            errorField.textContent = "Compte créer ! Vous allez être redirigé vers la page de conenxion !";
                            setTimeout(window.location.replace("../../pages/connexion.html"), 5000);
                        }
                        else if(res.status == '401'){errorField.textContent = "Cette adresse mail est déjà utilisée !"}
                        else if(res.status == '400'){errorField.textContent = "Au moins un des champs est incorrect !"}
                        else {errorField.textContent = "error"}
                    })
                    .catch(e => {console.log("***  "+e+" ***");});
            }
            else{errorField.textContent = "Veuillez acceptez les conditions d'utilisations";}
        }
        else{errorField.textContent = "Veuillez remplir les champs obligatoire (*)";}
    });
});