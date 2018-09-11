$(document).ready(function(){
    //this is where timer variables are
    var timerAmount = 40;

    //user score
    var numRight = 0;
    var numWrong = 0;
    var numAnswered = 0;

    //q and a variables
    var answers = [];
    var currentQ = 0;

    //questions
    var questions = [
        q1 = {
            question: "Which friend had won a vanilla ice look-alike contest?",
            correct: 2,
            choice: ["Monica", "Chandler", "Ross", "Joey"]
        }
        q2 = {
            question: "Which friend made candy to gegt to know their neighbors?",
            correct: 1
            choice: ["Monica", "Chandler", "Ross", "Joey"]
        }
        q3 = {
            question: "Which friend kissed Chandler's mom?",
            correct: 3
            choice: ["Monica", "Chandler", "Ross", "Joey"]
        }
        q4 = {
            question: "Which friend teaches Ben about practical jokes?",
            correct: 4
            choice: ["Monica", "Chandler", "Ross", "Rachel"]
        }
        q5 = {
            question: "Who kissed Chandler's mom?",
            correct: 3
            choice: ["Monica", "Chandler", "Ross", "Joey"]
        }
        q6 = {
            question: "Which friend was shot in the butt  by a tranquilizer dart?",
            correct: 3
            choice: ["Monica", "Chandler", "Pheobe", "Joey"]
        }
        q7= {
            question: "Which friend did not go to high school?",
            correct: 4
            choice: ["Monica", "Chandler", "Ross", "Joey"]
        }
        q8 = {
            question: "Which friend got married three times",
            correct: 3
            choice: ["Monica", "Chandler", "Ross", "Joey"]
        }
    ];

    //question function
    var triviaQuestions = function () {
        if (currentQ <=8) {
            $("#questionDiv").html("<h2>" + questions[currentQ].question + "</h2>");
            answers = questions[currentQ].choice;
            show(".answers");
            for (var i=0; i<answers.length; i++) {
                $("answer"+ i).html("<h2>" + answers[i] + "</h2>");
            }
        }
        else {
            endGame();
        }
    };

    //clear what is in answer and go through for loop
    var answerEmpty = function () {
        for(var i=0; i<4; i++) {
            $("#answersDiv" + i).append ("");
        }
        hide (".answer");
    };
    //Timer function 
    var start = function() {
        //start timer
        userTime = setInterval(countDown, 1200);
        //clear timer
        $("#startTimer").empty();
        //hide start button
        hide("#start");
        //question and answers
        triviaQuestions();
        
    };

    //Here we clear contents
    var userContent = function () {
        $("#startTimer").empty();
        $("#questionDiv").empty();
        $("userScore").empty();
        answerEmpty();
    }
    //Here we create timer countdown function
    var timeUp = function () {
        timerAmount --;
        $("#timerContainer").html("<h2> Time Left:" + timeUp + "</h2>");

        if (timeUp == 0) {
            endGame();
        }
    };

    //Here we have to create a function to stop time
    var stop = function (){
        clearInterval(userTime);

    };
     //We are going to reset the function
     var reset = function () {
         stop();
         timerAmount = 40;
         currentQ = 0;
         answers = [];
         userContent ();
         $("#timerContainer").empty();
         trivia ("#startTimer", "Press to Begin!");
         show ("#start");
         hide ("#reset");
     };

     var endGame = function () {
         stop();
         userContent();
//display when game is over
        trivia ("#startTimer", "<h2> Game Donzo!<h2>");
        $("#userScore").append("<h2> Results!</h2>");
        $("#userScore").append("<h2> Total Questions Answered:" + numAnswered + "</h2>");
        $("#userScore").append("<h2> Correct Answers: " + numRight + "</h2>");
        $("#userScore").append("<h2> Incorrect Answers:" + numWrong + "</h2>");
        show ("#reset");
     };

     //we need to create a function that checks the answers
     $(".selected").click(function() {
        var chosen = $(this);
        var val = chosen.attr("val");
        var rightAnswer = trivia[currentQ].correct;

        if (val == rightAnswer) {
            $("#questionDiv").empty();
            answerEmpty();
            $("answersDiv").css("display", "none");
            numAnswered ++;
            numRight ++;
            currentQ ++;
            triviaQuestions();
        }
        else {
            numAnswered ++;
            numWrong ++;
            currentQ ++;
            timerAmount = 40;
            $("#questionDiv").empty();
            answerEmpty();
            triviaQuestions();
        }
     });
    //on click buttons
    $("#start").on("click", start);
    $("#reset").on("click", reset);

})