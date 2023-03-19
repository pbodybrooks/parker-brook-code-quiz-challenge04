// Stored HTML Elements - storing elements in the HTML selected via querySelectors to be used later in our functions
// change these vars to consts after confirm working
const startButtonEl = document.querySelector('#startButton');
const quizBoxEl = document.querySelector('#quizBox');
const clockEl = document.querySelector('#clockBox p');
const qNumEl = document.querySelector('#num');
const activeQuestion = document.querySelector('#question');
const possibleAnswers = document.querySelectorAll(".answer");
const startBoxEl = document.querySelector("#startBox");
const currentScoreEl = document.querySelector("#currentScore");
const finalScoreEl = document.querySelector("#finalScore");

// Global Scope variables
let time;
let playerScore = 0;
let qIndex = 0;
let correctAnswer;

// Questions Bank
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

function startGame(){
    gameClock();
    startBoxEl.style.display = "none";
    quizBoxEl.style.display = "flex";
    showQuestion();
}

// function showQuestionDelay() {
//     var countdown1 = setInterval(function(){
//         showQuestion
//     }, 1000)
// }

// gameClock runs a countdown timer that starts when the start button is pressed and will display the remaining time to the player. 
function gameClock() {
    startBoxEl.style.display = "none";
    time = 90 // Set the time remaining to 90 seconds.
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
        showEndscreen();
      }
      // Sets the rate or interval of the function to 1000ms or 1 second.
    }, 1000); 
}

// the showQuestion function references the indexed object in the questions array to display a question, number, and answers
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
    else {currentScoreEl.textContent = "You have " + playerScore + " points."
    }
    validateAnswer();
}

function validateAnswer() {
    console.log(correctAnswer);
    correctAnswer = questions[qIndex].answer;
    for (let i=0; i<possibleAnswers.length; i++){
        possibleAnswers[i].addEventListener("click",function(event){
            if (possibleAnswers[i].innerHTML === correctAnswer){
                // alert("That is correct!\nYou've earned a point!");
                playerScore++;
                qIndex++;
                return showQuestion();
            } else {
                alert("That is incorrect.\n10 seconds have been removed from the clock.");
                qIndex++;
                time = time - 10;
                return showQuestion();
            }
            // showQuestion();
        })
    }
}

function showEndscreen() {
    quizBoxEl.style.display = "none";
    finalScoreEl.textContent = "You answered " + playerScore + " out of " + questions.length + " questions correctly!"

}








// Event Listeners
startButtonEl.addEventListener("click",startGame);




/* ----------------------- Pseudo-code & Planning -----------------------
first we will define the bank of questions as an array along with their corresponding answers as key-value pairs

When the user loads the page, they will be presented with a large heading and subheading and a large green START
button in the center of the page prompting the user to start the game

When the user clicks the button, a function startGame will run via an event listener looking for a click on the button
eventlister(click,startGame)

The startGame function will do the following:
- start the clock (90 seconds) using the setInterval method
- the button will disappear via the display:none property/value pair 
- a showQuestion function will present the user with the first question and its answers using the display:block property along with a button to submit answer
- a second event listener will look for a click on the submit button click
- a nested function submitAnswer will check the user answer
- correct questions will prompt a function addPoints to add a point to a variable storing the users score
- incorrect questions will deduct 5 seconds
- once the last question is answered or time runs out, the function will end the game and display the users score and ask if they'd like to play again
- return a score
- After the function has been run, the score will be saved to a leaderboard using local storage

*/

// Code graveyard
/* function validateAnswer() {
    correctAnswer = questions[qIndex].answer;
    console.log(correctAnswer);
    for (let i=0; i<possibleAnswers.length; i++){
        possibleAnswers[i].onclick = function(playerAnswer){
            playerAnswer = questions[qIndex].answers[i];
            console.log("playerAnswer string is " + playerAnswer);
            if (playerAnswer === correctAnswer){
                console.log("That is correct");
                playerScore++;
                qIndex++;
                showQuestion;
            } else if (playerAnswer !== correctAnswer){
                console.log("That is incorrect");
                qIndex++;
                time = time - 10;
                showQuestion;
            }
        }
    }
} */

/* function validateAnswer() {
    correctAnswer = questions[qIndex].answer;
    if (playerAnswer === correctAnswer){
        playerScore++;
        qIndex++;
        showQuestion;
    } else if (playerAnswer !== correctAnswer){
        qIndex++;
        time = time - 10;
        showQuestion;
    }
} */