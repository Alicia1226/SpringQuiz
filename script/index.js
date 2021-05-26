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

    const config = {
        type: 'line',
        data,
        options: {
          scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Aciertos'
                }
            },
            x: {
              beginAtZero: true,
              title: {
                  display: true,
                  text: 'fecha'
              }
        }
      }
        }
      };
      var myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
}

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

