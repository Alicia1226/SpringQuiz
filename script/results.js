let aciertos;
let newData = []





/* guardar y sumar datos localStorage */
let addItem = (array,key) => {
    localStorage.setItem(key, JSON.stringify(array));
};

let getItem = (key) => {
    let resultLocalStore = JSON.parse(localStorage.getItem(key));
    return resultLocalStore;
};

let sumaData = (nameItem) => {
    let oldData = getItem(nameItem);
    let suma = oldData.concat(newData);
    addItem(suma)
};

let fecha = new Date()
let hoy = fecha.toLocaleDateString()

if (getItem("resultados") != null){
    aciertos = getItem("resultados")
}else{
    aciertos = []
}

oldNumA = getItem("oldNumA")

let objAciertos = (numAciertos) => {

    let obj = {};
    
    if (aciertos.length == 0 || aciertos[aciertos.length - 1].fecha != hoy){
            obj.fecha = hoy;
            obj.aciertos = numAciertos;
    }else{
        if(aciertos[aciertos.length - 1].fecha == hoy){
            let acumulado = aciertos[aciertos.length - 1].aciertos + numAciertos;
                obj.fecha = hoy
                obj.aciertos = acumulado
        }
    }
    return obj;
}
/* console.log(aciertos[aciertos.length - 1].fecha == hoy) */
if (aciertos.length == 0){
    let obj = {};
    obj.fecha = hoy;
    obj.aciertos = getItem("numAciertos");
    aciertos.push(obj)
}else if(aciertos[aciertos.length - 1].fecha == hoy ){
    aciertos.pop()
    aciertos.push(objAciertos(getItem("numAciertos") + getItem("oldNumA")))
}
addItem(aciertos,"resultados")


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