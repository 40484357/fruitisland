/* first page */

const startButton = document.getElementById('start-btn')

const continueButton = document.getElementById('continue-btn')

const textElement = document.getElementById('storyline_text')

startButton.addEventListener('click', startWelcome)

checkAccess()
let welcomeIndex = 1;

function checkAccess(){
    if(!localStorage.visited){
        localStorage.setItem('visited', true)
    } else {
        window.location.replace("file:///D:/quizgame/fruitisland/maingame.html")
    }
}

function startWelcome(){
    
       
        welcomeIndex++
        
        if(welcomeIndex <= welcomeNodes.length){
            nextNode(welcomeIndex)
        } else{
            startButton.classList.add('hide')
            continueButton.classList.remove('hide')
        }
}

function nextNode(){
    const welcomeNode = welcomeNodes.find(welcomeNode => welcomeNode.id === welcomeIndex)
    textElement.innerText = welcomeNode.text
}


const welcomeNodes = [
    {
        text: "Capitalism burned the world, so we're a socailist state... kind of. Everything is shared except fruit. Fruit is a luxury, one of our main sources of sugar but it's fairly scarce.",
        id: 1
    },
    {
        text: "See, fruits allow us to do many things: add variety to our foods, make alcohol, make sweet drinks, etc. You can sell fruits or fruit-based products for seeds. I'll start you off, here's some lemon seeds.",
        id: 2
    },
    {
        text: "Oh sorry, of course you won't know how to grow these, don't worry I'll teach you how things work.",
        id: 3
    },
    {
        text: "You can grow fruits by answering a five question quiz. The more questions you answer correctly, the more fruit you will earn. Once you’ve obtained fruits, you can complete more quizzes to learn the skills needed to make fruit-based products. ",
        id: 4
    },
    {
        text: "So, when you're ready, let's get started!",
        id: 5
    }


]


                     