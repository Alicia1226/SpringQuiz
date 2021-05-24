let preguntaNum = 0;
let numAciertos = 0;
let preguntas = []
let userAnsw = []
let oldNumA = 0;


//

let addItem = (array,key) => {
  localStorage.setItem(key, JSON.stringify(array));
};

let getItem = (key) => {
  let resultLocalStore = JSON.parse(localStorage.getItem(key));
  return resultLocalStore;
};



//

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
    while(result.length < array.length){
        let random = Math.floor(Math.random() * array.length);
        let element = array[random];
        if (result.indexOf(element) == -1)result.push(element)
    }
    return result;
}

let drawQuestion = (pregunta) =>{
        document.querySelector(".pregunta").innerHTML=""
        if (document.querySelector(".qContenedor")){
            document.querySelector(".qContenedor").innerHTML="";
        }

        let id = pregunta.id;
        let pre = pregunta.pregunta;
        let res = randElemnt(pregunta.respuestas); //array
        let tituloP = document.querySelector(".pregunta");
        let boxPregunta = document.querySelector(".qContenedor");
        let tagDivP = document.createElement("div")

        tagDivP.setAttribute("id",`qidF${id}`);
        tagDivP.setAttribute("class","qclassFielset");
        boxPregunta.appendChild(tagDivP);
        tituloP.innerHTML = pre
        
        for (let num=0; num<4;num++){
            //creacion de elementos
            let tagInput = document.createElement("input");
            let tagLabel = document.createElement("label");
            /* let tagResp = document.createTextNode(res[num]); */
            
            //colocacion de atributos
            tagInput.setAttribute("id",`qop${num}`); //num es un i de recorrido
            tagInput.setAttribute("type","radio");
            tagLabel.setAttribute("for",`qop${num}`);
            tagLabel.setAttribute("class",`qop${num}`);

            //appendchild
            tagLabel.innerHTML = res[num];
            tagDivP.appendChild(tagInput);
            tagDivP.appendChild(tagLabel);
        }

        let tagBN = document.createTextNode("Siguiente");

        let tagDF = document.createElement("div");
        tagDF.setAttribute("class","qBoton");
        
        let buttonS = document.createElement("button");
        buttonS.setAttribute("id","boton");
        buttonS.setAttribute("type","submit");
        buttonS.appendChild(tagBN);

        tagDF.appendChild(buttonS);
        tagDivP.appendChild(tagDF);
}


let compRespuestas = () => {
    userAnsw.forEach((e,i,a) => {
        if(preguntas[i].id == e.id && preguntas[i].solucion == e.solucion){
            numAciertos += 1 
        }
    })
}

let objAnswUser = (idP,respuesta) => {
    let obj = {};
    obj.id = idP;
    obj.solucion = respuesta;
    return obj;
}

let datoSlct = ()=>{
    let pArray = document.getElementsByClassName("qclassFielset")[0].id;
    let idQ = pArray.replace('qidF','')
    let arry = document.getElementsByClassName("qclassFielset")[0].children;
    let inputID;
    let respuestaUser;

    for (let i=0;i< arry.length;i++){
        if (arry[i].checked){
            inputID = arry[i].id
        }    
    }
    
    for (let a=0;a< arry.length;a++){
        if (arry[a].htmlFor == inputID){
            respuestaUser = arry[a].outerText
        }
    }

    return objAnswUser(idQ,respuestaUser);
}

//
async function getQuestionsAsync(questions) {
    let response = await fetch(`${questions}`);
    let data = await response.json();
    return data;
}


questionAPI()
    .then(x => {
        x.results.forEach((e,i,a) => {
            addPreguntaToArry(i,e.question,e.correct_answer,e.incorrect_answers)
        })
    })
    .then(() => {
        getQuestionsAsync("../script/question.json").then((x) => {
                x.forEach((obj)=>{
                preguntas.push(obj)
            }) 
            preguntas = randElemnt(preguntas)
            /* console.log(preguntas) */
            preguntas.forEach(x=> console.log(x.solucion))
            drawQuestion(preguntas[preguntaNum]);
            document.getElementById("formulario").addEventListener('submit',(event) =>{
                event.preventDefault();
                userAnsw.push(datoSlct());
                preguntaNum += 1;
                if (preguntaNum <= preguntas.length - 1){
                    drawQuestion(preguntas[preguntaNum]);
                }else{
                    compRespuestas()
                    addItem(numAciertos, "numAciertos")
                    console.log("Num aciertos: " + numAciertos)
                    console.log(userAnsw)
                    /* console.log(objAciertos(numAciertos)) */
                    window.open("../html/results.html","_self");
                }
            })

        }).catch((error) => console.log("hubo un error" + error))
   })


