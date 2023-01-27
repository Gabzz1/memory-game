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
const moves = document.getElementById("moves-count1");
const moves2 = document.getElementById("moves-count2");
const moves3 = document.getElementById("moves-count3");
const moves4 = document.getElementById("moves-count4");
const cards = document.querySelectorAll('#cards');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//create a function to flip the cards
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
  movesCounter();
  movesCounter2();
  movesCounter3();
  movesCounter4();
  checkForMatch();
}

//create a function to check if both cards are a match. If not unflip them.
function checkForMatch() {
    
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();


}

//create a funtion to disable the flip function when the cards are a match
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.style.backgroundColor="#FDA214";
  secondCard.style.backgroundColor="#FDA214";

  resetBoard();
}

//create a function that unflips the cards
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.style.backgroundColor ="#152938";
    secondCard.style.backgroundColor = "#152938";

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

//Initialize moves count
let movesCount = 0;
let movesCount2 = 0;
let movesCount3 = 0;
let movesCount4 = 0;

//create moves count function for each player
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `${movesCount}`;
};

const movesCounter2 = () => {
  movesCount2 += 1;
  moves2.innerHTML = `${movesCount2}`;
};

const movesCounter3 = () => {
  movesCount3 += 1;
  moves3.innerHTML = `${movesCount3}`;
};

const movesCounter4 = () => {
  movesCount4 += 1;
  moves4.innerHTML = `${movesCount4}`;
};

//create a function to select current player and read moves
function currentPlayer(){
  if(unflipCards(document.getElementById('player1')) === true) {
    document.getElementById('player1').classList.remove('movesCount');
    document.getElementById('player3').classList.remove('movesCount3');
    document.getElementById('player4').classList.remove('movesCount4');
  } else {
    document.getElementById('player2').classList.remove('movesCount2');
    document.getElementById('player3').classList.remove('movesCount3');
    document.getElementById('player4').classList.remove('movesCount4');
  }
  
}
