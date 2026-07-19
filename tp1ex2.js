function add(a,b){
    return a+b;
}
function sus(a,b){
    return a-b;
}
function mul(a,b){
    return a*b;
}
function div(a,b){
if(b===0){
    return 'la divistion par 0 ??';
}
return a/b;
}
function bol(chois,a,b){
    switch(chois){
        case "+":return add(a,b); break;
        case "-":return sus(a,b); break;
        case "*":return mul(a,b); break;
        case "/":return div(a,b); break;
      default: return "Opération invalide.";break;
    }
}
console.log(bol("+",1,2));
console.log(bol("+", 10, 5)); // Affiche 15
console.log(bol("-", 10, 5)); // Affiche 5
console.log(bol("*", 10, 5)); // Affiche 50
console.log(bol("/", 10, 0)); // Affiche "Erreur : division par zéro impossible."


// function addition(a, b) {
//   return a + b;
// }
// function soustraction(a, b) {
//   return a - b;
// }
// function multiplication(a, b) {
//   return a * b;
// }
// function division(a, b) {
//   if (b === 0) {
//       return "Erreur : division par zéro impossible.";
//   }
//   return a / b;
// }

// function calculer(operation, a, b) {
//   switch (operation) {
//       case "+":
//           return addition(a, b);
//       case "-":
//           return soustraction(a, b);
//       case "*":
//           return multiplication(a, b);
//       case "/":
//           return division(a, b);
//       default:
//           return "Opération invalide.";
//   }
// }

// Exécuter des tests
console.log(calculer("+", 10, 5)); // Affiche 15
console.log(calculer("-", 10, 5)); // Affiche 5
console.log(calculer("*", 10, 5)); // Affiche 50
console.log(calculer("/", 10, 0)); // Affiche "Erreur : division par zéro impossible."
