$(document).ready(function () {

    //the trivia and start button fades in
    $("#trivia, #start, #play-again").hide();
    $("#trivia, #start").fadeIn(2000);

    //trivia questions
    var choices = [{
        question: "What are the official winter and summer sports of Canada?",
        answers: ["Skiing and Basketball", "Hockey and Lacrosse", "Snowboarding and Golf", "Curling and Soccer"],
        correct: 1,
    },
    {
        question: "Which fictional city is the home of Batman?",
        answers: ["Irvine", "Los Angeles", "Gotham City", "Chicago"],
        correct: 2,
    },
    {
        question: "What is the sum of 25+32?",
        answers: ["76", "53", "65", "57"],
        correct: 3,
    },
    {
        question: "What type of car does Elon Musk drive?",
        answers: ["Ferrari", "Toyota", "Tesla", "Jeep"],
        correct: 2,
    },
    {
        question: "How many days are in a year?",
        answers: ["5", "232", "143", "365"],
        correct: 3,
    },
    {
        question: "In which city is the basketball team Lakers located at?",
        answers: ["New York", "Los Angeles", "Houston", "Miami"],
        correct: 1,
    },
    {
        question: "Babe Ruth is associated with which sport?",
        answers: ["Soccer", "Hockey", "Basketball", "Baseball"],
        correct: 3,
    }]

    var timeLeft = 10;
    var isRunning = false;
    var questC = choices.length;
    var choose, index, intId;
    var rightAns = 0;
    var wrongAns = 0;
    var playerChoice = "";

    //when the start button is clicked displays time, question, and choices
    $("#start").on("click", function () {
        $("#start").hide();
        timeD();
        showQuestion();
        timeRun();
    })

    //run the time
    function timeRun() {
        if (!isRunning) {
            intId = setInterval(timeD, 1000);
            isRunning = true;
        }
    }
    
    //display timer and when time runs out display correct answer
    function timeD() {
        $("#timer").html("<h3>You have: " + timeLeft + " secounds to answer!</h3>");
        timeLeft--;

        if (timeLeft === -1) {
            wrongAns++;
            stopTime();
            $("#answers").html("<h5>TIME IS UP! Correct answer is: " + choose.answers[choose.correct] + "</h5>");
            clearResults();
        }
    }

    //stop the time function
    function stopTime() {
        isRunning = false;
        clearInterval(intId);
    }

    //display random question and create div, add class
    function showQuestion() {
        index = Math.floor(Math.random() * choices.length);
        choose = choices[index];

        $("#questions").html("<h2>" + choose.question + "</h2>");
        for (var i = 0; i < choose.answers.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("playerc");
            userChoice.html(choose.answers[i]);
            userChoice.attr("thevalue", i);
            $("#answers").append(userChoice);
        }

        //when the player clicks the answer
        $(".playerc").on("click", function () {
            playerChoice = parseInt($(this).attr("thevalue"));

            if (playerChoice === choose.correct) {
                stopTime();
                rightAns++;
                playerChoice = "";
                $("#answers").html("<h5>Correct!</h5>");
                clearResults();
            }
            else {
                stopTime();
                wrongAns++;
                playerChoice = "";
                $("#answers").html("<h5>WRONG! Answer is: " + choose.answers[choose.correct] + "</h5>");
                clearResults();
            }
        })
    }

    //clear results and show the player scores
    function clearResults() {
        var timeO = setTimeout(function () {
            $("#answers").empty();
            if ((wrongAns + rightAns) === questC) {
                $("#questions").empty();
                $("#questions").html("<h4>RESULTS:</h4>");
                $("#answers").append("<h5>RIGHT: " + rightAns + "</h5>");
                $("#answers").append("<h5>WRONG: " + wrongAns + "</h5>");
                $("#timer").hide();
                $("#play-again").show();
                rightAns = 0;
                wrongAns = 0;
            }
            else {
                timeRun();
                showQuestion();
            }
            timeLeft = 10;
        }, 2500);
    }

    //when the play again button is clicked reset the game
    $("#play-again").on("click", function () {
        $("#play-again").hide();
        $("#timer").show();
        $("#answers").empty();
        $("#questions").empty();
        timeRun();
        showQuestion();
    })

})