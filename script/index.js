let fecha = []
let aciertos2 =  []





/* guardar y sumar datos localStorage */


let addItem = (array,key) => {
  localStorage.setItem(key, JSON.stringify(array));
};

let getItem = (key) => {
  let resultLocalStore = JSON.parse(localStorage.getItem(key));
  return resultLocalStore;
};

/* let sumaData = () => {
  let oldData = getItem("resultados");
  let suma = oldData.concat(newData);
  addItem(suma)
};
 */

/* let aciertos = [{fecha:'13/12/2020',aciertos:0},{fecha:'14/12/2020',aciertos:6},{fecha:'15/12/2020',aciertos:1}]
addItem(aciertos,"resultados") */

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

 