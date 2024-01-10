const quizData = [
    {
        question: "What is JavaScript?",
        choices: ["A programming language", "A markup language", "A database", "A server"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        choices: ["String", "Boolean", "Float", "Number"],
        correctAnswer: 2
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Highly Typed Markdown Language", "Hyperlink and Text Markup Language", "Hyper Transfer Markup Language"],
        correctAnswer: 0
    },
    {
        question: "Which programming language is often used for web development alongside HTML and CSS?",
        choices: ["Java", "Python", "Ruby", "JavaScript"],
        correctAnswer: 3
    },
    {
        question: "What values do Booleans return?",
        choices: ["hexidecimal", "7.5", "int", "0/1"],
        correctAnswer: 3
    },
    {
        question: "What does CSS stand for?",
        choices: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style System", "Colorful Style Sheet"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is a version control system?",
        choices: ["HTML", "Git", "Python", "JavaScript"],
        correctAnswer: 1
    },
    {
        question: "What is Linux most similar to?",
        choices: ["Firefox", "Safari", "MacOS", "Chrome"],
        correctAnswer: 2
    },
    {
        question: "Which of these is a front-end framework/library for building user interfaces?",
        choices: ["Node.js", "React", "Express.js", "Django"],
        correctAnswer: 1
    },
    {
        question: "What is the a common language used for querying databases?",
        choices: ["HTML", "CSS", "SQL", "JS"],
        correctAnswer: 2
    }
];

const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices-list");
const feedbackText = document.getElementById("feedback-text");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let timer;
let timeRemaining = 120; // Set your desired time limit in seconds

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    choicesList.innerHTML = "";

    currentQuestion.choices.forEach((choice, index) => {
        const choiceItem = document.createElement("li");
        choiceItem.textContent = choice;
        choiceItem.addEventListener("click", () => checkAnswer(index));
        choicesList.appendChild(choiceItem);
    });

    startTimer(); // Start the timer for each question
}

function startTimer() {
    clearInterval(timer); // Clear any existing timers

    timer = setInterval(() => {
        timerElement.textContent = `Time: ${timeRemaining}`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            questionText.textContent = "Quiz complete!";
            choicesList.innerHTML = "";
            feedbackText.textContent = "";
            nextButton.style.display = "none";
            timerElement.textContent = "Time's up!";
        } else {
            timeRemaining--;
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctAnswer) {
        feedbackText.textContent = "Correct!";
    } else {
        feedbackText.textContent = "Incorrect. Try again.";
        timeRemaining -= 10; // Subtract 10 seconds for incorrect answers
    }

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        feedbackText.textContent = "";
        nextButton.style.display = "none";
    } else {
        clearInterval(timer);
        questionText.textContent = "Quiz complete!";
        choicesList.innerHTML = "";
        feedbackText.textContent = "";
        nextButton.style.display = "none";
        timerElement.textContent = `Time: ${timeRemaining}`;
    }
});

loadQuestion();
const initialsInput = document.getElementById("initials");
        const saveScoreButton = document.getElementById("save-score-button");
        const highScoresList = document.getElementById("high-scores-list");
        let highScores = []; // Array to store high scores

        // Load high scores from localStorage
        function loadHighScores() {
            const storedScores = localStorage.getItem("highScores");
            if (storedScores) {
                highScores = JSON.parse(storedScores);
                displayHighScores();
            }
        }

        // Save high scores to localStorage
        function saveHighScores() {
            localStorage.setItem("highScores", JSON.stringify(highScores));
        }

        // Display high scores
        function displayHighScores() {
            highScoresList.innerHTML = "";
            highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order

            highScores.forEach((scoreData, index) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${scoreData.initials}: ${scoreData.score}`;
                highScoresList.appendChild(listItem);
            });
        }

        // Event listener for saving score
        saveScoreButton.addEventListener("click", () => {
            const initials = initialsInput.value.trim();
            if (initials && currentQuestionIndex === quizData.length) {
                highScores.push({ initials, score: timeRemaining });
                saveHighScores();
                displayHighScores();
                initialsInput.value = "";
                document.getElementById("result-container").style.display = "none";
                document.getElementById("high-scores-container").style.display = "block";
            }
        });

        // Load and display high scores on page load
        loadHighScores();
        displayHighScores();