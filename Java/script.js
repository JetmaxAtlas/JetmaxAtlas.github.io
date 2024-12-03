const cards = document.querySelectorAll('.memory-card');
const gagner = document.getElementById('winDialog')
const dialog = document.getElementById('dialog');
const closeBtn = document.getElementById('close-btn');
const noShowCheckbox = document.getElementById('no-show');
const score = document.getElementById('Score');

const rejouer = document.getElementById('Rejouer');
const continuer = document.getElementById('Continuer');

let CarteDevoiler = 0;
let reussir = 0;

const url = "https://www.youtube.com/watch?v=xvFZjo5PgG0"

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;



rejouer.addEventListener("click", reload)
continuer.addEventListener("click", Suite)

function reload(){
  location.reload();
  gagner.close();
}

function Suite(){
 open('https://www.youtube.com/watch?v=eaDeTV-LLYA');
}


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  CarteDevoiler = CarteDevoiler + 1;

  if(reussir == 5){
    gagner.showModal();
    score.textContent = (CarteDevoiler);
  }



  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  reussir = reussir + 1;

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


window.onload = function() {

  gagner.close();
  
  if (localStorage.getItem('noShowModal') !== 'true') {
    dialog.showModal()
  }
  localStorage.setItem('noShowModal', 'true');

  closeBtn.onclick = function() {
    dialog.close()
    if (noShowCheckbox.checked) {
        localStorage.setItem('noShowModal', 'true');
    }
};
};
