let addItem = (array,key) => {
    localStorage.setItem(key, JSON.stringify(array));
};

let getItem = (key) => {
    let resultLocalStore = JSON.parse(localStorage.getItem(key));
    return resultLocalStore;
};


////////Añadir Keys aqui abajo
var firebaseConfig = {
    apiKey: "AIzaSyCskpTmFqDE6ItZZaE5YP4j-5H0Ch_ReUQ",
    authDomain: "springquiz.firebaseapp.com",
    projectId: "springquiz",
    storageBucket: "springquiz.appspot.com",
    messagingSenderId: "778769057568",
    appId: "1:778769057568:web:89066f8b89897d30de3945"
  };

///////////////////////////////
export {addItem, getItem, firebaseConfig }