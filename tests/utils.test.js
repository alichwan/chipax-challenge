const {
  charCount,
  listToCount,
  counterFetcher,
  locsInEpisode,
  episodeInfo
} = require("../controllers/utils");

test("count correctly the number of times a character (case insensitive) appears on a text", () => {
  expect(charCount("e", "elephants are cute")).toBe(4);
})

test("count correctly the number of times a character (case insensitive) appears on a list of objects", () => {
  const list = [
    "Mario",
    "Anita",
    "Ramon",
    "Samuel",
  ]
  expect(listToCount(list, "m")).toBe(3);
})

