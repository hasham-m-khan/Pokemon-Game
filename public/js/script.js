const cards = document.querySelectorAll(".card")
const selectBtn = document.querySelectorAll("#selectBtn")

cards.forEach(card => card.addEventListener('click', selectCard))
selectBtn.addEventListener('click', setSelectedPokemon)

let player;
let id;

function selectCard (e) {
  let idStr = e.target.id
  player = idStr.slice(0, 7)
  id = idStr.slice(8, idStr.length)
}

function setSelectedPokemon () {
  fetch(
    `http://localhost:8080/api/gameSession/${player}/${id}`,
    { method: 'PUT' }
  )
}