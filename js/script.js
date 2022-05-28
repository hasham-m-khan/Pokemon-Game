const p1Image = document.querySelector("#player1")
const p2Image = document.querySelector("#player2")
let pokemons = fetch('http://localhost:8000/api')
  .then(res => res.json())
  .then(data => {
    p1Image.src = data.player1[0].images.large
    p2Image.src = data.player2[0].images.large
  })