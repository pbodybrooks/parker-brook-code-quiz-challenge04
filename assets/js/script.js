// Stored HTML Elements - storing elements in the HTML selected via querySelectors to be used later in our functions
// change these vars to consts after confirm working
const startButtonEl = document.querySelector('#startButton');
const clockEl = document.querySelector('#clockBox p');
const qNumEl = document.querySelector('#num');
const activeQuestion = document.querySelector('#question');
const possibleAnswers = document.querySelectorAll(".answer");
const startBoxEl = document.querySelector("#startBox");

// Global Scope variables
let time;
let playerScore = 0;
let qIndex = 0;

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
        question: "",
        answers: [
            "",
            "",
            "",
            ""
        ],
        answer: ""
    },
]

function showQuestion() {
    qNumEl.textContent = "Question #" + questions[qIndex].number;
    activeQuestion.textContent = questions[qIndex].question;
    for (let i=0; i<possibleAnswers.length; i++){
        possibleAnswers[i].innerHTML = questions[qIndex].answers[i];
    }
    qIndex++
}

function validateAnswer() {
    if (playerAnswer === answer){
        playerScore++;
        qIndex++;
        showQuestion;
    } else if (playerAnswer !== answer){
        qIndex++;
        time = time - 10;
    }
}

// gameClock runs a countdown timer that starts when the start button is pressed and will display the remaining time to the player. 
function gameClock() {
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
      }
      // Sets the rate or interval of the function to 1000ms or 1 second.
    }, 1000); 
}

function startGame(){
    startBoxEl.style.display = "none";


    gameClock();
    showQuestion();
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

