// class Etudiant{
//    Etudiant(cne, nom, formation, sexe) {
//  this.cne = cne;
//  this.nom = nom;
//  this.formation = formation;
// this.sexe = sexe; // Ajout de l'attribut sexe
// }}
// Etudiant.prototype.affiche = function () {
//  let image = "<img src='assets/m.jpg' class='card-img-top' alt>";
// if (this.sexe === "Femme") {
//   image = "<img src='assets/f.jpg' class='card-img-top' alt>";
//  }
//  let codehtml = `<div class="col">
//                    <div class="card h-100">
//                           ${image}
//                     <div class="card-body">
//                       <div class="card-title">CNE: ${this.cne}</div>
//                     <div class="card-title">Nom: ${this.nom}</div>
//  <div class="card-title">Formation: ${this.formation}</div>
//  </div>
//                   </div>
//                 </div>`;
//   return codehtml;
// };

// function Filiere() {
//   this.etudiants = [];
// }

// Filiere.prototype.ajouter = function (etudiant) {
//   this.etudiants.push(etudiant);
// };

// Filiere.prototype.affiche = function () {
//   let html = "";
//   this.etudiants.forEach((etudiant) => {
//     html += etudiant.affiche();
//   });
//   return html;
// };

// let filiere = new Filiere();

// // Lors de la soumission du formulaire
// document.getElementById("formulaireEtudiant").addEventListener("submit", function (event) {
//   event.preventDefault();

//     let cne = document.getElementById("cne").value;
//     let nom = document.getElementById("nom").value;
//     let formation = document.getElementById("formation").value;
//     let sexe = document.querySelector('input[name="sexe"]:checked').value;
//     let etudiant = new Etudiant(cne, nom, formation, sexe);
//     filiere.ajouter(etudiant);
//     document.getElementById("resultat").innerHTML = filiere.affiche();
//     // Réinitialiser le formulaire
//     event.target.reset();
//   });








function Etudiant(cne,nom,formation,genre){
  this.cne=cne;
  this.nom=nom;
  this.genre=genre;
  this.formation=formation;
}
Etudiant.prototype.affiche=function(){
  let chain=`<div>CNE :${this.cne}</div>
  <div>Nom :${this.nom}</div>
  <div>Genre :${this.genre}</div>
  <div>Formation :${this.formation}</div>`;
    return chain;
};
function Filier(Etudiant){
  this.Etudiant=[];
}
Filier.prototype.ajouter=function(Etudiant){
  this.Etudiant.push(Etudiant);
};
Filier.prototype.affich=function() {
  let html="";
  this.Etudiant.forEach((Etudiant)=>{
    html+=Etudiant.affiche();
  });
  return html;
};
let filier=new Filier();
document.querySelector("#formulaireEtudiant").addEventListener("submit",function(evente){
  evente.preventDefault()
  let cne=document.querySelector("#cne").value;
  let nom=document.querySelector("#nom").value;
  let formation=document.querySelector("#formation").value;
let sexe=document.querySelector('[input name="sexe"]:checked').value;
let etud=new Etudiant(cne,nom,formation,sexe);
filier.ajouter(etud);
document.querySelector("#resultat").innerHTML=filier.affich();
evente.target.raset();
});