(function (){
    let num=parseInt(prompt("entrer le nombre :"));
    if(isNaN(num)){
        document.write("<p>le nombre est n'est pas correcte</p>");
        return;
    }
    let tab=document.write("<table><tr><th>la moltiplication<th/><th>le resultet</th></tr>")
    for(let i=0;i<=10;i++){
        tab+=`<tr><td>${num} * ${i}<td/><td>${num * i}<?td></tr> `;
    }
    tab+="</table>";
    document.write(tab);
 })();

// (function () {
//   let nombre = parseInt(prompt("Entrez un nombre pour voir sa table de multiplication :"));
//   if (isNaN(nombre)) {
//     document.write("<p style='color: red; text-align: center;'>Veuillez entrer un nombre valide.</p>");
//     return;
//   }
//   let tableHTML = document.write("<table><tr><th>Multiplication</th><th>Résultat</th></tr>");
//   for (let i = 1; i <= 10; i++) {
//     tableHTML += `<tr><td>${nombre} × ${i}</td><td>${nombre * i}</td></tr>`;
//   }
//   tableHTML += "</table>";
//   document.write(tableHTML);
// })();
