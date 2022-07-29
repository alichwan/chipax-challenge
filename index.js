
const fs = require('fs/promises');
const express = require('express');
const _ = require('lodash');
const apiControllers = require('./controllers/exercises.js');


const app = express();

app.get('/', async (req,res) => {

  await apiControllers.exercisesResponse()
    .then((resultados) => {
      console.log("index.js/ app.get",resultados);
      res.json(resultados);
    })
    .catch((err) => console.error(err));
})

app.listen(3000, ()=>{
  console.log("API running");
})