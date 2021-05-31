import { getItem, firebaseConfig } from "./script.js";

let fecha = [];
let aciertos2 = [];
let user = 'pepe'

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

/* console.log(query) */
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



function addUsers (usuarios){
  db.collection("quizUsuarios").add({
    id: usuarios,
    aciertos: 0,
    resultados: [{}]
})

}
function getResultados(doc){

  let quizRef = db.collection("quizUsuarios").doc(doc)
  return new Promise ((resolve,reject)=>{
    quizRef.get().then((doc) => {
      resolve (doc.data().resultados)
    
      })

  })
  
}
function updateUsers (numAciertos,resultados,doc){

  let quizRef = db.collection("quizUsuarios").doc(doc)
  return quizRef.update({
    numAciertos: numAciertos,
    resultados: resultados
  })

}

getIddoc(user)
  .then((x) => {
    if(x==true){
    /*  addUsers(user)  */
    }
    else{
    /* updateUsers(8,[{fecha:"5/5/2021",aciertos: 5}],x) */
    
     getResultados(x)
     .then((A)=>dibujaGrafica(A))
    }
  });
  




/* docRef.get().then((doc) => {

    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
}); */

function dibujaGrafica(result) {
  result.forEach((datos) => {
    console.log(datos.fecha);
    fecha.push(datos.fecha);
    aciertos2.push(datos.aciertos);
    console.log(datos.aciertos);
  });

  const data = {
    labels: fecha,
    datasets: [
      {
        label: "Scores",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: aciertos2,
      },
    ],
  };

  const config = {
    type: "line",
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Aciertos",
          },
        },
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: "fecha",
          },
        },
      },
    },
  };
  var myChart = new Chart(document.getElementById("myChart"), config);
}

function addDate() {
  let textInner = "<ul>";
  getItem("resultados").forEach((elemento) => {
    textInner += "<li>";
    textInner += elemento.fecha;
    textInner += " ";
    textInner += "<b>";
    textInner += elemento.aciertos;
    textInner += " ";
    textInner += "aciertos";
    textInner += "</b>";
    textInner += "</li>";
  });
  textInner += "</ul>";
  return textInner;
}

function dibujaLista() {
  document.querySelector(".lista").innerHTML = addDate();
}

if (getItem("resultados") !== null) {
  dibujaGrafica();
  dibujaLista();
}
