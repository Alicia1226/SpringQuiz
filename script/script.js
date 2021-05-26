let addItem = (array,key) => {
    localStorage.setItem(key, JSON.stringify(array));
};

let getItem = (key) => {
    let resultLocalStore = JSON.parse(localStorage.getItem(key));
    return resultLocalStore;
};


////////Añadir Keys aqui abajo


///////////////////////////////
export {addItem, getItem, firebaseConfig }