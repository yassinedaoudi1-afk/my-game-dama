
function sg(sep){
    var d=new Date();
    return d.getDate()+sep+(d.getMonth()+1)+sep+d.getFullYear();
}

function nom_du_mois(){
    var d=new Date();
    var mois=d.getMonth()+1;
    switch (mois){
        case 1: return "Janvier";
        case 2: return "Février";
        case 3: return "march";
        case 4: return "avrel";
        case 5: return "mai";
        case 6: return "Févrjuenier";
        case 7: return "Février";
        case 8: return "Février";
        case 9: return "Février";
        case 10: return "Février";
        case 11: return "Février";
        case 12: return "Février";

    }
}
function calcul_age(anniversaire){
    var d=new Date();
var d1=new Date(anniversaire);
    return d.getFullYear()-d1.getFullYear()+ " ans";
}
console.log(calcul_age("04-08-2006"));
