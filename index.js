var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        // console.log("correct userColor:"+userClickedPattern[currentLevel]+"gameColor:"+gamePattern[currentLevel]);  
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    }else {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        var sound = new Audio("./sounds/wrong.mp3");
        sound.play();
        // console.log("wrong userColor:"+userClickedPattern[currentLevel]+"gameColor:"+gamePattern[currentLevel]);
        $("#level-title").text("Game Over,Press any Key to Restart game!");
        gamePattern = [];
        userClickedPattern=[];
        level = 0;
    }
}

var level = 0;
$("body").keydown(function(){
    if(level === 0){
        $("#level-title").text("level " + level);
        nextSequence();
    }
});

$(".btn").click(function(){
    var chosenColour = $(this).attr("id");
    userClickedPattern.push(chosenColour);
    playSound(chosenColour);
    animatePress(chosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var sound = new Audio("./sounds/"+randomChosenColour+".mp3");
    sound.play();
    
}

function animatePress(currentcolour){
    $("."+currentcolour).addClass("pressed");
    setTimeout(function() {
        $("."+currentcolour).removeClass("pressed"); 
     }, 100);
}

function playSound(name){
    var sound = new Audio("./sounds/"+name+".mp3");
    sound.play(); 
}
