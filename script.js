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
const movesSolo = document.getElementById("moves-count-solo");
const timeValue = document.getElementById("time-count");
const cards = document.querySelectorAll('#cards');
const cards4x4 = document.querySelectorAll('#cards4x4');
const wrapper4 = document.getElementById('wrapper4x4');
const modal = document.getElementById("whole-page-result");
const controls = document.getElementById("controls-container");
const movesResult = document.getElementById("finished-moves");
const timeResult = document.getElementById("finished-time");
const setupNewGame = document.querySelector(".result-new-game");
const restart = document.querySelector(".result-restart");


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
  checkForMatch();
}

//create a function to check if both cards are a match. If not unflip them.
function checkForMatch() {
    
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if (isMatch) {
    disableCards();
    winCount += 1;
    if (winCount === 8){
      movesResult.innerHTML = `${movesCount}`;
      stopGame();
    }
  } else {
    unflipCards();
  }

  //isMatch ? disableCards() : unflipCards();


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
//6x6 shuffle function
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

//4x4 shuffle function
(function shuffle() {
  cards4x4.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
cards4x4.forEach(card => card.addEventListener('click', flipCard));


//Initialize moves count
let movesCount = 0;
let movesCount2 = 0;
let movesCount3 = 0;
let movesCount4 = 0;
let movesCountSolo = 0;
let winCount = 0;

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

const movesCounterSolo = () => {
  movesCountSolo += 1;
  movesSolo.innerHTML = `${movesCountSolo}`;
};

//create a function to select current player and read moves


//set time
let seconds = 0,
  minutes = 0;

const timeGenerator = () => {
    seconds += 1;
    //set the minutes
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    //set the format of the time before displaying
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `${minutes}` : minutes;
    timeValue.innerHTML = `${minutesValue}:${secondsValue}`;
    timeResult.innerHTML = `${minutesValue}:${secondsValue}`;
  };

  interval = setInterval(timeGenerator, 1000);


  const stopGame = () => {
    modal.classList.remove('hide');
    //controls.classList.add('hide');
    clearInterval(interval);
  }


  restart.addEventListener('click',
  (restartSameGame = () => {
    modal.classList.add('hide');
    
  })
  );
