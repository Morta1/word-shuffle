const XLSX = require("xlsx");
const workbook = XLSX.readFile("vocabulary.xlsx");

const getCsvContent = (sheetIndex) => {
  const first_worksheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
  return shuffle(XLSX.utils.sheet_to_json(first_worksheet, { header: "a" }));
};

const getSheetsNames = () => {
  return workbook.SheetNames;
};

const shuffle = (array) => {
  if (!array || array.length === 0) {
    return [];
  }
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

module.exports = {
  getCsvContent,
  getSheetsNames
};
