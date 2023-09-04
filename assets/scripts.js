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
var questionCard = document.querySelector("#question-card");
var scoreCard = document.querySelector("#score-card")
var leaderboardCard = document.querySelector("#leaderboard-card");

// Cards that are hidden
function hideCards(){
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
}

const resultDiv = document.querySelector("#result-div");
const resultText = document.querySelector("#result-text");

// hide result div
function hideResultText(){
    resultDiv.style.display = "none";
}

// variables req globally
var intervalID;
var time;
var currentQuestion;

document.querySelector("#start-button").addEventListener("click", startQuiz);

// start quiz
function startQuiz(){
    hideCards();
    questionCard.removeAttribute("hidden");
    currentQuestion = 0;
    displayQuestion();
    time = questions.length * 10;
    intervalID = setInterval(countdown, 1000);
    displayTime();
}

// reduce time by 1 and display new value
function countdown(){
    time--;
    displayTime();
    if (time < 1){
        endQuiz();
    }
}

//display time on page
var timeDisplay = document.querySelector("#time");
function displayTime(){
    timeDisplay.textContent = time;
}

// display question and options
function displayQuestion(){
    var question = questions[currentQuestion];
    var options = question.options;

    var questionText = document.querySelector("#question-text");
    questionText.textContent = question.questionText;

    for (var i = 0; i < options.length; i++){
        var option = options[i];
        var optionButton = document.querySelector("#option" + (i + 1));
        optionButton.textContent = option;
    }
}

// check if option is correct
document.querySelector("#quiz-options").addEventListener("click", checkAnswer);

function optionIsCorrect(optionButton){
    return optionButton.textContent === questions[currentQuestion].answer;
}

// if answer is incorrect, reduce time by 10 seconds
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

// increase current question by 1
currentQuestion++;
if (currentQuestion < questions.length) {
    displayQuestion()
} else {
    endQuiz();
}

// display scorecare and hide other cards
var score = document.querySelector("#score");

function endQuiz() {
    clearInterval(intervalID);
    hideCards();
    scoreCard.removeAttribute("hidden");
    scoreCard.textContent = time;
}

var submitButton = document.querySelector("#submit-button");
var inputElement = document.querySelector("#initials");

// store initials in view highscores
submitButton.addEventListener("click", storeScore);

function storeScore(event) {
    event.preventDefault();
    if (!inputElement.value) {
        alert ("Please enter your initials!");
    }
}

//store score in local storage
var leaderboardItem = {
    initials: inputElement.value,
    score: time,
};

updateStoredLeaderboard(leaderboardItem);

// hide question card and display leaderboard
hideCards();
leaderboardCard.removeAttribute("hidden");

renderLeaderboard();

function updateStoredLeaderboard(leaderboardItem) {
    let leaderboardArray = getLeaderboard();
    leaderboardArray.push(leaderboardItem);
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
}

// if exisit, get leaderboard from local storage and parse
function getLeaderboard() {
    let leaderboardArray = localStorage.getItem("leaderboardArray");
    if (!leaderboardArray) {
        return [];
    }
    return JSON.parse(leaderboardArray);
}

// display leaderboard on page
function renderLeaderboard() {
    let leaderboardArray = getLeaderboard();
    let highscoreList = document.querySelector("#highscore-list");
    highscoreList.innerHTML = "";
    for (let i = 0; i < leaderboardArray.length; i++) {
        let leaderboardItem = leaderboardArray[i];
        let leaderboardListItem = document.createElement("li");
        leaderboardListItem.textContent = leaderboardItem.initials + " - " + leaderboardItem.score;
        leaderboardList.appendChild(leaderboardListItem);
    }
}

// sort leaderboard by score, high to low
function sortLeaderboard() {
    let leaderboardArray = getLeaderboard();
    leaderboardArray.sort(function(a, b) {
        return b.score - a.score;
    });
    return leaderboardArray;
}

// clear leaderboard
var clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearHighscores);

function clearHighscores() {
    localStorage.clear();
    leaderboardCard.removeAttribute("hidden");
}

// return to start page
var backButton = document.querySelector("#back-button");
backButton.addEventListener("click", returnToStart);

function returnToStart() {
    hideCards();
    startCard.removeAttribute("hidden");
}

// use link to view highscores
var leaderboardLink = document.querySelector("#leaderboard-link");
leaderboardLink.addEventListener("click", viewLeaderboard);

function viewLeaderboard() {
    hideCards();
    leaderboardCard.removeAttribute("hidden");
}

// clear timer at end of quiz
clearInterval(intervalID);

time = undefined;
displayTime();

renderLeaderboard();

// reset quiz
var resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetQuiz);

function resetQuiz() {
    hideCards();
    startCard.removeAttribute("hidden");
    time = undefined;
    displayTime();
    currentQuestion = 0;
    displayQuestion();
}

