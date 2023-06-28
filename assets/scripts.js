// Quiz Questions in an Array
var questions = [
    {
        questionText: "Which of the following is NOT a Primitive/Value Type?",
        options: ["1. Strings", "2. Boolean", "3. Response", "4.None of the Above"],
        answer: "3. Response",
    },

    {
        questionText: "Which of the following is used to define a variable in JavaScripts?",
        options: ["1. getElementById","2. var","3. getElementByClassName","4. None of the Above"],
        answer: "2. var",
    },

    {
        questionText: "An If/Else statement is enclosed within?",
        options: ["1. Quotation Marks", "2. Parenthesis", "3. Curly Brackets", "4. None of the Above"],
        answer: "2. parenthesis"
    },

    {
        questionText: "Arrays in JavaScripts can be used to store?",
        options: ["1. Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above"],
        answer: "4.All of the Above"
    },

    {
        questionText: "Which of the following methods is used to access HTML elements using JavaScript?",
        options: ["1. getElementById", "2. getElementBy ClassName", "3. Both A and B", "4. None of the Above"],
        answer: "3. Both A and B"
    },

    {
        questionText: "JavaScript is an ____ language?",
        options: ["1. Object-Oriented", "2.Array", "3. Object-Based", "4.None of the Above"],
        answer: "1. Object-Oriented"
    }
]

// Assign variables to cards/id

var startCard = document.querySelector("#start-card");
var quizCard = document.querySelector("#quiz-card");
var scoreCard = document.querySelector("#score-card")

// Cards that are hidden
function hideCards(){
    startCard.setAttribute("hidden", true);
    quizCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
}

var intervalID;
var time;
var currentQuestion;

// show question card
function startQuiz(){
    hideCards();
    quizCard.removeAttribute("hidden");
    currentQuestion = 0;
    displayQuestion();
    time = questions.length * 10;
    intervalID = setInterval(countdown, 1000);
    displayTime();
}

startCard.addEventListener("click", startQuiz); 

// set timer function
var seconds=35
var timer;
function setTimer() 
    if(seconds < 35) {
        document.getElementById("timer").innerHTML = seconds
    }
    if (seconds > 0 ) {
        seconds--;
    } else {
        clearInterval(timer)
        alert("Time Ended")
  
    }
    
    

// End quiz when time runs out
function countdown(){
    time--;
    displayTime();
    if (time < 1){
        endQuiz();
    }
}

var timeDisplay = document.querySelector("#time");
function displayTime(){
    timeDisplay.textContent = time;
}

function displayQuestion(){
    var question = questions[currentQuestion];
    var options = question.options;
}

for (var i = 0; i < options.length; i++){
    var option = options[i];
    var optionButton = document.querySelector("#option + 1");
    optionButton.textContent = option;
  }

document.querySelector("#question-Option").addEventListener("click", checkAnswer);

function optionIsCorrect(optionButton){
    return optionButton.textContent === questions[currentQuestion].answer;
}

function checkAnswer(eventObject) {
    var optionButton = eventObject.target;
    resultDiv.style.display = "block";
    if (optionIsCorrect(optionButton)){
        resultText.textContent = "Correct!";
        setTimeout(hideResultText, 1000);
    } else {
        resultText.textContent = "Incorrect!";
        setTimeout(hideResultText, 1000);
        if (time >= 10) {
            time = time - 10;
            displayTime;
        } else {
            time = 0;
            displayTime();
            endQuiz();
        }  
    }
}

currentQuestion++;
if (currentQuestion < questions.length) {
    displayQuestion()
} else {
    endQuiz();
}

// clear timer at end of quiz
function endQuiz() {
    clearInterval(intervalID);
    hideCards();
    scoreCard.removeAttribute("hidden");
    scoreCard.textContent = time;
}

var submitButton = document.querySelector("#submit-button");
var inputElement = document.querySelector("#initials");

submitButton.addEventListener("click", storeScore);

function storeScore(event) {
    event.preventDefault();
    if (!inputElement.value) {
        alert ("Please enter your initials!");
    }
}

// store initials in view highscores
var leaderboardItem = {
    initials: inputElement.value,
    score: time,
};

updateStoredLeaderboard(leaderboardItem);

hideCards();
leaderboardCard.removeAttribute("hidden");

renderLeaderboard();

function updateStoredLeaderboard(leaderboardItem) {
    let leaderboardArray = getLeaderboard();
    leaderboardArray.push(leaderboardItem);
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
}

var clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearHighscores);

function clearHighscores() {
    localStorage.clear();
    leaderboardCard.removeAttribute("hidden");
}

var backButton = document.querySelector("#back-button");
backButton.addEventListener("click", returnToStart);

function returnToStart() {
    hideCards();
    startCard.removeAttribute("hidden");
}

clearInterval(intervalID);

time = undefined;
displayTime();

