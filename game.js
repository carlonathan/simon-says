let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let gameStarted = false;
let level = 0;


// Start game on first keypress
$(document).on("keydown", function () {

    if (gameStarted === false) {

        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;

    }

});

// Animate and make sound on click
$(".btn").on("click", function () {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

};

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        var letsgo = new Audio("sounds/letsgo.mp3");
        letsgo.play();
        console.log("success");

        // $("#level-title").addClass("correct");
        // setTimeout(function () {
        //     $("#level-title").removeClass("correct");
        // }, 100);

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();

            }, 1000);

        }

    } else {

        console.log("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("h1").text("Game Over, press any key to restart!");

        startOver();

    }

}

function startOver() {
    gameStarted = false;
    gamePattern = [];
    level = 0;
}