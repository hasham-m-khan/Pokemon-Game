const cards = document.querySelectorAll(".card")
cards.forEach(card => card.addEventListener('click', selectCard))

function selectCard (e) {
  let idStr = e.target.id
  // console.log(idStr);
  let player = idStr.slice(0, 7)
  console.log(idStr, player);
}