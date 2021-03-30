var buttonColours= ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];


var started=false;
var level=0;

$(document).keydown(function()
{
    if(!started)
    {$("#level-title").text("level " +level);
    nextSequence();
    started=true;
    }
});




$(".btn").click(function() 
{
    
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour); 
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel1)
{
    if(gamePattern[currentLevel1] === userClickedPattern[currentLevel1]) {       
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game over, Press Any Key To Restart");
            
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200);
        
            startOver();
        }

    }
function  nextSequence() 
 {   userClickedPattern =[];
 level ++;
 $("#level-title").text("Level "+level);
 var randomNumber = Math.floor(Math.random()*4);
 var randomChosenColour = buttonColours[randomNumber];
 gamePattern.push(randomChosenColour);
                        
 $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColour);
 }


function animatePress(currentColor){
 $("#"+currentColor).addClass("pressed");
                     
 setTimeout(function(){
 $("#"+currentColor).removeClass("pressed");
 },100);
 }

function playSound(name){                
    var audio2= new Audio("sounds/"+name+".mp3");
    audio2.play();
}    

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}