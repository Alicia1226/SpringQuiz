
let fecha = []
let aciertos2 =  []


 let aciertos = [{fecha:'13/12/2020',aciertos:0},{fecha:'14/12/2020',aciertos:6},{fecha:'15/12/2020',aciertos:1}]


    aciertos.forEach((datos)=>{
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

 console.log(document.getElementsByClassName('lista'))

function addDate (){

    let textInner = "<ul>"
    aciertos.forEach((elemento)=>{
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

console.log(addDate())

 document.querySelector('.lista').innerHTML = addDate()
