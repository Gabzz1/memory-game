let screen_width = screen.width;
let MatchedCards = [];
let clickedItem = [];
let score = [0,0,0,0];
let playerIndex = 0;
let moves = 0;
correct_pick = 0;
let seconds = 0
let minutes = 0
let timeCount = seconds < 10 ? `0${seconds}`: seconds
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
  theme_btn = "h1"
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

$(".grid4x4").click(()=>{
    gridSize=4;
    $(".grid4x4").addClass("btn_on");
    $(".grid6x6").removeClass("btn_on");
})

$(".grid6x6").click(()=>{
    gridSize=6;
    $(".grid6x6").addClass("btn_on");
    $(".grid4x4").removeClass("btn_on");
})

//-- click the start button and prepare the game page based on selected buttons(the theme, number of players and grid size)
$(".start_btn").click(()=>{
  if (gridSize===0 || container ===0 || player===0){
      //nothing should happen
  }else{
      game_page();
      gridContainer(gridSize);
      if (container === 1){
          content_num();//for numbers
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

//Generate the grid

function gridContainer(gridSize){
  $(".grid").addClass(`grid${gridSize}`)

  gridGenerator();
}

function gridGenerator(){
  for(let i = 0; i < gridSize**2; i++ ){
    $("<div></div>").addClass(`grid-item${gridSize} ${i}`).appendTo(".grid").click(()=>{
        let item_div = $(`.grid > .${i}`)

        if (item_div.hasClass("clicked") ){
            //pass
        }else{
            $(`div.grid > .${i}`).addClass("right clicked")
        let item = $(`div.grid > .${i} > ${theme_btn}`)
        item.show()
        chosen_item(item)
        check_ans(item)
        console.log(correct_pick,chosen_item)
        // click_move()
        }
    });
  }
}

function icon_val (input){
  let cl_string = input.attr("class");
  let class_list = cl_string.split(" ");
  return (class_list[1]);
}

function chosen_item(item_div){
  if (clickedItem.length < 2 ){
    clickedItem.push(item_div)
  }else{
    clickedItem.length = 0;
    clickedItem.push(item_div)
  }
  
}

function check_item(status){
  if (status === 'good'){
    clickedItem[0].parent().addClass('right')
    clickedItem[1].parent().addClass('right')
  }
  if (status === 'bad'){
    clickedItem[0].hide()
    clickedItem[1].hide()
    clickedItem[0].parent().removeClass('wrong')
    clickedItem[1].parent().removeClass('wrong')
  }

}

function game_over(){
  if (correct_pick === gridSize**2 ){
    $(".results-dark").show()
    result_scores(score)
    clearInterval(playerTime)
  }
}


// comparing if the two clicked items are match using their class names

function isMatch(value){
  if (value[0] === value[1]){
      correct_pick +=2
      setTimeout(()=>{
        check_item('good')},1000)
      // set new score
      score[playerIndex]++;
      $(`.b${playerIndex} > .h4_score`).text(`${score[playerIndex]*5}`)
  }else{
    clickedItem[0].parent().removeClass('right clicked').addClass('wrong')
    clickedItem[1].parent().removeClass('right clicked').addClass('wrong')
    setTimeout(()=>{
      check_item('bad')},1000)
  }
  
}

function check_ans(item){
  if (MatchedCards.length <2){
      MatchedCards.push(icon_val(item))
      if (MatchedCards.length === 2){
          isMatch(MatchedCards)
          //if current player got matched cards, the player plays on, else, move to the next player
          if(player === 1){
              
          }else{
              setCurrentPlayer()
          }
          MatchedCards.length = 0;
          click_move()

      }
  }

}

function setCurrentPlayer(){
  if (playerIndex < player-1){
    playerIndex++
  }else{
    playerIndex = 0;
  }
  $(`.player_board`).removeClass("current_player")
  $(`.b${playerIndex}`).addClass("current_player")
}

// Filling in the grid with numbers or icons based on option selected


function num_func(num){
  let numArray = []
  let i = 0;
  while(numArray.length < num**2) {
      numArray.push(i,i);
      i++;
  }
  numArray.sort(()=> 0.5-Math.random())
  return numArray;
}

// for icons
let icons = [
  '<i class="fa-solid fa-futbol"></i>',
  '<i class="fa-solid fa-anchor"></i>',
  '<i class="fa-solid fa-flask"></i>',
  '<i class="fa-solid fa-sun"></i>',
  '<i class="fa-solid fa-hand-spock"></i>',
  '<i class="fa-solid fa-bug"></i>',
  '<i class="fa-solid fa-moon"></i>',
  '<i class="fa-solid fa-snowflake"></i>',
  '<i class="fa-solid fa-turkish-lira-sign"></i>',
  '<i class="fa-solid fa-car"></i>',
  '<i class="fa-solid fa-cat"></i>',
  '<i class="fa-solid fa-heart"></i>',
  '<i class="fa-solid fa-paw"></i>',
  '<i class="fa-solid fa-sack-dollar"></i>',
  '<i class="fa-solid fa-frog"></i>',
  '<i class="fa-solid fa-ghost"></i>',
  '<i class="fa-solid fa-mosquito"></i>',
  '<i class="fa-solid fa-poo"></i>',
  '<i class="fa-solid fa-plane"></i>',
]

function content_num(){

  let list = num_func(gridSize)
  for(let i = 0; i < gridSize**2; i++ ){
     let num = list[i]
      $(`<h1>${num}</h1>`).addClass(`card${gridSize} num_${num}`).appendTo($(`div.grid > .${i}`))
  }
  $(".no_click").show()
  setTimeout(()=>{

      for(let i = 0; i < gridSize**2; i++ ){
          $(`div.grid > .${i} > h1`).hide()
      }
      $(".no_click").hide()
  }, 1500)
}

function content_icon(){

  let list = num_func(gridSize)
  for(let i = 0; i < gridSize**2; i++ ){
     let num = list[i]
      $(icons[num]).addClass(`icon${gridSize}`).appendTo($(`div.grid > .${i}`))
  }
  $(".no_click").show()
  setTimeout(()=>{
      for(let i = 0; i < gridSize**2; i++ ){
          $(`div.grid > .${i} > i`).hide()
      }
      $(".no_click").hide()
  }, 1500)

}

$(".btn_new").click(()=>{
  document.location.reload()
});

$(".results_new_game").click(()=>{
  document.location.reload()
});

$(".btn_restart").click(()=>{
  clear_grid()
  clearInterval(playerTime)
  minutes = 0
  seconds = 0
  start_time()
});

$(".results_restart").click(()=>{
  clear_grid()
  minutes = 0
  seconds = 0
  $(".results-dark").hide()
  $(".player-list > ").remove()
  $(".pause").hide()
  start_time()
});

$(".resume").click(()=> {
  $(".pause").hide()
  start_time()
});

$("#menu").click(()=>{
  pause()
  clearInterval(playerTime)
});

function player_score_board(){
  $(".player-container").show()
    if (player > 1){
      for (let i=0; i < player; i++ ){
        $("<div>").addClass(`player_board b${i}`).appendTo($(".player-container"))

        if (screen_width < 426){
          $("<h3>").addClass("h3_title ").text(`P${i+1}`).appendTo($(`.b${i}`));
        }else{
          $("<h3>").addClass("h3_title").text(`Player ${i+1}`).appendTo($(`.b${i}`))
        }
        $("<h4>").addClass("h4_score").text(`${0}`).appendTo($(`.b${i}`))
        //initial current player
        $(`.b${playerIndex}`).addClass("current_player")
        console.log(screen_width)
      }
    }else{
      for (let i=0; i < 2; i++ ){
        $("<div>").addClass(`player_board b${i}`).appendTo($(".player-container"))
      }
      $("<h3>").addClass("h3_title").text(`Time`).appendTo($(`.b0`))
      $("<h4>").addClass("h4_p1 time").text(`0:00`).appendTo($(`.b0`))

      $("<h3>").addClass("h3_title").text(`Moves`).appendTo($(`.b1`))
      $("<h4>").addClass("h4_p1 moves").text(`${moves}`).appendTo($(`.b1`))

    }
      // score board container size
      let container_size = $(".player_board").length
      if (container_size === 2 && player < 2){
          $(".player-container").removeClass("large-container").addClass("small_cont2")
          $(".player_board").addClass("player_board_2");
      }else if (container_size === 2) {
          $(".player-container").removeClass("large-container").addClass("small_cont")
      }else if (container_size === 3) {
          $(".player-container").removeClass("large-container").addClass("mid_cont")
      }
}

let playerTime = setInterval(()=>{
  time()
},1000)
clearInterval(playerTime)

function start_time(){
playerTime = setInterval(()=>{
  time()
},1000)
}

function time(){
  seconds++;
  if (seconds === 60) {
    minutes++
    seconds=0
  }
  timeCount = seconds < 10 ? `0${seconds}`: seconds
  $(".time").text(`${minutes}:${timeCount}`);
}

function click_move(){
  ++moves
  $(".moves").text(`${moves}`)
  game_over()
}

function clear_grid(){
  MatchedCards.length = 0;
  clickedItem.length =0;
  playerIndex = 0;
  moves = 0;
  correct_pick=0;
  // clear score
  for (let i = 0; i < score.length; i++){
    score[i]=0;
  }
  $(`.grid-item${gridSize} > `).remove();
  $(`.grid-item${gridSize}`).removeClass("right wrong");
  $(".player-container > div").remove();
  $(".grid > div").remove();
  // remove number or icon items in grid
  //Generate new set of number or icon items
  gridGenerator()
  if(container === 1){
    content_num();
  }else if(container === 2){
    content_icon();
  }
  player_score_board();
}

function who_won(arr){

  if (player === 1 ){
    $(".heading").text(`You did it!`)
    $(".sub-heading").text(`Game over! Here's how you got on...`)
    return
  }
  count = 1
  for (let i = 1; i < arr.length; i++ ){
    if (arr[0].score === arr[i].score){
        $(".heading").text(`It's a tie!`)
        count++
        make_dark(count)
    }
  }
  if(arr[0].score != arr[1].score) {
      $(".heading").text(`Player ${arr[0].player} Wins!`)
      make_dark(1)
  }
}
//paint top players score dark
function make_dark(num){
  for(let i =0; i < num; i++){
    $(`.r${i}`).addClass("top_player")
    $(`.r${i} > `).addClass("top_ply_cnt")
  }
}

//Creating objects(players:scores) and arranging in desc.. order
function player_score_list(arr){
  let temp =[]
  for(let i =0; i < player; i++){
    temp.push({player : i+1, score: arr[i]})
  }
  let new_list = temp.sort((x,y)=>{return(y.score-x.score)})
  return new_list
}

//-------------------------------------  lunch Game over score
function result_scores(arr){
  let list = player_score_list(arr)
  if (player === 1){
    $("<div>").addClass(`player_results r${1}`).appendTo($(".player-list"))
    $("<div>").addClass(`player_results r${2}`).appendTo($(".player-list"))

    $("<p>").addClass("player-container player_results_p").text(`Time Elapsed`).appendTo($(`.r${1}`))
    $("<h2>").addClass("p_cnt player_results_h2").text(`${minutes}:${timeCount}`).appendTo($(`.r${1}`))

    $("<p>").addClass("player-container player_results_p").text(`Moves Taken`).appendTo($(`.r${2}`))
    $("<h2>").addClass("p_cnt player_results_h2").text(`${moves} Moves`).appendTo($(`.r${2}`))
    who_won(list)
    return
  }
  for (let i=0; i < list.length; i++){
    let player_num = list[i].player
    let score = list[i].score
    $("<div>").addClass(`player_results r${i}`).appendTo($(".player-list"))
    $("<p>").addClass("p_cnt player_results_p").text(`Player ${player_num}`).appendTo($(`.r${i}`))
    $("<h2>").addClass("p_cnt player_results_h2").text(`${score} pairs`).appendTo($(`.r${i}`))
  }

  who_won(list)

}

function pause(){
  $(".pause").show()
}