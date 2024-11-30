export const defaultHashFunction = `function hash(key) {
  let hashCode = 0;
      
  const primeNumber = 11;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }

  return hashCode;
}`;

export const defaultArray = `  "apple":"red",
  "banana":"yellow",
  "carrot":"orange",
  "dog":"brown",
  "elephant":"grey",
  "frog":"green",
  "grape":"purple",
  "hat":"black",
  "ice cream":"white",
  "jacket":"blue",
  "kite":"pink",
  "lion":"golden",
`;
