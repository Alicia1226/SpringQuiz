let preguntaNum = 0;
let numAciertos = 0;
let preguntas = []
let userAnsw = []
let aciertos = []


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

let datoSlct = ()=>{
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
    return respuestaUser;
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
        if(preguntas[i].id == i && preguntas[i].solucion == e){
            numAciertos += 1 //hay que poner a 0 al terminar de contar
        }
    })
    /* console.log(numAciertos) */
}

let objAciertos = (numAciertos) => {
    let fecha = new Date()
    let hoy = fecha.toLocaleDateString()
    let obj = {};
    
    if (aciertos.length == 0 || aciertos[aciertos.length - 1].fecha != hoy){
            obj.fecha = hoy;
            obj.aciertos = numAciertos;
    }else{
        if(aciertos[aciertos.length - 1].fecha == hoy){
            let acumulado = aciertos[aciertos.length - 1].aciertos + numAciertos;
                obj.fecha = hoy
                obj.aciertos = acumulado
        }
    }
    return obj;
}

//aciertos.push(objAciertos(45)) 


questionAPI()
    .then(x => {
        x.results.forEach((e,i,a) => {
            addPreguntaToArry(i,e.question,e.correct_answer,e.incorrect_answers)
        })
    })
    .then(() => {
        
        preguntas.forEach(x=> console.log(x.solucion))
        drawQuestion(preguntas[preguntaNum]);
        document.getElementById("formulario").addEventListener('submit',(event) =>{
            event.preventDefault();
            
            userAnsw.push(datoSlct());

            if ( preguntaNum < preguntas.length -1){
                preguntaNum += 1;
                drawQuestion(preguntas[preguntaNum]);
            }else{
                compRespuestas()
                console.log(userAnsw)
                console.log(objAciertos(numAciertos))
                window.open("../html/results.html","_self");
            }
        })
    })
