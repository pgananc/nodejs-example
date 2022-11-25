const express = require("express");
const app = express();

app.use("/employee", (req, res) => {
  res.status(200).json({
    name: "Pablo Ganan",
    age: 38,
    status: true,
  });
});

app.listen(3000, function () {
  console.log("API Empleados");
});

const readPromise = new Promise(function (resolve, reject) {
  funcionAsincrona(function (err, data) {
    if (err) {
      return reject(err);
    }
    resolve(data);
  });
});

async function funcionAsincrona() {
  console.log("Prueba");
}

readPromise
  .then((data) => console.log("Termino", data))
  .catch((err) => console.log("Error", err))
  .finally(() => console.log("Finally"));
