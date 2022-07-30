const fetch = require("cross-fetch");
const _ = require('lodash');

const listSum = (list) => {
  return list.reduce((a, b) => a + b, 0);
};

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

const miniRes = (char, count, resource) => {
  return {
    char: char,
    count: count,
    resource: resource,
  };
};

const counterFetcher = async (char, resource, apiRoot) => {
  try {
    const nPages = await fetch(`${apiRoot}/${resource}`)
      .then( response => response.json())
      .then( data => data.info.pages);
    const pagesArray = [...Array(nPages).keys()];
    return Promise.all(
      pagesArray.map((i) => {
        return fetch(`${apiRoot}/${resource}?page=${i + 1}`)
          .then( response => response.json())
          .then( data => listToCount(data.results, char));
      })
    )
    .then(charList => _.sum(charList));
  } catch (err) {
    console.log(err);
    return {
      status: err.status,
      message: err.message,
    };
  }
};

const locsInEpisode = async (epId, apiRoot) => {
  try {
    const charsUrl = await fetch(`${apiRoot}/episode/${epId}`)
      .then( response => response.json())
      .then( data => data.characters);

    const locations =  await Promise.all(
      charsUrl.map( url => fetch( url )
        .then( response => response.json())
        .then( data => data.origin.name))
    )
    return _.uniq(locations)
  } catch (err) {
    console.log(err);
    return {
      status: err.status,
      message: err.message,
    };
  }
};

const episodeInfo = async (epId, apiRoot) => {
  try {
    return  fetch(`${apiRoot}/episode/${epId}`)
      .then( response => response.json())
      .then( data => {
        return {
          name: data.name,
          episode: data.episode
        }
      });
  } catch (err) {
    console.log(err);
    return {
      status: err.status,
      message: err.message,
    };
  }
};

module.exports = {
  miniRes,
  counterFetcher,
  locsInEpisode,
  episodeInfo
};