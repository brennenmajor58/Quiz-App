const questions = [
    {
        question: "Who won the MLB World Series in 2013?",
        answers: [
            { text: "Braves", correct: false},
            { text: "Phillies", correct: false},
            { text: "Red Sox", correct: true},
            { text: "Washington", correct: false},
        ]
    },
    {
        question: "Who won the World Series MVP in 2013?",
        answers: [
            { text: "Dustin Pedroia", correct: false},
            { text: "Derek Jeter", correct: false},
            { text: "Clayton Kershaw", correct: false},
            { text: "David Ortiz", correct: true},
        ]
    },
    {
        question: "Who is Boston Red Sox Mascot?",
        answers: [
            { text: "Wally the Green Monster", correct: true},
            { text: "Orbit", correct: false},
            { text: "Phanatic", correct: false},
            { text: "Blooper", correct: false},
        ]
    },
    {
        question: "Who is the best pitcher from the Red Sox?",
        answers: [
            { text: "Pedro Martinez", correct: true},
            { text: "Chris Sale", correct: false},
            { text: "Jon Lester", correct: false},
            { text: "Tim Wakefield", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{ 
        selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }

    function showScore(){
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex <  questions.length){
            showQuestion();
        }else{ 
            showScore();
        }
    }
    

    nextButton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length){
        handleNextButton();
        }else{
            startQuiz();
        }
    });

startQuiz();