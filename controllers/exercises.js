const fetch = require("cross-fetch");

const apiRoot = "https://rickandmortyapi.com/api";
const timeLimit = 3000;

const charCount = (char, text) => {
  return text.toLowerCase().split(char).length - 1;
};

const charCounterExercise = async () => {
  const results = new Array();
  console.log("Start char counter");
  const start_exec = new Date();
  //  EXCERCISE

  const variables = [
    { char: "l", resource: "location" },
    { char: "e", resource: "episode" },
    { char: "c", resource: "character" },
  ];
  // END OF EXCERCISE

  const stop_exec = new Date();
  const execTime = stop_exec - start_exec; // miliseconds
  return {
    exercise_name: "Char counter",
    time: execTime,
    in_time: execTime <= timeLimit,
    results: results,
  };
};

const episodeLocationsExercise = async () => {
  const results = new Array();
  console.log("Start episode location");
  const start_exec = new Date();
  //  EXCERCISE
  await fetch(`${apiRoot}/location`).then((data)=>{
    console.log("testing");
  })
  // END OF EXCERCISE
  const stop_exec = new Date();
  const execTime = stop_exec - start_exec; // miliseconds
  return {
    exercise_name: "Episode locations",
    time: execTime,
    in_time: execTime <= timeLimit,
    results: results,
  };
};

const exercisesResponse = async () => {
  const results = new Array();
  // char Counter Exercise
  await charCounterExercise().then((data) => {
    results.push(data);
  });
  // episode Locations Exercise
  await episodeLocationsExercise().then((data) => {
    results.push(data);
  });
  return results;
};

module.exports = {
  charCounterExercise,
  episodeLocationsExercise,
  exercisesResponse,
};

// const testing = () => {
//   const cathegory = "location";
//   const frProm = fetch(`${apiRoot}/${cathegory}`)
//     .then( response => response.json(), "fallauno")
//   // .then( data => {
//   //   // data.results.forEach((d) => console.log(charCount("c",d.name)))
//   //   // console.log(data.info.pages);

//   })
// }
// testing()