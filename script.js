// 1. Game Variables
let score = 0;
let currentQuestionIndex = 0; 

// 2. Fetch all question blocks from HTML
const questionBlocks = document.querySelectorAll('.question-block');
const welcomeScreen = document.getElementById('welcome-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');

// 3. Function to display only ONE question screen at a time
function showCurrentQuestion() {
  questionBlocks.forEach((block, index) => {
    if (index === currentQuestionIndex) {
      block.style.display = "flex"; 
    } else {
      block.style.display = "none";  
    }
  });
}

// 4. Function to check answers and manage game progression
function checkAnswer(isCorrect) {
  if (isCorrect) {
    score = score + 10;
    alert("Correct! 🎉 +10 Points");
  } else {
    alert("Incorrect! ❌");
  }

  // Active question box ke andar live score update karein
  const currentScoreBox = questionBlocks[currentQuestionIndex].querySelector('.score-box span');
  if (currentScoreBox) {
    currentScoreBox.innerText = "Score = " + score;
  }

  // Agle sawal par jaane ke liye pointer barhaein
  currentQuestionIndex = currentQuestionIndex + 1;

  // Check karein ke agla sawal hai ya game khatam ho gayi
  if (currentQuestionIndex < questionBlocks.length) {
    showCurrentQuestion();
  } else {
    // Aakhri question block ko hide karein
    questionBlocks[currentQuestionIndex - 1].style.display = "none";
    
    // Game over screen show karein
    if (endScreen) endScreen.style.display = "flex";
    
    // Final score screen par dikhaein
    const finalScoreDisplay = document.getElementById('final-score');
    if (finalScoreDisplay) finalScoreDisplay.innerText = "Your Score: " + score + " / 60";
    
    // Kids ke liye feedback text
    const feedback = document.getElementById('feedback-text');
    if (feedback) {
      if (score === 60) {
        feedback.innerText = "🏆 Amazing! You are a Computer Expert!";
      } else if (score >= 40) {
        feedback.innerText = "⭐ Great Job! Your computer knowledge is excellent!";
      } else {
        feedback.innerText = "👍 Good Effort! Try again to keep learning.";
      }
    }
  }
}

// 5. Buttons ke Click Events (Sawal aur unke sahi/galat jawab)
if (questionBlocks.length >= 6) {
  // Q1: Computer is a machine (True)
  questionBlocks[0].querySelectorAll('.option-btn')[0].addEventListener('click', () => checkAnswer(true));
  questionBlocks[0].querySelectorAll('.option-btn')[1].addEventListener('click', () => checkAnswer(false));
  
  // Q2: Mouse has Two buttons (True)
  questionBlocks[1].querySelectorAll('.option-btn')[0].addEventListener('click', () => checkAnswer(false));
  questionBlocks[1].querySelectorAll('.option-btn')[1].addEventListener('click', () => checkAnswer(true));
  
  // Q3: Brain of computer is CPU (True)
  questionBlocks[2].querySelectorAll('.option-btn')[0].addEventListener('click', () => checkAnswer(true));
  questionBlocks[2].querySelectorAll('.option-btn')[1].addEventListener('click', () => checkAnswer(false));
  
  // Q4: Sound plays from Speaker (True)
  questionBlocks[3].querySelectorAll('.option-btn')[0].addEventListener('click', () => checkAnswer(true));
  questionBlocks[3].querySelectorAll('.option-btn')[1].addEventListener('click', () => checkAnswer(false));
  
  // Q5: TV screen lookalike is Monitor (True)
  questionBlocks[4].querySelectorAll('.option-btn')[0].addEventListener('click', () => checkAnswer(false));
  questionBlocks[4].querySelectorAll('.option-btn')[1].addEventListener('click', () => checkAnswer(true));
  
  // Q6: Device used to type is Keyboard (True)
  questionBlocks[5].querySelectorAll('.option-btn')[0].addEventListener('click', () => checkAnswer(false));
  questionBlocks[5].querySelectorAll('.option-btn')[1].addEventListener('click', () => checkAnswer(true));
}

// 6. Start Button Interaction
if (startButton && welcomeScreen) {
  startButton.addEventListener('click', () => {
    welcomeScreen.style.display = "none";
    showCurrentQuestion();
  });
}

// 7. Play Again (Reset) Button Interaction
if (restartButton) {
  restartButton.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    
    // Har sawal ke score box ko wapas 0 kar dein
    questionBlocks.forEach((block) => {
      const scoreBox = block.querySelector('.score-box span');
      if (scoreBox) scoreBox.innerText = "Score = 0";
      block.style.display = "none"; // Saare blocks hide karein
    });

    if (endScreen) endScreen.style.display = "none";
    if (welcomeScreen) welcomeScreen.style.display = "flex";
  });
}

// 8. Game Initial Start Setup
if (welcomeScreen) welcomeScreen.style.display = "flex";
if (endScreen) endScreen.style.display = "none";
questionBlocks.forEach(block => block.style.display = "none");
