let preguntas = []

//1. hacer un fichero de preguntas y respustas, crear un json

let questionAPI = async ()=>{
    let fQuetionAPI = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple');
    let data = fQuetionAPI.json();
    return data;
}

let addPreguntaToArry = (id,question,correctAns,incorrectAns,)=>{
    let objPregunta= {}
    objPregunta["id"] = id;
    objPregunta["pregunta"] = question;
    objPregunta["solucion"] = correctAns;  
    objPregunta["respuestas"] = incorrectAns;
    objPregunta.respuestas.push(correctAns);
    preguntas.push(objPregunta); 
}

let drawQuestion = () =>{
    let boxPregunta = ;
    //creacion de elementos
    let tagInput = document.createElement("input");
    let tagLabel = document.createElement("label");
    //colocacion de atributos
    tagInput.setAttribute("id","qop1");
    tagInput.setAttribute("type","radio");
    tagLabel.setAttribute("for","qop1");
    tagLabel.setAttribute("class","qop1");
    //appendchild

}

questionAPI()
    .then(x => {
        x.results.forEach((e,i,a) => {
            addPreguntaToArry(i,e.question,e.correct_answer,e.incorrect_answers)
        })
    })
    .then( () => console.log(preguntas)) 