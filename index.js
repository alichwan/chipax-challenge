
const fs = require('fs/promises');
const express = require('express');
const apiControllers = require('./controllers/exercises.js');


const app = express();

app.get('/:episode', async (req,res) => {
  await apiControllers.exercisesResponse(req.params.episode)
    .then( resultados => {
      res.json(resultados);
    })
    .catch((err) => console.error(err));
})

app.get('/', async (req,res) => {
  res.redirect('/all')
});

app.listen(3000, ()=>{
  console.log("Listening");
})