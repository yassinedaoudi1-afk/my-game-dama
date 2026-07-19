class Livre{
    constructor(id,titre,auteur,prix){
        this.id=id;
        this.titre=titre;
        this.auteur=auteur;
        this.prix=prix;
    }
    affiche(){
        return `id:${this.id} | titre:${this.titre} | auteur:${this.auteur} | prix:${this.prix}`;
    }
    estcher(){
        if(this.prix>=100)
            return true;
        return false;
    }
}
let e1=new Livre(12,"yassine","yassine",12,5);
let e2=new Livre(10,"walide","walide",17,5);
let e3=new Livre(11,"hamza","hamza",120);
let e4=new Livre(9,"achraf","achraf",16,5);
let e5=new Livre(8,"hossine","hossine",11,5);
let livres=[];
livres.push(e1);
livres.push(e2);
livres.push(e3);
livres.push(e4);
livres.push(e5);
let res=livres.map(e=>e.titre);
let fil=livres.filter(e=>e.estcher());
console.log(res);
console.log(fil);
let max=Math.max(...fil);
let coppe=[...livres];
console.log(max);
console.log(coppe);
let form=document.getElementById("formLivre");
let ul=document.getElementById("listeLivres");
form.addEventListener("submit",function(e){
    e.preventDefault();
    let id=document.getElementById("id").value
    let titre=document.getElementById("titre").value;
    let auteur=document.getElementById("auteur").value;
    let prix=document.getElementById("prix").value;
    if(id=="" || titre=="" || auteur=="" || prix==""){
        alert("remplire tout les champs");
        return;
    }
    let li=document.createElement("li");
    let text=document.createTextNode(`${id} | ${titre} | ${auteur} | ${prix}`);
    li.appendChild(text);
    
li.addEventListener("click",function(){
   
    li.remove();
});

    ul.appendChild(li);
    form.reset();
});
class cookie{
    save(nom,value,jour){
        let date=new Date();
        date.getDate(date.getDate()+7*24*3600*1000);
        document.cookie()=`${mon}=${encodeURIComponent(value)} ;expires ${date.toUTCString()} ;path="/"`;
    }
    remove(nom){
        return save(nom,this.value,-1);
    }
}
