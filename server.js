import http from 'http'
import fs from 'fs'

const server = http.createServer(async (req, res) => {
  const page = req.url;
  
  // Get file extension & name
  let fileExt = page.includes('.') ? getExtension(page) : (page.includes('/api') ? '.json' : '.html')
  let filename = fileExt == '.html' ? (page === '/' ? 'index.html' : `${page.slice(1)}.html`) : page.slice(1)

  // Set the Content-Type
  const contentTypes = { 
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'avif': 'image/avif',
    'ico': 'image/x-icon',
  }
  let contentType = contentTypes[fileExt.slice(1)]

  // Check URL and send response
  if (!page.includes('/api')) {
    fs.readFile(filename, 'utf8', (err, content) => {
      if (err) console.log(err);
      sendResponse(res, content, contentType, false)
    })
  } else {
    fs.readFile('pokemon.json', 'utf8', (err, content) => {
      if (err) return err;

      const pokemonTypes = [
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

      let jsonObj = JSON.parse(content);

      player1Pokemons = getPokemons(jsonObj.data, pokemonTypes[getRandomNum(0, 10)[0]], 4)
      player2Pokemons = getPokemons(jsonObj.data, pokemonTypes[getRandomNum(0, 10)[0]], 4)
      sendResponse(res, {player1: player1Pokemons, player2: player2Pokemons}, 'application/json', true)
    })
    
  }

})

const PORT = 8000;
server.listen(PORT, () => console.log(`Server is running on port: ${ PORT }`))


/* 
UTIL FUNCTIONS
*/

function sendResponse (res, data, contentType, isJson = false) {
  res.writeHead(200, {  'Content-Type': contentType })
  res.end(isJson ? JSON.stringify(data) : data)
}

let getExtension = str => str.substring(str.lastIndexOf('.'), str.length)

function getRandomNum (min, max, repeat=1, uniqueNums=false) {
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

function getPokemons (list, type, num) {
  let typePokemons = list.filter(
    pokemon => pokemon.types.includes(type)
  )

  let PokemonIndexes = getRandomNum(0, typePokemons.length - 1, num, true)
  return PokemonIndexes.map(i => typePokemons[i])
}
