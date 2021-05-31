import { addItem, getItem, firebaseConfig } from './script.js';

let aciertos=[];

let user = 'david'

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

function getResultados(doc){

    let quizRef = db.collection("quizUsuarios").doc(doc)
    return new Promise ((resolve,reject)=>{
      quizRef.get().then((doc) => {
        resolve (doc.data().numAciertos)
      
        })
  
    })
    
  }
  function getIddoc(usuario) {
    let usersRef = db.collection("quizUsuarios");
    let query = usersRef.where("id", "==", usuario);
  
    return new Promise((resolver, rechazar) => {
      query
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              resolver(doc.id);
            });
          } else {
            resolver(querySnapshot.empty);
          }
        })
        .then((x) => x);
    });
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


getIddoc(user)
  .then((doc)=>{
      getResultados(doc)
       .then((score)=>{
           paintResults(score,'10')
       })
    })
  
/* if (getItem("resultados") == null){
    aciertos.push(objAciertos(getItem("numAciertos")));
    addItem(aciertos,"resultados");
}else{
    aciertos.push(objAciertos(getItem("numAciertos")));
    let  sumaData = getItem("resultados").concat(aciertos);
    addItem(sumaData,"resultados");
} */

/* paintResults(getItem("numAciertos"), "10"); */

document.getElementById("boton").addEventListener("click", (e) => {
    window.location.href = "../index.html";
});
