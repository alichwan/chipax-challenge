const fetch = require("cross-fetch");

const apiRoot = "https://rickandmortyapi.com/api";
const timeLimit = 3000;

const charCount = (char, text) => {
  return text.toLowerCase().split(char).length - 1;
};

const listToCount = (list, char) => {
  let counter = 0;
  list.forEach((d) => {
    counter += charCount(char, d.name);
  });
  return counter;
};

const counterFetcher = async (char, resource) => {
  try {
    const partial = new Array();
    return fetch(`${apiRoot}/${resource}`)
      .then((response) => response.json())
      .then((data) => data.info.pages)
      .then((nPages) => {
        for (let i = 1; i <= nPages; i++) {
          partial.push(
            fetch(`${apiRoot}/${resource}?page=${i}`)
              .then((response) => response.json())
              .then((data) => listToCount(data.results, char))
          );
        }
        return Promise.all(partial);
      });
  } catch (err) {
    console.log(err);
  }
};

const miniRes = (char, count, resource) => {
  return {
    char: char,
    count: count,
    resource: resource,
  };
};

const charCounterExercise = async () => {
  const results = new Array();
  console.log("Start char counter");
  const start_exec = new Date();
  //  EXCERCISE
  const [loc, ep, ch] = await Promise.all([
    counterFetcher("l", "location"),
    counterFetcher("e", "episode"),
    counterFetcher("c", "character"),
  ]);
  results.push(
    miniRes(
      "l",
      loc.reduce((a, b) => a + b, 0),
      "location"
    )
  );
  results.push(
    miniRes(
      "e",
      ep.reduce((a, b) => a + b, 0),
      "episode"
    )
  );
  results.push(
    miniRes(
      "c",
      ch.reduce((a, b) => a + b, 0),
      "character"
    )
  );
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
  await fetch(`${apiRoot}/location`).then((data) => {
    console.log("testing");
  });
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
  const [CCE, ELE] = await Promise.all([
    charCounterExercise(),
    episodeLocationsExercise(),
  ]);
  return [CCE, ELE];
};

module.exports = {
  charCounterExercise,
  episodeLocationsExercise,
  exercisesResponse,
};
