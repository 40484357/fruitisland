/*database initialisation, and functionality for ingame -- includes saveData !important function */

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


if(userId != null && localStorage.logIn == null){
    setDoc(doc(colRef, userId), {uid: userId})
}

var interval = setInterval(saveData, 100000)

function saveData(){
    if(userId != null && localStorage.lemonFruit == null){
    updateDoc(doc(colRef, userId), {
        username: localStorage.username,
        level: localStorage.level,
        totalSeeds: localStorage.totalSeeds,
        seeds_per_second: localStorage.seeds_per_second,
        tutorialState: true,
        visited: true,
        timestamp: localStorage.timestamp
    })} else if (userId != null && localStorage.Lemonade == null){
        updateDoc(doc(colRef, userId), {
            username: localStorage.username,
            level: localStorage.level,
            totalSeeds: localStorage.totalSeeds,
            seeds_per_second: localStorage.seeds_per_second,
            tutorialState: true,
            visited: true,
            lemonFruit: localStorage.lemonFruit,
            timestamp: localStorage.timestamp,
            questions: localStorage.questions,
            answers: localStorage.correctAnswers
        })
    } else if (userId != null && localStorage.apple == null){
        updateDoc(doc(colRef, userId), {
            username: localStorage.username,
            level: localStorage.level,
            totalSeeds: localStorage.totalSeeds,
            seeds_per_second: localStorage.seeds_per_second,
            tutorialState: true,
            visited: true,
            lemonFruit: localStorage.lemonFruit,
            lemonade: localStorage.Lemonade,
            timestamp: localStorage.timestamp,
            questions: localStorage.questions,
            answers: localStorage.correctAnswers
        })
    } else if (userId != null && localStorage.getItem('Toffee Apples') == null){
        updateDoc(doc(colRef, userId), {
            username: localStorage.username,
            level: localStorage.level,
            totalSeeds: localStorage.totalSeeds,
            seeds_per_second: localStorage.seeds_per_second,
            tutorialState: true,
            visited: true,
            lemonFruit: localStorage.lemonFruit,
            lemonade: localStorage.Lemonade,
            apples: localStorage.apple,
            timestamp: localStorage.timestamp,
            questions: localStorage.questions,
            answers: localStorage.correctAnswers
        })
    } else if (userId != null && localStorage.banana == null){
        updateDoc(doc(colRef, userId), {
            username: localStorage.username,
            level: localStorage.level,
            totalSeeds: localStorage.totalSeeds,
            seeds_per_second: localStorage.seeds_per_second,
            tutorialState: true,
            visited: true,
            lemonFruit: localStorage.lemonFruit,
            lemonade: localStorage.Lemonade,
            apples: localStorage.apple,
            toffeeApples: localStorage.getItem('Toffee Apples'),
            timestamp: localStorage.timestamp,
            questions: localStorage.questions,
            answers: localStorage.correctAnswers
        })
    } else if (userId != null && localStorage.getItem('Banana Bread') == null){
        updateDoc(doc(colRef, userId), {
            username: localStorage.username,
            level: localStorage.level,
            totalSeeds: localStorage.totalSeeds,
            seeds_per_second: localStorage.seeds_per_second,
            tutorialState: true,
            visited: true,
            lemonFruit: localStorage.lemonFruit,
            lemonade: localStorage.Lemonade,
            apples: localStorage.apple,
            toffeeApples: localStorage.getItem('Toffee Apples'),
            banana: localStorage.banana,
            timestamp: localStorage.timestamp,
            questions: localStorage.questions,
            answers: localStorage.correctAnswers
        })
    } else if (userId != null ){
        updateDoc(doc(colRef, userId), {
            username: localStorage.username,
            level: localStorage.level,
            totalSeeds: localStorage.totalSeeds,
            seeds_per_second: localStorage.seeds_per_second,
            tutorialState: true,
            visited: true,
            lemonFruit: localStorage.lemonFruit,
            lemonade: localStorage.Lemonade,
            apples: localStorage.apple,
            toffeeApples: localStorage.getItem('Toffee Apples'),
            banana: localStorage.banana,
            bananaBread: localStorage.getItem('Banana Bread'),
            timestamp: localStorage.timestamp,
            questions: localStorage.questions,
            answers: localStorage.correctAnswers
        })
    }

  console.log('data saved')
} //saves users game data

/*end of database functionality */


/*in game arrays */

const fruits = [
    {
        Fruit: 'lemon',
        value:  1,
        requiredValue: 'lemonFruit',
        color: '#dee64e',
        achievement: 'lemonFruitAch'
    },
    {
        Fruit: 'apple',
        value: 1.1,
        requiredValue: 'apple',
        color: '#8dbf47',
        achievement: 'appleAch'
    },
    {
        Fruit: 'banana',
        value: 1.2,
        requiredValue: 'banana',
        color: '#c6c959',
        achievement: 'bananaAch'
    }

] 

const skills = [
    {
        Skill: 'Lemonade',
        value: 2,
        requiredValue: 'Lemonade',
        color: "#fff07d",
        achievement: 'LemonadeAch'
    },
    {
        Skill: 'Toffee Apples',
        value: 2.1,
        requiredValue: 'Toffee Apples',
        color: "#d5ff82",
        achievement: 'ToffeeAppleAch'
    },
    {
        Skill: 'Banana Bread',
        value: 2.2,
        requiredValue: 'Banana Bread',
        color: "#d9d289",
        achievement: 'bananaBreadAch'
    }
]

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

/* in game important variables */

const beginQuiz = document.getElementById('begin_quiz')
const showQuiz = document.getElementById('quiz_ui')
const textElement = document.getElementById('text')
const nextQuestion = document.getElementById('next_question')
const submitAnswer = document.getElementById('submit_answer')
const submitContainer = document.getElementById('submit-and-next')
const close = document.getElementById('close')
const closeOptions = document.getElementById('close_options')
const allQuests = document.getElementById('quests')

const optionsElement = document.getElementById('options')
const optionsUI = document.getElementById('optionsUI')

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
// let answerCorrect = false
let tutorialIndex = 1

/*end of in game important variables */


/* gameload handler */

const seedsPS = document.getElementById('seeds-per-second')
const totalSeedsItem = document.getElementById('total-seeds')
const fruitsContainer = document.getElementById('fruits-container')
const skillsContainer = document.getElementById('skills-container')
const userContainer = document.getElementById('user')

const gameLoadFruits = [
    {
        Fruit: 'lemon',
        levelRequired: 0,
        requiredValue: 'lemonFruit',
        color: '#dee64e',
        value: 1
    },
    {
        Fruit: 'apple',
        levelRequired: 2,
        requiredValue: 'apple',
        color: '#8dbf47',
        value: 1.1
    },
    {
        Fruit: 'banana',
        levelRequired: 4,
        requiredValue: 'banana',
        color: '#c6c959',
        value: 1.2
    }
] 

const gameLoadSkills = [
    {
        Skill: 'Lemonade',
        levelRequired: 1,
        requiredValue: 'Lemonade',
        color: "#fff07d",
        value: 2
    },
    {
        Skill: 'Toffee Apples',
        levelRequired: 3,
        requiredValue: 'Toffee Apples',
        color: "#d5ff82",
        value: 2.1
    },
    {
        Skill: 'Banana Bread',
        levelRequired: 5,
        requiredValue: 'Banana Bread',
        color: "#d9d289",
        value: 2.2
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
        questValue: 'Banana Bread'
    }
]
 
function onGameLoad(){

    seedsPS.innerText = localStorage.seeds_per_second
    totalSeedsItem.innerText = localStorage.totalSeeds

    gameLoadFruits.forEach(fruit =>{

        let fruitRequired = fruit.requiredValue
        let fruitName = fruit.Fruit
        let fruitColor = fruit.color
        let value = fruit.value


        loadFruitItem(fruitRequired, fruitName, fruitColor, value)
    })

    gameLoadSkills.forEach(skill =>{
        let skillRequired = skill.requiredValue
        let skillName = skill.Skill
        let skillColor = skill.color
        let skillValue = skill.value
        
        loadSkillItem(skillRequired, skillName, skillColor, skillValue)
    })

    if(localStorage.getItem('username') != null){
        userContainer.innerHTML = localStorage.getItem('username')
    } else {
        let genUser = Math.floor(Math.random() * 150)
        userContainer.innerHTML = 'Guest#' + genUser
        localStorage.setItem('username', 'Guest#' + genUser)
    }

    if(localStorage.level > 0){
        nextQuest()
    }



    checkAchievements()
}

function loadFruitItem(fruitRequired, fruitName, fruitColor, value){
    const newFruit = document.createElement('div')
    const fruitType = document.createElement('div')
    const valueView = document.createElement('div')


    if(localStorage.getItem(fruitRequired) > 0){
        newFruit
        fruitType
        valueView
        fruitType.innerHTML = fruitName
        let fruitValue = localStorage.getItem(fruitRequired)
        let maxValue = Math.round((value * 5) * 100) / 100
        valueView.innerHTML = fruitValue + '/' + maxValue + ' sps'
        newFruit.style.backgroundColor = fruitColor
        newFruit.style.color = '#000000'
        newFruit.style.fontWeight = 600
        newFruit.append(fruitType, valueView)
        newFruit.classList.add('fruit')
        newFruit.id = fruitRequired
        newFruit.dataset.questvalue = fruitRequired
        fruitType.dataset.questvalue = fruitRequired
        valueView.dataset.questvalue = fruitRequired
        if(fruitValue/value < 5){
            newFruit.classList.add('hover')
            newFruit.addEventListener('click', openQuiz)
        }


        fruitsContainer.append(newFruit)
    }

    
}

function loadSkillItem(skillRequired, skillName, skillColor, skillValue){
    const newSkill = document.createElement('div')
    const skillType = document.createElement('div')
    const valueView = document.createElement('div')

    if(localStorage.getItem(skillRequired) > 0){
        newSkill
        skillType
        valueView

        skillType.innerHTML = skillName
        let skillSeeds = localStorage.getItem(skillRequired)
        let maxValue = Math.round((skillValue * 5) * 100)/100
        valueView.innerHTML = skillSeeds + '/' + maxValue + ' sps'
        newSkill.style.backgroundColor = skillColor
        newSkill.style.color = "#000000"
        newSkill.style.fontWeight = 600
        newSkill.append(skillType, valueView)
        newSkill.classList.add('fruit')
        skillsContainer.append(newSkill)
        newSkill.dataset.questvalue = skillRequired
        skillType.dataset.questvalue = sessionStorage.quest
        skillType.dataset.questvalue = skillRequired
        valueView.dataset.questvalue = skillRequired
        newSkill.id = skillRequired
        if(skillSeeds/skillValue < 5){
            newSkill.classList.add('hover')
            newSkill.addEventListener('click', openQuiz)
        }
    }
}

onGameLoad()


/* end of gameload handler */




/* maingame script */

function setGameState(){
    if(!localStorage.tutorialState){
        localStorage.setItem('tutorialState', 1)
    }
} //sets the users tutorial state if this is their first interaction with the game

setGameState()

beginQuiz.addEventListener('click', openQuiz)

close.addEventListener('click', closeUI)

closeOptions.addEventListener('click', closeUI)

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



function closeUI(){
    showQuiz.classList.add('hide')
    showQuiz.classList.remove('flex')
    allQuests.classList.remove('hide')
    allQuests.classList.add('quest_container')
    optionsUI.classList.add('hide')
    optionsUI.classList.remove('flex')
    
} //closes the opened UI



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


/* question generators */

let currentQuestionIndex
let filteredArray = []


function generalKnowledge(){

    
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

//creates stem questions
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
                let rNum = Math.floor(Math.random() * 20)
                filteredArray.push(dataScience.results[rNum])
                console.log("rNum science is " + rNum)
            }
        } else {console.log('error')}
        console.log(dataScience)
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
                let rNum = Math.floor(Math.random() * 8)

                filteredArray.push(dataMaths.results[rNum])
                console.log("rNum maths is " + rNum)
            }
        }
        console.log(dataMaths)
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
                let rNum = Math.floor(Math.random() * 20)
                filteredArray.push(dataComputers.results[rNum])
                console.log("rNum comp is " + rNum)
            }
           
            setNextQuestion()
            
        }
        console.log(dataComputers)
    }
    
    
    requestComputers.send()
}

//creates arts and culture questions
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
                filteredArray.push(dataLiterature.results[Math.floor(Math.random() * 21)])
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
                filteredArray.push(dataFilms.results[Math.floor(Math.random() * 21)])
            }
        }
        console.log(" at films")
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
                filteredArray.push(artData.results[Math.floor(Math.random() * 6)])
            }
        }
        console.log(" at art")
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
                filteredArray.push(theatreData.results[Math.floor(Math.random() * 6)])
                
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
                filteredArray.push(musicData.results[Math.floor(Math.random() * 21)])
            }
        }
        
        setNextQuestion()
        console.log(" at music")
    }
    musicRequest.send()
}

//creates History and Geography questions

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
                filteredArray.push(historyData.results[Math.floor(Math.random() * 29)])
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
                filteredArray.push(geogData.results[Math.floor(Math.random() * 29)])
            }
        }
        setNextQuestion()
    }

    geographyRequest.send()
}

/* end of question generators */


/* Quiz UI and contents generator starts*/

function setNextQuestion(){
    resetState()
    console.log("next question set")
    if(currentQuestionIndex < 5){
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


/* quiz UI and contents generator ends */


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

    let currentQuest = sessionStorage.quest

    if(!localStorage.level){
        localStorage.setItem('level', 1)
    } else {
            localStorage.level++
    } //checks if users has a level, sets if they don't, increases if they do. 
    

    if(!localStorage.questions){
        localStorage.setItem('questions', 5)
    } else {
        let totalQuestions = parseInt(localStorage.getItem('questions'))
        totalQuestions = totalQuestions + 5
        localStorage.setItem('questions', totalQuestions)
    }

    if(!localStorage.correctAnswers){
        localStorage.setItem('correctAnswers', quizScore)
    } else {
        let totalAnswers = parseInt(localStorage.getItem('correctAnswers'))
        totalAnswers = totalAnswers + quizScore
        localStorage.setItem('correctAnswers', totalAnswers)
    }

    endButton.addEventListener('click', () => {
    closeUI()
    startQuiz()
    saveData()
    submitContainer.removeChild(endButton)

    currentQuestionIndex = 0
    filteredArray = []
    game_buttons.appendChild(optionOne)
    game_buttons.appendChild(optionTwo)
    game_buttons.appendChild(optionThree)
    game_buttons.appendChild(optionFour)
    scoreContainerElement.innerText = 0;
    scoreContainerElement.classList.add('hide')

    if(localStorage.getItem(currentQuest) != null){
        console.log('called improve fruit')
        improveFruit(quizScore)
        localStorage.level--
        console.log(localStorage.level)
        checkAchievements()
    } else {
        console.log('called createFruit')
        createFruit(quizScore)
        nextQuest()
        checkAchievements()}
    }) 
    
  
}//function resets the quiz ui and other elements like quizScore, the question index, and empties the array. Re-adds categories and hides the score, calls nextQuest.


/* quest handler, generates quests, and displays them */

function nextQuest(){

    quizScore = 0 
    
    
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

    if(localStorage.level > 5){
            const questView = document.createElement('div')
            questView.classList.add('quests')
            const newQuest = document.createElement('div')
            const beginQuizBtn = document.createElement('button')
            newQuest.innerText = 'More fruits coming soon! improve your skills or play for fun'
            beginQuizBtn.innerText = 'Begin quiz'
            beginQuiz.id = "begin_quiz"
            beginQuizBtn.addEventListener('click', openQuiz)
            newQuest.classList.add('flex')
            beginQuizBtn.classList.add('btn')
            questElement.append(questView)
            questView.append(newQuest, beginQuizBtn)
    }

    
} //checks level and compares to quests values, adapts the quest ui to display the quests available based on level. 




/* Seeds handler. Generates the seeds, stores them and displays them. */

/* This section also creates fruit and skill elements for their respective panels. These elements are used to update the users earnings (or seeds) per second
which is used to update their total seeds  */

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
    
    if(quizScore < 1){
        quizScore = quizScore + 1
    }

    fruits.forEach(fruit => {
        if(fruit.requiredValue == sessionStorage.quest){
            newFruit
            fruitType
            valueView
            fruitType.innerHTML = fruit.Fruit
            let fruitValue = Math.round((fruit.value*quizScore) * 100) / 100
            let maxValue = Math.round((fruit.value * 5) * 100) /100
            valueView.innerHTML = fruitValue + '/' + maxValue + ' sps'
            valueView.dataset.value = fruitValue
            newFruit.append(fruitType, valueView)
            newFruit.style.backgroundColor = fruit.color
            newFruit.style.color = "#000000"
            newFruit.style.fontWeight = 600
            newFruit.classList.add('fruit')
            newFruit.dataset.fruitValue = fruit.value
            newFruit.dataset.questvalue = sessionStorage.quest
            fruitType.dataset.questvalue = sessionStorage.quest
            valueView.dataset.questvalue = sessionStorage.quest
            newFruit.id = sessionStorage.quest
            fruitsContainer.append(newFruit)
            let seedsPerSecond = parseInt(localStorage.seeds_per_second)
            seedsPerSecond = seedsPerSecond + fruitValue
            localStorage.setItem(sessionStorage.quest, fruitValue)
            updateSeeds(seedsPerSecond)

            console.log('fruit value is ' + fruitValue)
           
            if(quizScore < 5){
                newFruit.classList.add('hover')
                newFruit.addEventListener('click', openQuiz)
            }
        }
    })

   

    skills.forEach(skill =>{
        if(skill.requiredValue == sessionStorage.quest){
            newFruit
            fruitType
            valueView
            fruitType.innerHTML = skill.Skill
            let skillValue = Math.round((skill.value*quizScore) * 100) / 100
            let maxValue = Math.round((skill.value * 5) * 100) /100
            valueView.innerHTML = skillValue + '/' + maxValue + ' sps'
            newFruit.append(fruitType, valueView)
            newFruit.style.backgroundColor = skill.color
            newFruit.style.color = "#000000"
            newFruit.style.fontWeight = 600
            newFruit.dataset.questvalue = sessionStorage.quest
            newFruit.id = sessionStorage.quest
            fruitType.dataset.questvalue = sessionStorage.quest
            valueView.dataset.questvalue = sessionStorage.quest
            newFruit.classList.add('fruit')
            skillsContainer.append(newFruit)
            let seedsPerSecond = parseInt(localStorage.seeds_per_second)
            seedsPerSecond = seedsPerSecond + skillValue
            localStorage.setItem(sessionStorage.quest, skillValue)
            updateSeeds(seedsPerSecond)

            if(quizScore < 5){
                newFruit.classList.add('hover')
                newFruit.addEventListener('click', openQuiz)
            }
        }
    })


    
} //creates fruit !AND skill elements

function improveFruit(quiz_score){

    let currentQuest = sessionStorage.quest
    
    let currentFruit = document.getElementById(currentQuest)
    
    let valueView = currentFruit.childNodes[1]

    
    let fruitValue; 
    
    fruits.forEach(fruit => {
        if(fruit.requiredValue == currentQuest){
            fruitValue = fruit.value
        }
    })

    skills.forEach(skill => {
        if(skill.requiredValue == currentQuest){
            fruitValue = skill.value 
        }
    })

    let newEarnings = Math.round((fruitValue * quiz_score) * 100) /100

    let currentEarnings = parseInt(localStorage.getItem(currentQuest))

    
    if(currentEarnings < newEarnings){
        let maxValue = fruitValue * 5

        valueView.innerHTML = newEarnings + '/' + maxValue + ' sps'
        let seedsPerSecond = parseInt(localStorage.seeds_per_second)
        let increasedSeeds = newEarnings - currentEarnings

        localStorage.setItem(currentQuest, newEarnings)

        seedsPerSecond = seedsPerSecond + increasedSeeds
        updateSeeds(seedsPerSecond)

    }

    if(quizScore == 5){
        currentFruit.removeEventListener
    }

    quizScore = 0
    


} //improves fruit !AND skill elements

function updateSeeds (seedsPerSecond){
    const seedsPSElement = document.getElementById('seeds-per-second')
    seedsPSElement.innerHTML = seedsPerSecond
    localStorage.seeds_per_second = seedsPerSecond
}

var interval = setInterval(incrementSeeds, 1000)

function incrementSeeds(){
    var timeStamp = new Date().getTime()
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
        localStorage.setItem("timestamp", JSON.stringify(timeStamp))
        document.title = localStorage.totalSeeds + ' seeds'
    }
}


/* End of seeds and fruit/skill ui handler */


/* options UI functions */

const user_name = document.getElementById('user_name')
const island_name = document.getElementById('island_name')

optionsElement.addEventListener('click', () => {
    
    optionsUI.classList.remove('hide')
    optionsUI.classList.add('flex')

}) //opens settings UI

const userUpdate = document.getElementById('userUpdate')

const islandUpdate = document.getElementById('islandUpdate')

userUpdate.addEventListener('click', () => {
    
    let userSeeds = parseInt(localStorage.totalSeeds)
    if(userSeeds >= 100000){
        const newUserName = user_name.value
        localStorage.setItem('username', newUserName)
        userSeeds = userSeeds - 100000
        localStorage.totalSeeds = userSeeds
        userContainer.innerHTML = newUserName
    } else {
        window.alert("not enough seeds")
    }
})

islandUpdate.addEventListener('click', () => {
    let userSeeds = parseInt(localStorage.totalSeeds)
    if( userSeeds >= 1000000){
        const newIslandName = island_name.value
        const islandsName = document.getElementById('islands_name')
        islandsName.innerHTML = newIslandName
        userSeeds = userSeeds - 1000000
        localStorage.totalSeeds = userSeeds
    } else {
        window.alert("not enough seeds")
    }
})


/* achievements */

function checkAchievements(){

    const achievementContainer = document.getElementById('main_ach_cont')

    fruits.forEach(fruit =>{
        let maxValue = fruit.value * 5
        let reqFruit = fruit.requiredValue
        let currFruitVal = parseFloat(localStorage.getItem(reqFruit))
        let currAchievement = fruit.achievement

        if(currFruitVal == maxValue){
           
            let achievement = document.getElementById(currAchievement)

            achievement.classList.remove('hide')
            achievement.classList.add('toolTip')

            achievementContainer.classList.remove('hide')

        }
        
    })

    skills.forEach(skill => {
        let maxValue = skill.value * 5
        let reqSkill = skill.requiredValue
        let currSkillval = parseFloat(localStorage.getItem(reqSkill))
        let currAchievement = skill.achievement

        if(currSkillval == maxValue){
            
            let achievement = document.getElementById(currAchievement)
            achievement.classList.remove('hide')
            achievement.classList.add('toolTip')
            achievementContainer.classList.remove('hide')
        }
    })
}





