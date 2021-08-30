const fs = require("fs");
const path = require("path");

function composition(...functions) {
  return function (valor) {
    return functions.reduce(async (acc, fn) => {
      if (Promise.resolve(acc) === acc) {
        return fn(await acc);
      } else {
        return fn(acc);
      }
    }, valor);
  };
}

const mergeContent = (array) => array.join(" ");

const separateTextBy = (symbol) => {
  return function (text) {
    return text.split(symbol);
  };
};

function readFolder(pathFolder) {
  return new Promise((resolve, reject) => {
    try {
      let files = fs.readdirSync(pathFolder);
      files = files.map((file) => path.join(pathFolder, file));
      resolve(files);
    } catch (e) {
      reject(e);
    }
  });
}

function readFile(pathFile) {
  return new Promise((resolve, reject) => {
    try {
      const content = fs.readFileSync(pathFile, { encoding: "utf-8" });
      resolve(content.toString());
    } catch (e) {
      reject(e);
    }
  });
}

function readFiles(paths) {
  return Promise.all(paths.map((path) => readFile(path)));
}

function elementsEndingWith(textualPattern) {
  return function (array) {
    return array.filter((element) => element.endsWith(textualPattern));
  };
}

function removeIfEmpty(array) {
  return array.filter((element) => element.trim());
}

function removeIfIncluded(textualPattern) {
  return function (array) {
    return array.filter((element) => !element.includes(textualPattern));
  };
}

function removeIfHaveNumber(array) {
  return array.filter((element) => {
    // gera valor numérico ou NaN se não for numérico
    const number = parseInt(element.trim());
    return number !== number; // será true quando o resultado do número for igual a NaN
  });
}

function removeSymbols(symbols) {
  return function (array) {
    return array.map((element) => {
      return symbols.reduce((acc, symbol) => {
        return acc.split(symbol).join("");
      }, element);
    });
  };
}

function sortByNumericAttribute(attr, order = "desc") {
  return function (array) {
    const asc = (obj1, obj2) => obj1[attr] - obj2[attr];
    const desc = (obj1, obj2) => obj2[attr] - obj1[attr];
    return array.sort(order === "asc" ? asc : desc);
  };
}

function groupWords(words) {
  return Object.values(
    words.reduce((acc, world) => {
      const myWorld = world.toLowerCase();
      const qtd = acc[myWorld] ? acc[myWorld].qtd + 1 : 1;
      acc[myWorld] = { element: myWorld, qtd };

      return acc;
    }, {})
  );
}

module.exports = {
  composition,
  readFolder,
  readFile,
  readFiles,
  elementsEndingWith,
  removeIfEmpty,
  removeIfIncluded,
  removeIfHaveNumber,
  removeSymbols,
  sortByNumericAttribute,
  groupWords,
  mergeContent,
  separateTextBy,
};
