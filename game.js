var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (started!=true) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();  
    }
  });

$(".btn").click(function()
{
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel)
{
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) 
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
        } 
        else 
        {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function()
            {
            $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
    
    }

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentcolor)
{
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentcolor).removeClass("pressed");
    },100);
}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}