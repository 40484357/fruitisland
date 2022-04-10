/*database initialisation*/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, doc, getDoc, setDoc, updateDoc, query, where } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVdDFAcvEExi53u5GPAObk14ngBI-m3OY",
    authDomain: "fruit-island-2.firebaseapp.com",
    projectId: "fruit-island-2",
    storageBucket: "fruit-island-2.appspot.com",
    messagingSenderId: "471448342052",
    appId: "1:471448342052:web:282d09de2faf1dec5892b1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const colRef = collection(db, 'userdata')


let userId = localStorage.uid

setDoc(doc(colRef, userId), {uid: userId})

var interval = setInterval(saveData, 1000000)

function saveData(){
  updateDoc(doc(colRef, userId), {
    username: localStorage.username,
    level: localStorage.level,
    totalSeeds: localStorage.totalSeeds,
    seeds_per_second: localStorage.seeds_per_second,
    tutorialState: true,
    visited: true,
    lemonFruit: localStorage.lemonFruit
  })
}

/* variables */

const beginQuiz = document.getElementById('begin_quiz')
const showQuiz = document.getElementById('quiz_ui')
const textElement = document.getElementById('text')
const nextQuestion = document.getElementById('next_question')
const submitAnswer = document.getElementById('submit_answer')
const submitContainer = document.getElementById('submit-and-next')
const close = document.getElementById('close')
const allQuests = document.getElementById('quests')

const startButtonElement = document.getElementById('start_tutorial')
const continueButtonElement = document.getElementById('continue_button')
startButtonElement.addEventListener('click', startGame)
continueButtonElement.addEventListener('click', continueTutorial)

const tutorial_options = document.getElementById('tutorial_buttons')
const game_buttons = document.getElementById('answer_btn_grid')

const optionOne = document.getElementById('btn_one')
const optionTwo = document.getElementById('btn_two')
const optionThree = document.getElementById('btn_three')
const optionFour = document.getElementById('btn_four')

let quizScore = 0
let answerCorrect = false
let tutorialIndex = 1
 
//temporary
let gkState = false
let stemState = false
let acState = false
let hgState = false

/* gameload handler */

const seedsPS = document.getElementById('seeds-per-second')
const totalSeedsItem = document.getElementById('total-seeds')
const fruitsContainer = document.getElementById('fruits-container')
const skillsContainer = document.getElementById('skills-container')

const gameLoadFruits = [
    {
        Fruit: 'lemon',
        levelRequired: 0,
        requiredValue: 'lemonFruit'
    },
    {
        Fruit: 'watermelon',
        levelRequired: 5,
        requiredValue: 'watermelon'
    }
] 

const gameLoadSkills = [
    {
        Skill: 'Lemonade',
        levelRequired: 1,
        requiredValue: 'Lemonade'
    }
]

const quests = [
    {
        id: 1,
        text: 'When life gives you lemons...',
        questValue: 'Lemonade'
    },
    {
        id: 2,
        text: 'An apple a day',
        questValue: 'apple',
    },
    {
        id: 3,
        text: 'Toffee apples',
        questValue: 'Toffee Apples'
    },
    {
        id: 4,
        text: 'Banana farmer',
        questValue: 'banana'
    },
    {
        id: 5,
        text: 'Banana bread for scale',
        questValue: 'banana bread'
    }
]
 
function onGameLoad(){

    const newFruit = document.createElement('div')
    const fruitType = document.createElement('div')
    const valueView = document.createElement('div')
    const newSkill = document.createElement('div')
    const skillType = document.createElement('div')
    const skillValue = document.createElement('div')

    let userdata = [];

    if(localStorage.uid != null){
    getDoc(doc(colRef, userId))
        .then((doc) => {
         userdata.push(doc.data())
        })
    }

    if(userdata.length > 3){
    localStorage.setItem(level, userdata.level)
    localStorage.setItem(seeds_per_second, userdata.seeds_per_second)
    localStorage.setItem(totalSeeds, userdata.totalSeeds)
    localStorage.setItem(username, userdata.username)
    localStorage.setItem(visited, userdata.visited)
    if(userdata.lemonFruit != null){
        localStorage.setItem(lemonFruit, userdata.lemonFruit)
    }
    }

    seedsPS.innerText = localStorage.seeds_per_second
    totalSeedsItem.innerText = localStorage.totalSeeds

    gameLoadFruits.forEach(fruit =>{

        let fruitRequired = fruit.requiredValue
        if(localStorage.getItem(fruitRequired) > 0){
            console.log(fruitRequired)
            newFruit
            fruitType
            valueView
            fruitType.innerHTML = fruit.Fruit
            let fruitValue = localStorage.getItem(fruitRequired)
            valueView.innerHTML = fruitValue + ' seeds'
            newFruit.append(fruitType, valueView)
            newFruit.classList.add('fruit')
            fruitsContainer.append(newFruit)
        }
    })

    gameLoadSkills.forEach(skill =>{
        let skillRequired = skill.requiredValue
            if(localStorage.getItem(skillRequired) > 0){
                console.log(skillRequired)
                newSkill
                skillType
                skillValue
                skillType.innerHTML = skill.Skill
                let skillName = skill.requiredValue
                let fruitValue = localStorage.getItem(skillName)
                skillValue.innerHTML = fruitValue + ' seeds'
                newSkill.append(skillType, skillValue)
                newSkill.classList.add('fruit')
                skillsContainer.append(newSkill)
        }
    })

    if(localStorage.level > 0){
        nextQuest()
    }
}

onGameLoad()


/* maingame script */

function setGameState(){
    if(!localStorage.tutorialState){
        localStorage.setItem('tutorialState', 1)
    }
} //sets the users tutorial state if this is their first interaction with the game

setGameState()

beginQuiz.addEventListener('click', openQuiz)

close.addEventListener('click', closeQuiz)

function openQuiz(e){
    sessionStorage.setItem('quest', e.target.dataset.questvalue) //sets quest value to users current quest
    showQuiz.classList.add('flex') 
    showQuiz.classList.remove('hide')
    if(localStorage.tutorialState > 1){
        startButtonElement.innerText = 'Start Quiz'
    } //if user has done the tutorial, openQuiz will check this and move past the tutorial and straight to the quiz
    allQuests.classList.add('hide')
    allQuests.classList.remove('quest_container')
} //opens the quiz UI

function closeQuiz(){
    showQuiz.classList.add('hide')
    showQuiz.classList.remove('flex')
    allQuests.classList.remove('hide')
    allQuests.classList.add('quest_container')
} //closes the quiz UI

function startGame(){
    if(localStorage.tutorialState < 2){
    showTextNode(tutorialIndex)
    startButtonElement.classList.add('hide')
    continueButtonElement.classList.remove('hide')
    } else {startQuiz()} 
}  //checks tutorial state, if it's below 2 (or valid) then tutorial will show, if it's above 2, the quiz will start

function continueTutorial(){
    tutorialIndex++
   if (tutorialIndex<=textNodes.length){ 
    showTextNode(tutorialIndex)
   } else {
    localStorage.tutorialState = 2  
    startQuiz()}
} //continues the tutorial until all tutorial textNodes have been read, and then sets the tutorialState to 2 to indicate tutorial has been completed, and starts the quiz

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
} //moves through tutorial textNodes

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
} //creates quiz UI, adding the quiz genre selection, each option calls a function based on their genre. 

nextQuestion.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
}) //cycles through the questions and calls next question 

let sortQuestions, currentQuestionIndex
let filteredArray = []


function generalKnowledge(){

    gkState = true
    currentQuestionIndex = 0;
    getGeneralQuestions()
    
} 

function getGeneralQuestions(){

    var request = new XMLHttpRequest()

   
    request.open('GET', "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple", true)
    
    request.onload = function (){
       let data = JSON.parse(this.response) //parses API response

        if(request.status >= 200 && request.status < 400){
            for(let i = 0; i< 5; i++){
                filteredArray.push(data.results[i])
            }
            
        } else {console.log('error')} //checks request status, pushes 5 questions into filtered array(need to change array name), calls set next question.
        setNextQuestion()
    } 

    
    request.send()

    
} //calls TriviaApi, loads question. Need to add parameters and catagories and figure out a fluid request method.

//need to create these three functions.
function stem(){

    currentQuestionIndex = 0
    
    getComputerQuestions()
    getMathsQuestions()
    getScienceQuestions()
    
}

function getScienceQuestions(){

    

    var requestScience = new XMLHttpRequest()
    requestScience.open('GET', "https://opentdb.com/api.php?amount=20&category=17&difficulty=easy&type=multiple", true)
    
   
    requestScience.onload = function (){
        
        
        let dataScience = JSON.parse(requestScience.response)

        if(requestScience.status >= 200 && requestScience.status < 400){
            for(let y = 0; y < 2; y++){
                filteredArray.push(dataScience.results[Math.floor(Math.random() * 21)])
            }
        } else {console.log('error')}
       
    }

    requestScience.send()    
}


function getMathsQuestions(){

    var requestMaths = new XMLHttpRequest()

    requestMaths.open('GET', "https://opentdb.com/api.php?amount=8&category=19&difficulty=easy&type=multiple", true)

    requestMaths.onload = function(){

        let dataMaths = JSON.parse(requestMaths.response)

        if(requestMaths.status >= 200 && requestMaths.status < 400){
            for(let x= 0; x<1; x++){
                console.log("length of arraymq" + filteredArray.length)
                filteredArray.push(dataMaths.results[Math.floor(Math.random() * 9)])
            }
        }
    }

    requestMaths.send()
}

function getComputerQuestions(){

    var requestComputers = new XMLHttpRequest()
    

    requestComputers.open('GET', "https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple", true)

    requestComputers.onload = function(){

       let dataComputers = JSON.parse(requestComputers.response)

        if(requestComputers.status >= 200 && requestComputers.status < 400){
            for(let z = 0; z<2; z++){
                filteredArray.push(dataComputers.results[Math.floor(Math.random() * 21)])
            }
           
            setNextQuestion()
            
        }
        
    }
    
    requestComputers.send()
}

function artsAndCulture(){

    currentQuestionIndex = 0

    getLiterature()
    getFilms()
    getArt()
    getTheatre()
    getMusic()

}

function getLiterature(){
    
    var requestLiterature = new XMLHttpRequest()

    requestLiterature.open('GET', "https://opentdb.com/api.php?amount=22&category=10&difficulty=easy&type=multiple", true)

    requestLiterature.onload = function(){
       let dataLiterature = JSON.parse(requestLiterature.response)

        if(requestLiterature.status >= 200 && requestLiterature.status < 400){
            for(let i = 0; i<1; i++){
                filteredArray.push(dataLiterature.results[Math.floor(Math.random() * 23)])
            }
        }
    }

    requestLiterature.send()
}

function getFilms(){
    var requestFilms = new XMLHttpRequest()

    requestFilms.open('GET', "https://opentdb.com/api.php?amount=22&category=11&difficulty=easy&type=multiple", true)

    requestFilms.onload = function(){
       let dataFilms = JSON.parse(requestFilms.response)

        if(requestFilms.status >= 200 && requestFilms.status <400){
            for(let i = 0; i<1; i++){
                filteredArray.push(dataFilms.results[Math.floor(Math.random() * 23)])
            }
        }
    }
    requestFilms.send()
}

function getArt(){
    var artRequest = new XMLHttpRequest()

    artRequest.open('GET', 'https://opentdb.com/api.php?amount=7&category=25&difficulty=easy&type=multiple', true)

    artRequest.onload = function(){
        let artData = JSON.parse(artRequest.response)

        if(artRequest.status >= 200 && artRequest.status < 400){
            for(let i = 0; i < 1; i++){
                filteredArray.push(artData.results[Math.floor(Math.random() * 8)])
            }
        }
    }
    artRequest.send()

}

function getTheatre(){

    var theatreRequest = new XMLHttpRequest()

    theatreRequest.open('GET', 'https://opentdb.com/api.php?amount=7&category=13&difficulty=easy&type=multiple', true)

    theatreRequest.onload = function (){
        let theatreData = JSON.parse(theatreRequest.response)

        if(theatreRequest.status >= 200 && theatreRequest.status < 400){
            for(let i = 0; i < 1; i++){
                filteredArray.push(theatreData.results[Math.floor(Math.random() * 8)])
            }
        }
    }
    theatreRequest.send()
}

function getMusic(){

    var musicRequest = new XMLHttpRequest()

    musicRequest.open('GET', "https://opentdb.com/api.php?amount=22&category=12&difficulty=easy&type=multiple", true)

    musicRequest.onload = function (){
       let musicData = JSON.parse(musicRequest.response)

        if(musicRequest.status >= 200 && musicRequest.status < 400){
            for(let i = 0; i < 1; i++){
                filteredArray.push(musicData.results[Math.floor(Math.random() * 23)])
            }
        }
        setNextQuestion()
    }
    musicRequest.send()
}


function historyAndGeography(){
    

    currentQuestionIndex = 0

    getHistoryQuestions()
    getGeographyQuestions()
}

function getHistoryQuestions(){
    var historyRequest = new XMLHttpRequest()

    historyRequest.open('GET', "https://opentdb.com/api.php?amount=30&category=23&difficulty=easy&type=multiple", true)

    historyRequest.onload = function (){
       let historyData = JSON.parse(historyRequest.response)

        if(historyRequest.status >= 200 && historyRequest.status < 400){
            for(let i = 0; i < 3; i++){
                filteredArray.push(historyData.results[Math.floor(Math.random() * 31)])
            }
        }
    }
    historyRequest.send()
}

function getGeographyQuestions(){
    var geographyRequest = new XMLHttpRequest()

    geographyRequest.open("GET", "https://opentdb.com/api.php?amount=30&category=22&difficulty=easy&type=multiple", true)

    geographyRequest.onload = function (){
      let geogData = JSON.parse(geographyRequest.response)

        if(geographyRequest.status >= 200 && geographyRequest.status < 400){
            for(let i = 0; i < 2; i++){
                filteredArray.push(geogData.results[Math.floor(Math.random() * 31)])
            }
        }
        setNextQuestion()
    }

    geographyRequest.send()
}

function setNextQuestion(){
    resetState()
    console.log("next question set")
    if(currentQuestionIndex < filteredArray.length){
        showQuestion(filteredArray[currentQuestionIndex])
    } else {
        endGame()
    }
} //called from nextQuestion eventlistener, checks the amount of questions (5), and calls showQuestion until all questions have been completed.

function resetState(){
    nextQuestion.classList.add('hide')
    submitAnswer.classList.remove('hide')
    submitContainer.classList.add('hide')
    while (game_buttons.firstChild){
        game_buttons.removeChild(game_buttons.firstChild)
    } //removes game_button's child elements while they exist. 
} //resets actual question UI state, called further down, hence the need to move. 



function showQuestion(question){

    //API questions and contain specialcharacter values, function converts special characters i.e &380 to '
    const decodeHTML = html => {
        var txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
    }

    let questionText = decodeHTML(question.question)
    textElement.innerText = questionText
    let x = Math.floor(Math.random() * 4)
    let y = 0

    for(let i = 0; i < 4; i++){
        const newButton = document.createElement('button')
        
        //creates random order for answers if i doesn't = x add's wrong answers, when it does = x add's the correct answer
        if(i != x){
            let answerText = decodeHTML(question.incorrect_answers[y])
            newButton.innerText = answerText
            newButton.classList.add('answer_btn')
            newButton.addEventListener('click', selectAnswer)
            game_buttons.appendChild(newButton)
            console.log(y)
            y = y + 1 //y instead of i, as there are only 3 wrong answers, but 4 answers in total
        } else {
            let correctAnswer = decodeHTML(question.correct_answer)
            newButton.innerText = correctAnswer
            newButton.classList.add('answer_btn')
            newButton.addEventListener('click', selectAnswer)
            newButton.dataset.correct = true
            newButton.id = 'correct'
            game_buttons.appendChild(newButton)
        } 
    }  
} //creates question text for the next question, and creates answer buttons. 


function selectAnswer(e){
    const selectedButton = e.target
    Array.from(game_buttons.children).forEach(button => {
        setSelectStatus(button, selectedButton)
    }) //calls selectStatus based on which button was selected or targeted

    submit(selectedButton)
} //checks which answer is selected. 

function setSelectStatus(element, selectedButton){
clearStatus(element)
selectedButton.classList.add('selected')
} //sets the status of the button as selected

function clearStatus(element){
element.classList.remove('selected')
} //removes selected class from elements, when a new element is selected.


function submit(selectedButton){
    submitContainer.classList.remove('hide')
    
    if(selectedButton.dataset.correct){
        selectedButton.id = "correct"
        submitAnswer.removeEventListener('click', wrongAnswer)
        submitAnswer.addEventListener('click', correctAnswer)
    } else {
        submitAnswer.removeEventListener('click', correctAnswer)
        submitAnswer.addEventListener('click', wrongAnswer)
    }
} //checks if the selected answer is correct when submit is pressed, removes submit event listeners and adds based on if the dataset of the selected answer is correct or not.



function correctAnswer(){
    const correctAnswer = document.getElementById("correct")
    correctAnswer.classList.add('correct')
    quizScore++
    textElement.innerText = "Correct!"
    submitAnswer.classList.add('hide')
    nextQuestion.classList.remove('hide')
    
    showScore()
} //calls if answer is correct, changes UI to indicate it. 

function wrongAnswer(){
    
    textElement.innerText = 'That is not correct'
    game_buttons.firstChild.classList.remove('selected')
    const correctAnswer = document.getElementById('correct')
    correctAnswer.classList.add('correct')
    nextQuestion.classList.remove('hide')
    submitAnswer.classList.add('hide')
    
    showScore()
} // calls if answer is wrong, changes UI to indicate so.

function showScore(){
    
   let scoreContainerElement = document.getElementById('score_container')
   console.log(quizScore)
   scoreContainerElement.innerText = ('Score: ' + quizScore + '/' + (currentQuestionIndex + 1))
   scoreContainerElement.classList.remove('hide')
   
} //adapts the quiz score elements and updates it and shows it. 

//called when all questions have been cycled through
function endGame(){

    resetState()

    submitContainer.classList.remove('hide')
    submitAnswer.classList.add('hide')
    const endButton = document.createElement('button')
    let scoreContainerElement = document.getElementById('score_container')
    endButton.id = "saveData"
    endButton.innerText = 'Complete'
    endButton.classList.add('btn')
    submitContainer.appendChild(endButton)
    if(quizScore == 5){
        textElement.innerText = 'complete!'
    } else {
        textElement.innerText = 'Nice try!'
    } //checks if user got all questions correct.

    createFruit(quizScore)

    endButton.addEventListener('click', () => {
    closeQuiz()
    startQuiz()
    submitContainer.removeChild(endButton)
    if(!localStorage.level){
        localStorage.setItem('level', 1)
    } else {
        localStorage.level++
    } //checks if users has a level, sets if they don't, increases if they do. 
    
    console.log('local storage level is ' + localStorage.level) //remove

    quizScore = 0 
    currentQuestionIndex = 0
    filteredArray = []
    game_buttons.appendChild(optionOne)
    game_buttons.appendChild(optionTwo)
    game_buttons.appendChild(optionThree)
    game_buttons.appendChild(optionFour)
    scoreContainerElement.innerText = 0;
    scoreContainerElement.classList.add('hide')
    nextQuest()
    }) 
}//function resets the quiz ui and other elements like quizScore, the question index, and empties the array. Re-adds categories and hides the score, calls nextQuest.


function nextQuest(){
    const questElement = document.getElementById('quest_container')

    while(questElement.firstChild){
        questElement.removeChild(questElement.firstChild)
    }

    quests.forEach(quest => {
        if(quest.id == localStorage.level){
        const questView = document.createElement('div')
        questView.classList.add('quests')
        const newQuest = document.createElement('div')
        const beginQuizBtn = document.createElement('button')
        newQuest.innerText = quest.text
        beginQuizBtn.innerText = 'Begin quiz'
        beginQuiz.id = "begin_quiz"
        beginQuizBtn.addEventListener('click', openQuiz)
        newQuest.classList.add('flex')
        beginQuizBtn.classList.add('btn')
        beginQuizBtn.dataset.questvalue = quest.questValue
        questElement.append(questView)
        questView.append(newQuest, beginQuizBtn)
        }
    })

    saveData()
} //checks level and compares to quests values, adapts the quest ui to display the quests available based on level. 





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


/* money handler */



function firstSeed (){
    if(!localStorage.seeds_per_second){
        localStorage.setItem('seeds_per_second', 0)
    }
}


firstSeed()

function createFruit (quizScore){
    const newFruit = document.createElement('div')
    const fruitType = document.createElement('div')
    const valueView = document.createElement('div')
    const fruitsContainer = document.getElementById('fruits-container')
    const skillsContainer = document.getElementById('skills-container')
    fruits.forEach(fruit => {
        if(fruit.requiredValue == sessionStorage.quest){
            newFruit
            fruitType
            valueView
            fruitType.innerHTML = fruit.Fruit
            let fruitValue = fruit.value*quizScore
            valueView.innerHTML = fruitValue + ' seeds'
            newFruit.append(fruitType, valueView)
            newFruit.classList.add('fruit')
            fruitsContainer.append(newFruit)
            let seedsPerSecond = parseInt(localStorage.seeds_per_second)
            seedsPerSecond = seedsPerSecond + fruitValue
            localStorage.setItem(sessionStorage.quest, fruitValue)
            updateSeeds(seedsPerSecond)
           
        }
    })

    skills.forEach(skill =>{
        if(skill.requiredValue == sessionStorage.quest){
            newFruit
            fruitType
            valueView
            fruitType.innerHTML = skill.Skill
            let skillValue = skill.value*quizScore
            valueView.innerHTML = skillValue + ' seeds'
            newFruit.append(fruitType, valueView)
            newFruit.classList.add('fruit')
            skillsContainer.append(newFruit)
            let seedsPerSecond = parseInt(localStorage.seeds_per_second)
            seedsPerSecond = seedsPerSecond + skillValue
            localStorage.setItem(sessionStorage.quest, skillValue)
            updateSeeds(seedsPerSecond)
        }
    })
}

function updateSeeds (seedsPerSecond){
    const seedsPSElement = document.getElementById('seeds-per-second')
    seedsPSElement.innerHTML = seedsPerSecond
    localStorage.seeds_per_second = seedsPerSecond

    
}

var interval = setInterval(incrementSeeds, 1000)

function incrementSeeds(){
    if(!localStorage.totalSeeds){
        localStorage.setItem('totalSeeds', 0)
    }
    const totalSeeds = document.getElementById('total-seeds')
    let sPS = parseInt(localStorage.seeds_per_second)
    let totalSeedElement = parseInt(localStorage.totalSeeds)
    
    if(sPS > 0){
        totalSeedElement = totalSeedElement + sPS
        totalSeeds.innerHTML = totalSeedElement
        localStorage.totalSeeds = totalSeedElement
    }

    
}


const fruits = [
    {
        Fruit: 'lemon',
        value:  1,
        requiredValue: 'lemonFruit'
    },
    {
        Fruit: 'watermelon',
        value: 1,
        requiredValue: 'watermelon'
    }
] 

const skills = [
    {
        Skill: 'Lemonade',
        value: 2,
        requiredValue: 'Lemonade'
    }
]




