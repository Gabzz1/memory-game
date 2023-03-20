$(".button-hide").hide()
$(".player-container").hide()
$(".results-dark").hide()
$(".pause").hide()
$(".no_click").hide()
//selecting buttons to open specific page in the main menu
//---for the theme

let container = 0;
let theme_btn;

$(".btn_num").click(() => {
  container = 1
  theme_btn = "first"
  $(".btn_num").addClass("btn_on");
  $(".btn_icon").removeClass("btn_on");
})

$(".btn_icon").click(() => {
  container = 2
  theme_btn = "i"
  $(".btn_icon").addClass("btn_on");
  $(".btn_num").removeClass("btn_on");
})

//--for the number of players
let player = 0
for (let i = 1; i <= 4; i++){
  $(`.player_${i}`).click(()=>{
    player = i
    $(".small_btn").removeClass("btn_on")
    $(`.player_${i}`).addClass("btn_on")
  })
}

//--for the grid size
let gridSize = 0;

$(".grid4").click(()=>{
    gridSize=4;
    $(".grid4").addClass("btn_on");
    $(".grid6").removeClass("btn_on");
})

$(".grid6").click(()=>{
    gridSize=6;
    $(".grid6").addClass("btn_on");
    $(".grid4").removeClass("btn_on");
})

//-- click the start button and prepare the game page based on selected buttons(the theme, number of players and grid size)
$(".start_btn").click(()=>{
  if (gridSize===0 || container ===0 || player===0){
      //nothing should happen so it should pass to the next condition
  }else{
      game_page();
      main_grid(gridSize);
      if (container === 1){
          content_num();//for the fontawesome numbers
      }else{
          content_icon();//for the fontawesome icons
      }
      player_score_board()
      start_time()
    } 
})

function main_menu (){
  $(".button-hide").hide()
  $(".player-container").hide()
  $(".logo_div").show()
  $("body").addClass("bg-color")
  $(".grid").removeClass(`grid${gridSize}`)
  $(".setupStart-container").show()
}
main_menu();

function game_page (){
  $(".setupStart-container").hide()
  $(".logo_div").hide()
  $(".button-hide").show()
  $(".player-container").show()
  $("body").removeClass("bg-color")
}



/*
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
const movesResult6x6 = document.getElementById("finished-moves-6x6");
const timeResult = document.getElementById("finished-time");
const setupNewGame = document.querySelector(".result-new-game");
const restart = document.querySelector(".result-restart");
const numbers = document.querySelector(".button-numbers");
const icons = document.getElementById("button-icons");
const one = document.querySelector(".button-one");
const two = document.querySelector(".button-two");
const three = document.querySelector(".button-three");
const four = document.querySelector(".button-four");
const grid4 = document.querySelector(".button-grid4");
const grid6 = document.querySelector(".button-grid6");


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
    if (winCount === 18){
      movesResult6x6.innerHTML = `${movesCount}`;
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


 function buttonColor() {
  icons.style.backgroundColor = "#304859";
  numbers.style.backgroundColor = "#BCCED9";
  numbers.classList.remove('active');
 }
 function buttonColor2() {
  icons.style.backgroundColor = "#BCCED9";
  numbers.style.backgroundColor = "#304859";
  icons.classList.remove('active');
 }

 function buttonOne() {
  one.style.backgroundColor = "#304859";
  two.style.backgroundColor = "#BCCED9";
  three.style.backgroundColor = "#BCCED9";
  four.style.backgroundColor = "#BCCED9";
  one.classList.add('active');
 }
 function buttonTwo() {
  two.style.backgroundColor = "#304859";
  one.style.backgroundColor = "#BCCED9";
  three.style.backgroundColor = "#BCCED9";
  four.style.backgroundColor = "#BCCED9";
  two.classList.add('active');
 }
 function buttonThree() {
  three.style.backgroundColor = "#304859";
  two.style.backgroundColor = "#BCCED9";
  one.style.backgroundColor = "#BCCED9";
  four.style.backgroundColor = "#BCCED9";
  three.classList.add('active');
 }
 function buttonFour() {
  four.style.backgroundColor = "#304859";
  two.style.backgroundColor = "#BCCED9";
  three.style.backgroundColor = "#BCCED9";
  one.style.backgroundColor = "#BCCED9";
  four.classList.add('active');
 }
 
 function buttonGrid4() {
  grid4.style.backgroundColor = "#304859";
  grid6.style.backgroundColor = "#BCCED9";
  grid4.classList.add('active');
 }
 function buttonGrid6() {
  grid4.style.backgroundColor = "#BCCED9";
  grid6.style.backgroundColor = "#304859";
  grid6.classList.add('active');
 }  




function GoToRequiredPage() {
    window.location.href = '4x4sologridIcons.html';
    /*if(numbers && three && grid6) {
      window.location.href = '6x6multiplayergrid.html';
    }
    else if(icons && one && grid4) {
        window.location.href = '4x4sologridIcons.html';
      }
  }
*/