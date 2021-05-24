let aciertos=[];
let newData = []
let fechaTotal = Date.now()
let fecha = new Date(fechaTotal)
let tiempo = fecha.toLocaleTimeString()
let hoy = fecha.toLocaleDateString()
let fechaFinal = hoy +"-" + tiempo






/* guardar y sumar datos localStorage */
let addItem = (array,key) => {
    localStorage.setItem(key, JSON.stringify(array));
};

let getItem = (key) => {
    let resultLocalStore = JSON.parse(localStorage.getItem(key));
    return resultLocalStore;
};

let objAciertos = (numAciertos) => {
    let obj = {};
    obj.fecha = fechaFinal;
    obj.aciertos = numAciertos;
    return obj;
}

if (getItem("resultados") == null){
    aciertos.push(objAciertos(getItem("numAciertos")))
    addItem(aciertos,"resultados")
}else{
    aciertos.push(objAciertos(getItem("numAciertos")))
    let  sumaData = getItem("resultados").concat(aciertos)
    addItem(sumaData,"resultados")
}

const result1 = document.getElementById("number1");
const result2 = document.getElementById("number2");


function paintResults(data1, data2) {
result1.innerHTML = data1;

result2.innerHTML = data2;
}
paintResults(getItem("numAciertos"), "10");

document.getElementById("boton").addEventListener("click", (e) => {
    window.location.href = "../index.html";
});