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

let randElemnt = (array)=>{
    let result=[];
    while(result.length < 4){
        let random = Math.floor(Math.random() * array.length);
        let element = array[random];
        if (result.indexOf(element) == -1)result.push(element)
    }
    return result;
}


let drawQuestion = (pregunta) =>{
        let id = pregunta.id;
        let pre = pregunta.pregunta;
        let res = randElemnt(pregunta.respuestas); //array
        let tituloP = document.querySelector(".pregunta");
        let boxPregunta = document.querySelector("#qidF");
        let tagPreg = document.createTextNode(pre);
        tituloP.appendChild(tagPreg);
        for (let num=0; num<4;num++){
            //creacion de elementos
            let tagInput = document.createElement("input");
            let tagLabel = document.createElement("label");
            let tagResp = document.createTextNode(res[num]);
            
            //colocacion de atributos
            tagInput.setAttribute("id",`qop${num}`); //num es un i de recorrido
            tagInput.setAttribute("type","radio");
            tagLabel.setAttribute("for",`qop${num}`);
            tagLabel.setAttribute("class",`qop${num}`);

            //appendchild
            tagLabel.appendChild(tagResp);
            boxPregunta.appendChild(tagInput);
            boxPregunta.appendChild(tagLabel);
        }
}


questionAPI()
    .then(x => {
        x.results.forEach((e,i,a) => {
            addPreguntaToArry(i,e.question,e.correct_answer,e.incorrect_answers)
        })
    })
    .then( () => {
        console.log(preguntas[0]) 
        drawQuestion(preguntas[0])
    }) 