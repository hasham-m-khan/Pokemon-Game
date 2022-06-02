import path from 'path'
import express from 'express'
// import bodyParser from 'body-parser'

import { GameSession } from './controllers/gameSession.js'

const __dirname = path.resolve()
const app = express()
app.set('view engine', 'ejs')
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(express.static('public'))

let gameSession = new GameSession(path.join(__dirname, 'pokemon.json'))

app.get('/', (_, res) => {
  res.render('index.ejs', { gameSession })
})

app.get('/api/gameSession', (req, res) => {
  res.json(gameSession.player1)
})

app.put('/api/gameSession/:player/:pokeId', (req, res) => {
  console.log(req.params);
  gameSession[req.params.player].selectedCard = 
    gameSession[req.params.player].selectCard(req.params.id);

  
  res.json(gameSession[req.params.player].selectedCard)
})

app.get('/api/gameSession/:player/:pokeId', (req, res) => {
  // console.log(req.params);
  gameSession[req.params.player].selectCard(req.params.id);
  res.json(gameSession[req.params.player].selectedCard)
})

app.listen(8080, _ => console.log('Listening on port 8080 ...'))
