const path = require("path");
const fn = require("./functions");

const pathFolder = path.join(__dirname, "_data", "subtitles");

const symbols = [
  ".",
  "?",
  "-",
  ",",
  '"',
  "♪",
  "_",
  "<i>",
  "</i>",
  "\r",
  "[",
  "]",
  "(",
  ")",
];

const processesSubtitles = fn.composition(
  fn.readFolder,
  fn.elementsEndingWith(".srt"),
  fn.readFiles,
  fn.mergeContent,
  fn.separateTextBy("\n"),
  fn.removeIfEmpty,
  fn.removeIfIncluded("-->"),
  fn.removeIfHaveNumber,
  fn.removeSymbols(symbols),
  fn.mergeContent,
  fn.separateTextBy(" "),
  fn.removeIfEmpty,
  fn.removeIfHaveNumber,
  fn.groupWords,
  fn.sortByNumericAttribute("qtd", "desc")
);

processesSubtitles(pathFolder).then(console.log);
