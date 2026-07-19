function calculer() {
  var nb = parseInt(prompt("Entrez un nombre :"));
  var choix_iteratif = confirm("Voulez-vous utiliser la méthode itérative");
  if (choix_iteratif) {
    alert(
      "La fonction Fibonacci avec la méthode itérative d'ordre " +
        nb +
        " est égale: " +
        fibonacci2(nb)
    );
  } else {
    alert(
      "La fonction Fibonacci avec la méthode récursive d'ordre " +
        nb +
        " est égale: " +
        fibonacci1(nb)
    );
  }
}
function fibonacci1(nb) {
  if (nb == 0) return 0;
  if (nb == 1) return 1;
  return fibonacci1(nb - 1) + fibonacci1(nb - 2);
}

function fibonacci2(nb) {
  var f0 = 0;
  var f1 = 1;
  var f = 0;
  for (var i = 2; i <= nb; i++) {
    f = f0 + f1;
    f0 = f1;
    f1 = f;
  }
  return f;
}
calculer();
