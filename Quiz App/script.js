const questions = [
{
    question: "What is full form of HTML?",
    answers: [
        { text: "Hyper-Tale Markup Language", correct:false},
        { text: "Hyper-Tele Mark Language", correct:false},
        { text: "Hyper-Test Markup Language", correct:false},
        { text: "Hyper-Text Markup Language", correct:true},
    ]
},
{
    question: "Which tag is used for line-break?",
    answers: [
        { text: "a", correct:false},
        { text: "br", correct:true},
        { text: "h1", correct:false},
        { text: "ul", correct:false},
    ]
},
{
    question: "What is the correct sequence?",
    answers: [
        { text: "Head, Title, Body, HTML", correct:false},
        { text: "HTML, Head, Title, Body", correct:true},
        { text: "Title, HTML, Head, Body", correct:false},
        { text: "Body, Head, HTML, Title", correct:false},
    ]
},
{
    question: "Which is smallest heading tag?",
    answers: [
        { text: "h1", correct:false},
        { text: "h2", correct:false},
        { text: "h5", correct:false},
        { text: "h6", correct:true},
    ]
},
{
    question: "Which tag is used to create paragraph?",
    answers: [
        { text: "p", correct:true},
        { text: "par", correct:false},
        { text: "text", correct:false},
        { text: "div", correct:false},
    ]
}

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => 
    {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    }
    );
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>
    {
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
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})


startQuiz();