

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


 document.querySelector('.lista').innerHTML = addDate()

async function getQuestionsAsync(questions) {
  let response = await fetch(`${questions}`);
  let data = await response.json();
  return data;
}
let newData = [{fecha:'13/12/2020',aciertos:0},{fecha:'14/12/2020',aciertos:6},{fecha:'15/12/2020',aciertos:1}]
getQuestionsAsync("../script/question.json")
  .then((data) => {
    /*  console.log(data);
    console.log(randElemnt(data)); */
    /* addItem(data); */
    sumaData()
  })

  .catch((error) => console.log("hubo un error" + error));

let randElemnt = (array) => {
  let result = [];
  while (result.length < array.length) {
    let random = Math.floor(Math.random() * array.length);
    let element = array[random];
    if (result.indexOf(element) == -1) result.push(element);
  }
  return result;
};
/* guardar y sumar datos localStorage */
let resultLocalStore = JSON.parse(localStorage.getItem("results"));
let addItem = (array) => {
  localStorage.setItem("resultados", JSON.stringify(array));
};
let getItem = (key) => {
  let resultLocalStore = JSON.parse(localStorage.getItem(key));
  return resultLocalStore;
};
let sumaData = () => {
  let oldData = getItem("resultados");
  let suma = oldData.concat(newData);
  addItem(suma)
};

const result1 = document.getElementById("number1");
const result2 = document.getElementById("number2");


function paintResults(data1, data2) {
  result1.innerHTML = data1;

  result2.innerHTML = data2;
}
paintResults("2", "5");

document.getElementById("boton").addEventListener("click", (e) => {
  window.location.href = "../index.html";
});

