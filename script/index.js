import { getItem } from './script.js';

let fecha = [];
let aciertos2 =  [];


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
    let options = {
        width: 300,
        height: 200,
        axisY: {
            onlyInteger: true,
            scaleMinSpace: 40,
            type: Chartist.FixedScaleAxis, // Escala en el eje : Auto, Fixed,Step
            ticks: years,
        }
    };
    new Chartist.Line('.ct-chart', data, options);
};;



//     var options = {
//         width: 300,
//         height: 200,
//             }
//             axisY: {
//                 onlyInteger: true,
//                 scaleMinSpace: 40,
//                 type: Chartist.FixedScaleAxis, // Escala en el eje : Auto, Fixed,Step
//                 ticks: aciertos,
//             }
            
//     };
//   new Chartist.Line('.ct-chart', data, options);


function addDate (){
    let textInner = "<ul>"
    getItem("resultados").forEach((elemento)=>{
        textInner+="<li>";
        textInner+=elemento.fecha;
        textInner+= " ";
        textInner+="<b>";
        textInner+=elemento.aciertos;
        textInner+= " ";
        textInner+= "aciertos";
        textInner+="</b>";
        textInner+="</li>";
    })
    textInner+= "</ul>";
    return textInner;
}

function dibujaLista() {
    document.querySelector('.lista').innerHTML = addDate();
}

if (getItem("resultados") !== null){
    dibujaGrafica();
    dibujaLista();
}