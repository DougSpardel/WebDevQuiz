
const quizData = [
    {
        question: "Question 1?",
        choices: ["Answer", "Choice", "Choice", "Choice"],
        correctAnswer: 0
    },
    {
        question: "Question 2?",
        choices: ["Choice", "Choice", "Answer", "Choice"],
        correctAnswer: 2
    }
];

let score = 0;
let currentQuestionIndex = 0;
let timer;
let timeRemaining = 120;

const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices-list");
const feedbackText = document.getElementById("feedback-text");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const initialsInput = document.getElementById("initials-input");
const saveScoreButton = document.getElementById("save-score-button");
const highScoresList = document.getElementById("high-scores-list");

function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        choicesList.innerHTML = "";
        currentQuestion.choices.forEach((choice, index) => {
            const choiceItem = document.createElement("li");
            choiceItem.textContent = choice;
            choiceItem.addEventListener("click", () => checkAnswer(index));
            choicesList.appendChild(choiceItem);
        });
        startTimer();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timeRemaining = 120;
    clearInterval(timer);
    timer = setInterval(() => {
        timerElement.textContent = `Time: ${timeRemaining}`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            endQuiz();
        }
        timeRemaining--;
    }, 1000);
}

function checkAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];

    // Check if the question has already been answered
    if (currentQuestion.hasOwnProperty('answered')) {
        feedbackText.textContent = "You've already answered this question.";
        return;
    }

    // Mark the question as answered to prevent multiple answers
    currentQuestion.answered = true;

    if (selectedIndex === currentQuestion.correctAnswer) {
        feedbackText.textContent = "Correct!";
        score++;
    } else {
        feedbackText.textContent = "Incorrect.";
    }
    nextButton.style.display = "block";
}


function endQuiz() {
    clearInterval(timer);

    // Hide quiz question and choices
    questionText.style.display = 'none';
    choicesList.style.display = 'none';

    // Calculate the score and update the timer element to display the score
    const scorePercentage = (score / quizData.length) * 100;
    timerElement.innerHTML = `Your Score: ${scorePercentage.toFixed(2)}%`;

    // Optionally, if you want to change the style of the timer element to better suit the score display:
    timerElement.style.fontSize = '24px'; // Example to increase font size
    timerElement.style.color = '#4CAF50'; // Example to change font color
    // Add any other style changes as needed

    // Show the result container
    document.getElementById("result-container").style.display = 'block';
}



// Initially hide the score element
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.user-score').style.display = 'none'; // Hide score initially
    loadQuestion();
    loadHighScores();
});

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    feedbackText.textContent = "";
    nextButton.style.display = "none";
    loadQuestion();
});

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

function saveHighScores() {
    const initials = initialsInput.value.trim().toUpperCase();
    if (initials && initials.length <= 3) {
        const scorePercentage = (score / quizData.length) * 100;
        highScores.push({ initials, score: scorePercentage });
        highScores.sort((a, b) => b.score - a.score);
        highScores = highScores.slice(0, 10);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores();
        initialsInput.value = "";
        document.getElementById("result-container").style.display = "none";
        document.getElementById("high-scores-container").style.display = "block";
    }
}

function displayHighScores() {
    highScoresList.innerHTML = "";     
    highScores.forEach((scoreData) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${scoreData.initials}: ${parseFloat(scoreData.score).toFixed(2)}%`;
        highScoresList.appendChild(listItem);
    });
}

saveScoreButton.addEventListener("click", () => {
    saveHighScores();
});

function loadHighScores() {
    const storedScores = localStorage.getItem("highScores");
    if (storedScores) {
        highScores = JSON.parse(storedScores);
    }
    displayHighScores();
}

document.addEventListener('DOMContentLoaded', function () {
    loadQuestion();
    loadHighScores();
});
