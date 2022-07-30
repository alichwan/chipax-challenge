const fetch = require("cross-fetch");
const {
  miniRes,
  counterFetcher,
  locsInEpisode,
  episodeInfo,
} = require("./utils");

const apiRoot = "https://rickandmortyapi.com/api";
const timeLimit = 3000;

const charCounterExercise = async () => {
  const results = new Array();
  const start_exec = new Date();
  //  EXCERCISE
  const cases = [
    { char: "l", resource: "location" },
    { char: "e", resource: "episode" },
    { char: "c", resource: "character" },
  ];
  const [loc, ep, ch] = await Promise.all(
    cases.map((c) => counterFetcher(c.char, c.resource, apiRoot))
  );
  results.push(miniRes("l", loc, "location"));
  results.push(miniRes("e", ep, "episode"));
  results.push(miniRes("c", ch, "character"));
  const stop_exec = new Date();
  // END OF EXCERCISE
  const execTime = stop_exec - start_exec; // miliseconds
  return {
    exercise_name: "Char counter",
    time: `${execTime/1000} s`,
    in_time: execTime <= timeLimit,
    results: results,
  };
};

const episodeLocationsExercise = async (episodeId) => {
  if (episodeId == "all") {
    return {
      message: "Please add a episode id in the urls in order to run the excercise"
    }
  }
  const results = new Array();
  const start_exec = new Date();
  //  EXCERCISE
  const epInfo = await episodeInfo(episodeId, apiRoot);
  const locsInEp = await locsInEpisode(episodeId, apiRoot);
  results.push({...epInfo, locations: locsInEp})
  // END OF EXCERCISE
  const stop_exec = new Date();
  const execTime = stop_exec - start_exec; // miliseconds
  return {
    exercise_name: "Episode locations",
    time: `${execTime/1000} s`,
    in_time: execTime <= timeLimit,
    results: results,
  };
};

const exercisesResponse = async (episodeId) => {
  // We consider an episodeId for the second excercise
  return Promise.all([
    charCounterExercise(),
    episodeLocationsExercise(episodeId),
  ]);
};

module.exports = {
  exercisesResponse,
};
