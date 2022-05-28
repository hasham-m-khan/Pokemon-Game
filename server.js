const http = require('http')
const fs = require('fs')

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
      console.log(jsonObj);

      player1Type = pokemonTypes[getRandomNum(0, 10)[0]]
      let player1PokemonsList = jsonObj.data.filter(
        pokemon => pokemon.types.includes(player1Type)
      )

      let player2PokemonsList = jsonObj.data.filter(
        pokemon => pokemon.types.includes(pokemonTypes[getRandomNum(0, 10)])
      )

      sendResponse(res, player1PokemonsList, 'application/json', true)
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
    if(uniqueNums) {
      let randomNum = Math.floor(Math.random() * (max - min)) + min;
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
