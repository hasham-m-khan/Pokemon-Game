import fs from 'fs'

class API {
  contentType = 'application/json'

  constructor(response, data) {
    this.response = response
    this.data = data
  }

  sendResponse () {
    this.response.writeHead(200, {  'Content-Type': this.contentType })
    this.response.end(JSON.stringify(this.data))
  }
}

export class PokemonAPI extends API {

  pokemonTypes = [
    "Colorless",
    "Darkness",
    "Dragon",
    "Fairy",
    "Fighting",
    "Fire",
    "Grass",
    "Lightning",
    "Metal",
    "Psychic",
    "Water"
  ]

  constructor (response, data, params ) {
    super(response)
    this.params = params
  }

  getRandomNum (min, max, repeat=1, uniqueNums=false) {
    let returnArr = [];
    let i = 1;
  
    while (i <=repeat ) {
      let randomNum = Math.floor(Math.random() * (max - min)) + min;
      if(uniqueNums) {
        if (!returnArr.includes(randomNum)) {
          returnArr.push(randomNum)
          i++
        }
      } else {
        returnArr.push(randomNum)
        i++
      }
    }
  
    return returnArr
  }
  
  getPokemons (list, type, num) {
    let typePokemons = list.filter(
      pokemon => pokemon.types.includes(type)
    )

    let PokemonIndexes = getRandomNum(0, typePokemons.length - 1, num, true)
    return PokemonIndexes.map(i => typePokemons[i])
  }
}
