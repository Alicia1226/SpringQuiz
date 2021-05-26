import { addItem, getItem, firebaseConfig } from './script.js';

let aciertos=[];

const result1 = document.getElementById("number1");
const result2 = document.getElementById("number2");
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let getFechaHora = () => {
    let fechaTotal = Date.now();
    let fecha = new Date(fechaTotal);
    let tiempo = fecha.toLocaleTimeString();
    let hoy = fecha.toLocaleDateString();
    let fechaFinal = hoy +"-" + tiempo;
    return fechaFinal;
}

function readAll(){

    db.collection("quizUsuarios").where("id", "=", "juan").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data().}`);

console.log(doc.data().id,doc.data().numAciertos,doc.data().resultados)
        });
    });

}
readAll()

function returnUser(id) {
    


  }

let objAciertos = (numAciertos) => {
    let obj = {};
    obj.fecha = getFechaHora();
    obj.aciertos = numAciertos;
    return obj;
}

function paintResults(data1, data2) {
    result1.innerHTML = data1;    
    result2.innerHTML = data2;
}

/* if (getItem("resultados") == null){
    aciertos.push(objAciertos(getItem("numAciertos")));
    addItem(aciertos,"resultados");
}else{
    aciertos.push(objAciertos(getItem("numAciertos")));
    let  sumaData = getItem("resultados").concat(aciertos);
    addItem(sumaData,"resultados");
} */

paintResults(getItem("numAciertos"), "10");

document.getElementById("boton").addEventListener("click", (e) => {
    window.location.href = "../index.html";
});
