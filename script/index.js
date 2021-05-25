import { firebaseConfig } from './config.js'
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();



let fecha = []
let aciertos2 =  []

let addItem = (array,key) => {
  localStorage.setItem(key, JSON.stringify(array));
};

let getItem = (key) => {
  let resultLocalStore = JSON.parse(localStorage.getItem(key));
  return resultLocalStore;
};


function dibujaGrafica(){
    getItem("resultados").forEach((datos)=>{
        console.log(datos.fecha)
        fecha.push(datos.fecha)
        aciertos2.push(datos.aciertos)
        console.log(datos.aciertos)
    })

    let data ={
        labels: fecha,
        series: [aciertos2]
    };
    
  new Chartist.Line('.ct-chart', data);
  
}

function addDate (){
    let textInner = "<ul>"
    getItem("resultados").forEach((elemento)=>{
        textInner+="<li>"
        textInner+=elemento.fecha
        textInner+= " "
        textInner+="<b>"
        textInner+=elemento.aciertos
        textInner+= " "
        textInner+= "aciertos"
        textInner+="</b>"
        textInner+="</li>"
    })
    textInner+= "</ul>"
    return textInner 
}
function dibujaLista() {
    document.querySelector('.lista').innerHTML = addDate()
}

if (getItem("resultados") !== null){
    dibujaGrafica()
    dibujaLista()
}

 