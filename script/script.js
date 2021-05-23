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
console.log();

function paintResults(data1, data2) {
  result1.innerHTML = data1;

  result2.innerHTML = data2;
}
paintResults("2", "5");

document.getElementById("boton").addEventListener("click", (e) => {
  window.location.href = "../index.html";
});
