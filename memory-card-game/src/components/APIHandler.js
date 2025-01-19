export const APIHandler = (() => {
  const pokemon = new Map();
  let pokedex = null;

  async function init() {
    const data = await handleFetch(
      "https://pokeapi.co/api/v2/pokedex?limit=50",
    );
    // prevent reload of pokedex data in race conditions
    if (pokedex) return;
    pokedex = data.results.map(
      (dexObj) => new Pokedex(dexObj.name, dexObj.url),
    );
  }

  async function loadDex(idx) {
    if (pokedex[idx].pokemonIds.length) return;
    const jsonData = await handleFetch(pokedex[idx].getURL());
    if (pokedex[idx].pokemonIds.length) return;
    jsonData.pokemon_entries.forEach((jsonObj) => {
      const id = Pokemon.getId(jsonObj.pokemon_species.url);
      pokedex[idx].pokemonIds.push(id);

      if (!pokemon.has(id)) {
        const pokemonObj = new Pokemon(
          jsonObj.pokemon_species.name,
          jsonObj.pokemon_species.url,
        );
        pokemon.set(id, pokemonObj);
      }
    });
  }

  async function loadPokemon(id) {
    if (pokemon.get(id).loaded) return;
    const data = await handleFetch(pokemon.get(id).getURL());
    const pokemonObj = pokemon.get(data.id);
    pokemonObj.setTypes(data.types);
    pokemonObj.setImageSrc(data.sprites);
    pokemonObj.loaded = true;
  }

  function getRandomIds(num, dexIdx) {
    const max = pokedex[dexIdx].pokemonIds.length;
    const randomArr =
      num > max / 2 ? getRandomDel(num, max) : getRandomAdd(num, max);
    return randomArr.map((idx) => pokedex[dexIdx].pokemonIds[idx]);
  }

  function getRandomDel(num, max) {
    const randomSet = new Set(Array.from({ length: max }, (_, i) => i));
    // handle case: num > max
    while (randomSet.size > num || randomSet.size > max)
      randomSet.delete(Math.floor(Math.random() * max));
    return Array.from(randomSet);
  }

  function getRandomAdd(num, max) {
    const randomSet = new Set();
    // handle case: num > max
    while (randomSet.size < num && randomSet.size < max)
      randomSet.add(Math.floor(Math.random() * max));
    return Array.from(randomSet);
  }

  function getAllPokedex() {
    return pokedex;
  }

  function getPokemon(id) {
    return pokemon.get(id);
  }

  return {
    init,
    loadPokemon,
    getRandomIds,
    loadDex,
    getAllPokedex,
    getPokemon,
  };
})();

export class Pokedex {
  pokemonIds = [];
  constructor(name, url) {
    this.name = this.#capitalise(name);
    this.id = this.#getId(url);
  }

  #capitalise(name) {
    return name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  #getId(url) {
    return +url.split("/").at(-2);
  }

  getURL() {
    return `https://pokeapi.co/api/v2/pokedex/${this.id}`;
  }
}

export class Pokemon {
  loaded = false;
  types = null;
  imgsrc = null;
  constructor(name, url) {
    this.name = this.#capitalise(name);
    this.id = Pokemon.getId(url);
  }

  static getId(url) {
    return +url.split("/").at(-2);
  }

  getURL() {
    return `https://pokeapi.co/api/v2/pokemon/${this.id}`;
  }

  setTypes(types) {
    this.types = types.map((obj) => this.#capitalise(obj.type.name));
  }

  setImageSrc(spritesData) {
    this.imgsrc = spritesData.other["official-artwork"].front_default;
  }

  #capitalise(name) {
    return name[0].toUpperCase() + name.slice(1);
  }
}

async function handleFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Status Code: " + response.status);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
