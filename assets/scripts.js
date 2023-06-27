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

var startCard = document.querySelector("start-card");
var quizCard = document.querySelector("quiz-card");
var scoreCard = document.querySelector("score-card")

// Cards that are hidden
function hideCards(){
    startCard.setAttribute("hidden", true);
    quizCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
}

var intervalID;
var time;
var currentQuestion;

document.querySelector("start-button").addEventListener("click", startQuiz);

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

// End quiz qhwn time runs out
function countdown(){
    time--;
    displayTime();
    if (time < 1){
        endQuiz();
    }
}

var timeDisplay = document.querySelector("time");
function displayTime(){
    timeDisplay.textContent = time;
}

function displayQuestion(){
    var question = questions[currentQuestion];
    var options = question.options;
}

for (var i = 0; i < option.length; i++){
    var option = options[i];
    var optionButton = document.querySelector("option + 1");
    optionButton.textContent = option;
}