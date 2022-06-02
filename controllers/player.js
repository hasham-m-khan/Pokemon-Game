import { getRandomNum } from './utils.js'

export class Player {
  constructor (pokemons, pokemonsType) {
    this.pokemons = pokemons
    this.pokemonsType = pokemonsType
    this.totalHP = this.getPlayertotalHP()
    this.currentHP = this.totalHP
    this.setBaseAttack()
    this.selectedCard = pokemons[pokemons.length-1]
  }

  getPlayertotalHP () {
    return this.pokemons.reduce((hp, pokemon) => hp + +pokemon.hp, 0)
  }

  setPlayerCurrentHP (dmg) {
    this.currentHP = this.currentHP - dmg
  }

  setPokemonHP (id, dmg) {
    this.pokemons = this.pokemons.map(pokemon => 
      pokemon.id == id ? { ...pokemon, hp: +pokemon.hp - +dmg } : pokemon
    )
  }

  setBaseAttack () {
    this.pokemons = this.pokemons.map(pokemon => ({
      ...pokemon, 
      attacks: pokemon.attacks.map(attack => 
        attack.damage == '' ? { ...attack, damage: getRandomNum(15, 25, 1).toString() } : attack 
      )
    }))
  }

  selectCard (id) {
    this.selectedCard = this.pokemons.filter(pokemon => pokemon.id === id)
  }
}
