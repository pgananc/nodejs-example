//Crear una función que reciba un callback y lo ejecute al finalizar la ejecución.
function multiple(a, b, callback) {
  callback(a * b);
}

console.log("Antes de ejecutar!!!");

multiple(3, 2, function (result) {
  console.log(result);
});

console.log("Despues de ejecutar!!");
//Crear otra función diferente, que transforme la función anterior en una promesa
const readPromise = new Promise(function (resolve, reject) {
  multiple(4, 2, function (result) {
    console.log(result);
  });
});

readPromise.then(console.log);
readPromise.catch(function () {
  console.log("Hubo un error");
});

//Crear una última función llamando a las dos anteriores y combinando su respuesta

const readPromise2 = new Promise(function (resolve, reject) {
  multiple(6, 2, function (result) {
    console.log(result);
  });
});

(async function () {
  await Promise.all([readPromise, readPromise2]);
  console.log("Promesas");
})();
