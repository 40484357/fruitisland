const beginQuiz = document.getElementById('begin_quiz')
const showQuiz = document.getElementById('quiz_ui')
const textElement = document.getElementById('text')
const nextQuestion = document.getElementById('next_question')
const submitAnswer = document.getElementById('submit_answer')
const submitContainer = document.getElementById('submit-and-next')
const close = document.getElementById('close')



beginQuiz.addEventListener('click', openQuiz)

close.addEventListener('click', closeQuiz)

function openQuiz(){
    showQuiz.classList.add('flex')
    showQuiz.classList.remove('hide')
    if(!tutorialState){
        startButtonElement.innerText = 'Start Quiz'
    }
}

function closeQuiz(){
    showQuiz.classList.add('hide')
    showQuiz.classList.remove('flex')
    
}



const startButtonElement = document.getElementById('start_tutorial')
const continueButtonElement = document.getElementById('continue_button')

startButtonElement.addEventListener('click', startGame)

continueButtonElement.addEventListener('click', continueTutorial)

const tutorial_options = document.getElementById('tutorial_buttons')

const game_buttons = document.getElementById('answer_btn_grid')

let tutorialIndex = 1
let tutorialState = false



function startGame(){
    if(tutorialState){
    showTextNode(tutorialIndex)
    startButtonElement.classList.add('hide')
    continueButtonElement.classList.remove('hide')
    } else {startQuiz()}
}

function continueTutorial(){
    tutorialIndex++
   if (tutorialIndex<=textNodes.length && tutorialState){ 
    showTextNode(tutorialIndex)
   } else {
    tutorialState = false   
    startQuiz()}
}

nextQuestion.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})



function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

}

const optionOne = document.getElementById('btn_one')
const optionTwo = document.getElementById('btn_two')
const optionThree = document.getElementById('btn_three')
const optionFour = document.getElementById('btn_four')

function startQuiz(){

    tutorial_options.classList.add('hide')
    game_buttons.classList.remove('hide')
    game_buttons.classList.add('answer_btn_grid')
    textElement.innerText = 'Select your category'
    
    optionOne.innerText = 'General Knowledge'
    optionTwo.innerText = 'STEM'
    optionThree.innerText = 'Arts and Culture'
    optionFour.innerText = 'History and Georgraphy'
    optionOne.addEventListener('click', generalKnowledge)
    optionTwo.addEventListener('click', stem)
    optionThree.addEventListener('click', artsAndCulture)
    optionFour.addEventListener('click', historyAndGeography)
}

let sortQuestions, currentQuestionIndex

function generalKnowledge(){

    sortQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0

    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(sortQuestions[currentQuestionIndex])
    
}

function resetState(){
    nextQuestion.classList.add('hide')
    submitAnswer.classList.remove('hide')
    submitContainer.classList.add('hide')
    while (game_buttons.firstChild){
        game_buttons.removeChild(game_buttons.firstChild)
    }
}


function showQuestion(question){
    textElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answer_btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
            button.id = 'correct'
        }
        button.addEventListener('click', selectAnswer)
        game_buttons.appendChild(button)
    })
    
}





function selectAnswer(e){
    const selectedButton = e.target
    Array.from(game_buttons.children).forEach(button => {
        setSelectStatus(button, selectedButton)
    })

    submit(selectedButton)
}

function setSelectStatus(element, selectedButton){
clearStatus(element)
selectedButton.classList.add('selected')
}

function clearStatus(element){
element.classList.remove('selected')
}


function submit(selectedButton){
    submitContainer.classList.remove('hide')
    
    if(selectedButton.dataset.correct){
        selectedButton.id = "correct"
        submitAnswer.addEventListener('click', correctAnswer)
    } else {
        submitAnswer.addEventListener('click', wrongAnswer)
    }
}

// function checkAnswer(){
//     if(selectedButton.dataset){
//         correctAnswer(selectedButton)
//     } else {
//         wrongAnswer(selectedButton)
//     }
// }

function correctAnswer(){
    const correctAnswer = document.getElementById("correct")
    correctAnswer.classList.add('correct')
    textElement.innerText = "Correct!"
    submitAnswer.classList.add('hide')
    nextQuestion.classList.remove('hide')
    increaseScore()
}

function wrongAnswer(){
    
    textElement.innerText = 'That is not correct'
    game_buttons.firstChild.classList.remove('selected')
    const correctAnswer = document.getElementById('correct')
    correctAnswer.classList.add('correct')
    nextQuestion.classList.remove('hide')
    submitAnswer.classList.add('hide')
}





function increaseScore(score){
    
    score = 0
    score++
    console.log(score)

}



const questions = [
    {
        question: 'What is the longest river in the world?',
        answers: [
            
            { text: 'The Nile', correct: true },
            { text: 'The Amazon River', correct: false },
            { text: 'Yellow River', correct: false },
            { text: 'Amur River', correct: false }
        ],
    },
    {
        question: 'In computing what does RAM stand for?',
        answers: [
            {text: 'Reading Active Megabits', correct: false},
            {text: 'Really Active Motherboard', correct: false},
            {text: 'Random Access Memory', correct: true},
            {text: 'Right Access Memory', correct: false}
        ]
    }
]

function stem(){
    console.log('stem')
}
function artsAndCulture(){
    console.log('arts')
}
function historyAndGeography(){
    console.log('history')
}



const textNodes = [
    {
        id: 1,
        text: 'Welcome to the quiz tutorial, here is how it works. There are four categories: General Knowledge, STEM, Arts and Culture, and History and Geography',
        
        
    },
    {
        id: 2,
        text: 'Each quiz will contain 5 questions. Each question you get correct will improve your skill rating, a better skill rating multiplies your earnings by your skill rating.',
    },
    {
        id: 3,
        text: 'If you get some wrong, you can attempt the quiz again but be warned each attempt will make the difficulty rise. If you get more wrong in the next attempt your skill rating will always remain at the highest value.',
    },
    {
        id: 4,
        text: 'Let me break down the categories a bit. General Knowledge encompasses all the categories with questions randomly selected from each category.',
    },
    { 
        id: 5,
        text: 'Science, Technology and Maths will be exactly as they sound an example of it will be: Who founded the gravitaional theory, Answer: Sir Isaac Newton.',
    },
    {
        id: 6,
        text: 'Arts and Culture will be popular culture references, for example: Who create the Marilyn Diptch, Answer: Andy Warhol',
    },
    {
        id: 7,
        text: 'History and Geography will be historical and geographical facts, for example: What is the largest river in the world, Answer: The Nile',
    },
    {
        id: 8,
        text: 'And that is all there is to it. When you\'re ready let\'s begin the first quiz'
    }

]

