// Stored HTML Elements - storing elements in the HTML selected via querySelectors to be used later in our functions
// change these vars to consts after confirm working
const startButtonEl = document.querySelector('#startButton');
const showLeaderboard = document.querySelector("#leaderboardButton");
const quizBoxEl = document.querySelector('#quizBox');
const clockEl = document.querySelector('#clockBox p');
const qNumEl = document.querySelector('#num');
const activeQuestion = document.querySelector('#question');
const possibleAnswers = document.querySelectorAll(".answer");
const startBoxEl = document.querySelector("#startBox");
const currentScoreEl = document.querySelector("#currentScore");
const endscreenBoxEl = document.querySelector("#endscreenBox");
const finalScoreEl = document.querySelector("#finalScore");
const playerScoreInputEl = document.querySelector("#playerInitials");
const submitPlayerScoreEl = document.querySelector("#submitPlayerScore");
const leaderboardBoxEl = document.querySelector("#leaderboardBox");
const leaderboardName = document.querySelector("#leaderboardBodyName");
const leaderboardScore = document.querySelector("#leaderboardBodyScore");
const replayButtonEl = document.querySelector("#replayButton");
const resetLeaderboardButtonEl = document.querySelector("#leaderboardResetButton");


// Global Scope variables
let time;
let playerScore = 0;
let qIndex = 0;
let correctAnswer;

// Questions Bank
// this contains all of our questions to be shown to the player in a single array. 
// the array consists of question objects, each containing the number, question itself, answers, and correct answers as key-value pairs.
// the answers value is an array of strings to be shown to the player
const questions = [
    {
        number: 1,
        question: 'Similar to how a style.css stores CSS code, what kind of file stores JavaScript Code?',
        answers: [
            'java.script',
            'javascript.js',
            'script.js',
            'index.js'
        ],
        answer: 'script.js'
    },
    {
        number: 2,
        question: "What is JavaScript's primary contribution to the construction of a webpage?",
        answers: [
            "To add functionality to the webpage.",
            "To add styling to the webpage.",
            "To add structure to the webpage.",
            "To add security to the webpage"
        ],
        answer: "To add functionality to the webpage."
    },
    {
        number: 3,
        question: "What is a function",
        answers: [
            "A event or gathering of people",
            "A block of code designed to perform a particular task",
            "Code that can be fed parameters",
            "Both B and C"
        ],
        answer: "Both B and C"
    },
    {
        number: 4,
        question: "Which of the following can be used to select HTML elements via the JavaScript document?",
        answers: [
            "document.querySelector()",
            "document.setAttribute()",
            "document.getElementByID()",
            "Both A and C"
        ],
        answer: "Both A and C"
    },
    {
        number: 5,
        question: "For loops are used for what purpose?",
        answers: [
            "To execute a specific block of code if a condition is true",
            "To define a value for a variable",
            "To loop through a block of code as long as a specified condition is true",
            "To loop through a block of code until a specified condition is false"
        ],
        answer: "To loop through a block of code until a specified condition is false"
    },
    {
        number: 6,
        question: "What is an array?",
        answers: [
            "A collection of mutliple items stored under a single variable name",
            "A type of sea ray, which are cartilaginous fish related to sharks",
            "A property used to convert a string into an integer",
            "A way to style an HTML element."
        ],
        answer: "A collection of mutliple items stored under a single variable name"
    },
    {
        number: 7,
        question: "What is a JavaScript object?",
        answers: [
            "Anything that has mass",
            "A variable containing values as key-value pairs",
            "A variable that can store only strings",
            "A way to apply styling from a stylesheet to mutliple HTML elements"
        ],
        answer: "A variable containing values as key-value pairs"
    },
    {
        number: 8,
        question: "What does API stand for?",
        answers: [
            "Applied Property Insertion",
            "Applicant Processing Interface",
            "Application Programming Interface",
            "Array Placement Index"
        ],
        answer: "Application Programming Interface"
    },
]

// startGame runs the initial game function containing the clock and showing of the first question
// we also wanted to hide the start game display and show the quiz display
function startGame(){
    gameClock();
    startBoxEl.style.display = "none";
    quizBoxEl.style.display = "flex";
    showQuestion();
}

// the jumpToLeaderboard function takes the user to the leaderboard
function jumpToLeaderboard() {
    startBoxEl.style.display = "none";
    endscreenBoxEl.style.display = "none";
    leaderboardBoxEl.style.display = "flex";
}

// gameClock runs a countdown timer that starts when the start button is pressed and will display the remaining time to the player. 
function gameClock() {
    startBoxEl.style.display = "none";
    time = 60 // Set the time remaining to 60 seconds.
    // setInterval method is used to repeatedly call the function containing the if statements every loop (1000ms).
    var countdown = setInterval(function() {
      if (time < 12 && time > 8 ) {
        // displays a "Time's almost up!" warning if there is between 9 to 11 seconds left. 
        clockEl.textContent = "❗ Time's almost up ❗";
        // remove 1 (second) from time each loop of the function (every 1000ms).
        time--;
      } else if (time > 1) {
        // displays time remaining for all amounts of seconds excluding 0, 1, and 9-11.
        clockEl.textContent = '⏳ ' + time + ' seconds remaining ⏳';
        time--;
      } else if (time === 1) {
        // When `time` is equal to 1, rewrite to 'second' instead of 'seconds'.
        clockEl.textContent = '❗ ' + time + ' second remaining ❗';
        time--;
      } else {
        // displays "⌛ Game over! ⌛" once time reaches 0.
        clockEl.textContent = "⌛ Game over! ⌛";
        // clearInterval method cancels the previously created countdown timer.
        clearInterval(countdown);
        // at time = 0, run the showEndscreen function
        showEndscreen();
      }
      // Sets the rate or interval of the function to 1000ms or 1 second.
    }, 1000); 
}

// the showQuestion function references the indexed object in the questions array to display a question, number, and answers
// after showing the question, validateAnswer is returned to prepare for the players choice
function showQuestion() {
    // displays the question number
    qNumEl.textContent = "Question #" + questions[qIndex].number;
    // displays the question itself
    activeQuestion.textContent = questions[qIndex].question;
    // for loop places an answer to be displayed into each of the four buttons
    for (let i=0; i<possibleAnswers.length; i++){
        possibleAnswers[i].innerHTML = questions[qIndex].answers[i];
    }
    // display the player's points and modify the phrasing slightly if it is one point or multiple/zero
    if (playerScore === 1){
        currentScoreEl.textContent = "You have " + playerScore + " point.";
    }
    else {currentScoreEl.textContent = "You have " + playerScore + " points.";
    }
    return validateAnswer();
}

// validateAnswer checks the correct/incorrectness of the player's selected answer
// note to grader: originally I attempted this using a for loop to add event listeners to the buttons, but it caused issues with stacking-event listeners and I wasn't able to fix it
function validateAnswer() {
    // Log the correct answer in the console for debugging purposes
    console.log(correctAnswer);
    // Set the correct answer for the current question
    correctAnswer = questions[qIndex].answer;
    // Create a new function to handle the click event
    function handleClick() {
      // Get the clicked element from the event object
      let clickedAnswer = event.target;
      // Check if the clicked element has the class 'answer'
      if (clickedAnswer.classList.contains('answer')) {
        // Remove the event listener to prevent additional clicks
        questionsBox.removeEventListener("click", handleClick);
        // Check if the clicked answer matches the correct answer
        if (clickedAnswer.innerHTML === correctAnswer) {
          // If the answer is correct, display a success message and increment the player's score
          alert("That is correct!\nYou've earned a point!");
          playerScore++;
        } else {
          // If the answer is incorrect, display an error message and decrement the remaining time
          alert("That is incorrect.\n10 seconds have been removed from the clock.");
          time = time - 10;
        }
        // Move on to the next question
        qIndex++;
        // Show the next question
        showQuestion();
      }
    }
    // Re-add the event listener for next question
    questionsBox.addEventListener("click",handleClick);
}

// showEndscreen is a simple function that displays the endscreen and tells the player their score
// it also will display a text field where intiials can be entered, and a button to submit
function showEndscreen() {
    startBoxEl.style.display = "none";
    quizBoxEl.style.display = "none";
    endscreenBoxEl.style.display = "flex";
    playerScoreInputEl.value = "";
    finalScoreEl.textContent = "You answered " + playerScore + " out of " + questions.length + " questions correctly!";
}

// when player clicks the button to submit their initials and highscore, this event listener runs the saveHighScore function
// this function will the player to the start screen if they dont want to enter initials, otherwise it will GET the leaderboard scores from localstorage, stringify, add the new score, and run showLeaderboardScores
submitPlayerScoreEl.addEventListener("click", function saveHighScore(){
    // if no initials entered, return player to start screen to play again
    if (playerScoreInputEl.value === ""){
        return playAgain();
    } else {
        // otherwise, if initials are entered, pull and stringify existing scores from local storage
        let leaderboardScores = JSON.parse(localStorage.getItem("leaderboardScores")) || [];
        // take form-submitted initials and store them in a variable that will serve as the value to the player key in the object we will push to local storage next
        let playerInitials = playerScoreInputEl.value;
        let playerFinalScore = {
            player: playerInitials,
            highScore: playerScore
        };
        // push new player's score and intials object to leaderboard's existing scores
        leaderboardScores.push(playerFinalScore);
        // add the new leaderboard scores (containing new player score/initials) into local storage
        localStorage.setItem("leaderboardScores", JSON.stringify(leaderboardScores));
        startBoxEl.style.display = "none";
        endscreenBoxEl.style.display = "none";
        leaderboardBoxEl.style.display = "flex";

        showLeaderboardScores();
    };
});

// showLeaderboardScores grabs the newly updated leaderboard scores from local storage. it then iterates through all the scores, creating a list item from each initials and score, setting their text content, and then appending them as children to the leaderboard columns
function showLeaderboardScores() {
    // grab all scores from local storage
    let allScores = JSON.parse(localStorage.getItem("leaderboardScores")) || [];
    // iterate through all scores
    for (let i=0; i < allScores.length; i++){
        // create a new list item for each entered player initials/score pair
        let playerNames = document.createElement("li");
        let playerScores = document.createElement("li");
        // set the text content for player's initials and score
        playerNames.textContent = allScores[i].player;
        playerScores.textContent = allScores[i].highScore;
        // append initials and score list elements as children of the respective categorical columns on the leaderboard
        leaderboardName.appendChild(playerNames);
        leaderboardScore.appendChild(playerScores);
    }
}

// the playAgain function simply brings the player back to the start page and sets the score to 0 and returns to the first question
function playAgain() {
    playerScore = 0;
    qIndex = 0;
    endscreenBoxEl.style.display = "none";
    leaderboardBoxEl.style.display = "none";
    startBoxEl.style.display = "flex";
}

// resetLeaderboard resets local storage, clearing the leaderboard of all stored initials and scores
function resetLeaderboard() {
    window.localStorage.clear();
    leaderboardName.textContent = "";
    leaderboardScore.textContent = "";
}

// Event Listeners
// listens for a click on START > starts the game
startButtonEl.addEventListener("click",startGame);
// listens for a click on Play again? > takes player back to start page
replayButtonEl.addEventListener("click",playAgain);
// listens for a click on Reset Leaderboard? > runs the function to clear leaderboard
resetLeaderboardButtonEl.addEventListener("click",resetLeaderboard);
// listens for a click on Leaderboard > takes the user to the leaderboard
showLeaderboard.addEventListener("click",jumpToLeaderboard);
