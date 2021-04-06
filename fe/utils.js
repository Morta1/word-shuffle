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

const getRandomArbitrary = (min, max, excluded) => {
  let randomNumber = Math.floor(Math.random() * (max - min) + min);
  while (randomNumber === excluded) {
    randomNumber = Math.floor(Math.random() * (max - min) + min);
  }
  return randomNumber;
};

export { shuffle, getRandomArbitrary };
