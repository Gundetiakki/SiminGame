
var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var toggle = false;

$(document).keypress(function(){
  if (!toggle) {
    $("#level-title").text("Level " + level);
    nextSequence();
    toggle = true;
  }
})

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("div#"+randomChosenColor).fadeOut(50).fadeIn(50);

  playSound(randomChosenColor);

}


function playSound(name){
  var colorSound = new Audio("sounds/"+name+".mp3");
  colorSound.play();
}



$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");},100);

}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence()
      },1000);
    }
  }else{
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  toggle = true;
}
