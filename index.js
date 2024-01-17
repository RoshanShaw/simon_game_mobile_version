var buttonColours=["red","green","blue","yellow"];
var gameSequence=[];
var userSequence=[];

var start=false;
var level=0;
$("body").click(function()
{
    if(!start)
    {
        $("#level-title").text("level "+level);
        nextSequence();
        start=true;
    }
})
function nextSequence()
{
    userSequence=[];
    $("#level-title").text("level "+level)
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gameSequence.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
}
$(".btn").click(function()
{
    var userChosenColour=$(this).attr("id");
    userSequence.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userSequence.length-1);
})
function checkAnswer(currentLevel)
{
    if(userSequence[currentLevel]===gameSequence[currentLevel])
    {
        if(userSequence.length===gameSequence.length)
        {
            setTimeout(function()
            {
                 nextSequence();
            },1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("gameover");
        $("#level-title").text("Game Over, please click any button to restart");
        setTimeout(function()
        {
            $("body").removeClass("gameover");
        },1000);
        startOver();
    }

}
function playSound(colour)
{
    var audio=new Audio("sounds/"+colour+".mp3");
    audio.play();
}
function animatePress(currentColor)
 {
     $("currentColor").addClass("pressed");
     setTimeout(function()
     {
        $("currentColor").removeClass("pressed");
     })
 }
 function startOver()
 {
    level=0;
    
    gameSequence=[];
    start=false;
 }