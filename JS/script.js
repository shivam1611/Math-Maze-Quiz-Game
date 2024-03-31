var playing = false;
var score;
var time;
var answer;
var answerBox;
var wrongAnswer;

document.getElementById("reset-start").onclick =

    function () {
        if (playing == true) {
            location.reload();
        }
        else {
            playing = true;
            document.getElementById('reset-start').innerHTML = "Reset";
            score = 0;
            time = 60;
            document.getElementById('score').innerHTML = score
            document.getElementById('time').innerHTML = time
            hide("game-over")
            show("timer")
            startCountdown()
            generateQuestionAnswer();
        }
    }

    // CODE FOR ANSWER BOXES    
    
    for( i = 1;i<5;i++){
        
        document.getElementById('box-' + i).onclick=function(){
                if (playing == true) {
                    if (this.innerHTML == answer) {
                        score+=1;
                        document.getElementById('score').innerHTML = score;
                        hide("try-again");
                        show("correct");
                        setTimeout(
                            function () { 
                                hide("correct") ;
                            }, 1000);
                        generateQuestionAnswer();
                    }
                    else  {
                        hide("correct");
                        show("try-again");
                        setTimeout(function () 
                        { 
                            hide("try-again");
                     }, 1000);
                    }
                }
        
            }
        }
    
    // FOR HIDING AND SHOWING THE ELEMENTS   
    
    function hide(id) {
    document.getElementById(id).style.display = "none";
}
function show(id) {
    document.getElementById(id).style.display = "block";
}

// COUNTDOWN FUNCTION  


function startCountdown() {
    action = setInterval(function () {
        time -= 1;
        document.getElementById('time').innerHTML = time;
        if (time == 0) {
            stopcounter();
            hide("timer")
            show("game-over");
            hide("try-again")
            document.getElementById('game-over').innerHTML = "<p> GAME OVER ! <p> YOUR SCORE IS: " + score + " </P>";
            document.getElementById('reset-start').innerHTML = "Start";
            playing = false;
        }
    }, 1000);
}

// TO STOP COUNTER 

function stopcounter() {
    clearInterval(action);
}


// FUNCTION TO GENERATE A RANDOM QUESTION 

function generateQuestionAnswer() {
    var num1 = 1 + Math.round((Math.random() * 9))
    var num2 = 1 + Math.round((Math.random() * 9))
    answer = num1 * num2;
    document.getElementById('screen').innerHTML = num1 + " x " + num2;
    
    // GENERATING ASNWER INSIDE RANDOM BOX
    
    answerBox = 1 + Math.round((Math.random() * 3));
    document.getElementById('box-' + answerBox).innerHTML = answer;
    
    // FILLING OTHER BOXES WITH WRONG ASNWERS 

    var ansArray = [answer];
    
    for (i = 1; i < 5; i++) {
        if (i !== answerBox) {
            do {
                wrongAnswer =
                (1 + Math.round((Math.random() * 9))) * (1 + Math.round((Math.random() * 9)))
            } while (ansArray.indexOf(wrongAnswer) > -1)
            document.getElementById('box-' + i).innerHTML = wrongAnswer;
            ansArray.push(wrongAnswer);
        }
    }
}


