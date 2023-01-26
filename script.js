/*const controls = document.querySelector(".setupStart-container");
const stopButton = document.getElementById("controls-container");
const startButton = document.getElementById("start");
const body = document.querySelector("body");



//Start game
startButton.addEventListener("click", () => {
    /*movesCount = 0;
    seconds = 0;
    minutes = 0;
    //controls amd buttons visibility
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    body.classList.add("hide");
        //Start timer
    //interval = setInterval(timeGenerator, 1000);
    //initial moves
    //moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    //initializer();
  });
  */

const cards = document.querySelectorAll('#cards');
const cardId = 
[document.querySelector('.fa-solid fa-1'),
document.querySelector('.fa-solid fa-2'),
document.querySelector('.fa-solid fa-3'),
document.querySelector('.fa-solid fa-4'),
document.querySelector('.fa-solid fa-5'),
document.querySelector('.fa-solid fa-6'),
document.querySelector('.fa-solid fa-7'),
document.querySelector('.fa-solid fa-8'),
document.querySelector('.fa-solid fa-9')]
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    firstCard.style.backgroundColor = "#BCCED9";

    return;
  }

  secondCard = this;
  secondCard.style.backgroundColor = "#BCCED9";
  checkForMatch();
}

function checkForMatch() {
    for (let i = 0; i<cardId.length; i++){
  let isMatch = firstCard.cardId[i] === secondCard.cardId[i];

    }
  isMatch ? disableCards() : unflipCards();
  console.log(firstCard.cardId[i]);
  console.log(secondCard.cardId[i]);
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
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