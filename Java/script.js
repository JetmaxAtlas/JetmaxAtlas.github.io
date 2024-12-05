const cards = document.querySelectorAll('.memory-card');

const gagner = document.getElementById('winDialog')
const score = document.getElementById('Score');
const rejouer = document.getElementById('Rejouer');
const tutoriel = document.getElementById('Tutoriel');

const dialog = document.getElementById('dialog');
const closeBtn = document.getElementById('close-btn');
const noShowButton = document.getElementById('no-show');




let carteDevoiler = 0;
let reussir = 0;


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;



rejouer.addEventListener("click", reload)
tutoriel.addEventListener("click", Tuto)
/**
 * Si le bouton est clicker relancer la page.
 */
function reload(){
  location.reload();
  gagner.close();
}
/**
 * Ouvre la page du tutoriel du jeux de carte 
 */
function Tuto(){
 open('https://medium.com/free-code-camp/vanilla-javascript-tutorial-build-a-memory-game-in-30-minutes-e542c4447eae');
}


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // premier click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // deuxième click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  carteDevoiler = carteDevoiler + 1;

  if(reussir == 5){
    gagner.showModal();
    score.textContent = (carteDevoiler);
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

/**
 * Quand la page va se charger mettre le dialogue de victoire à fermer
 * et vérifier si il faut afficher le dialogue de présentation.
 */
window.onload = function() {

  gagner.close();
  
  if (localStorage.getItem('noShowModal') !== 'true') {
    dialog.showModal()
  };
  
  closeBtn.onclick = function() {
    dialog.close()
  };

noShowButton.onclick = function(){
  localStorage.setItem('noShowModal', 'true');
  dialog.close()
};

};
