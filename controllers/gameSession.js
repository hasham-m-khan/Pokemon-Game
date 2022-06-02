import fs from 'fs'
import path from 'path'
import { Player } from './player.js'
import { getRandomNum } from './utils.js'

export class GameSession {

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

  constructor(pokemonsFilePath) {
    this.pokemons = this.getAllPokemons(pokemonsFilePath)

    let player1Type = this.pokemonTypes[getRandomNum(0, 10)[0]]
    let player2Type = this.pokemonTypes[getRandomNum(0, 10)[0]]
    this.player1 = new Player(this.getPokemons(this.pokemons, player1Type, 4), player1Type)
    this.player2 = new Player(this.getPokemons(this.pokemons, player2Type, 4), player2Type)
    this.currentTurn = 0
  }

  getPokemons (list, type, num) {
    let typePokemons = list.filter(
      pokemon => pokemon.types.includes(type)
    )
  
    let PokemonIndexes = getRandomNum(0, typePokemons.length - 1, num, true)
    return PokemonIndexes.map(i => typePokemons[i])
  }

  getAllPokemons (pokemonsFilePath) {
    return JSON.parse(fs.readFileSync(pokemonsFilePath, 'utf8')).data
  }

  attackPokemon (player, pokemonId, dmg) {
    player.setPokemonHP(pokemonId, dmg)
  }

}

let gameSession = new GameSession(path.join(process.cwd(),'pokemon.json'))
gameSession.attackPokemon(gameSession.player1, gameSession.player1.pokemons[0].id, 30)
