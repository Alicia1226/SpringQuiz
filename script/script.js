const result1 = document.getElementById("number1");
const result2 = document.getElementById("number2");
console.log()

function paintResults(data1,data2){
    
    result1.innerHTML = data1
    
    result2.innerHTML = data2

}
paintResults("1","5")