/* let quiz = window.location.herf = "../script/.question.json" */
/* console.log(quiz) */
async function getQuestionsAsync(questions) 
{
  let response = await fetch(`${questions}`);
  let data = await response.json()
  return data;
  
}

getQuestionsAsync("../question.json")
  .then(data => console.log(data))
  .catch(error => console.log("hubo un error"+error));

/* localStorage.setItem(results, JSON.stringify({
    
})); */
//Leer
let resultLocalStore = JSON.parse(localStorage.getItem('user'));

const result1 = document.getElementById("number1");
const result2 = document.getElementById("number2");
console.log()

function paintResults(data1,data2){
    
    result1.innerHTML = data1
    
    result2.innerHTML = data2

}
paintResults("2","5")

document.getElementById("boton").addEventListener("click",(e)=>{
    window.location.href="../index.html"
});