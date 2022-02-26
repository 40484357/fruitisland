const startButton = document.getElementById('start-btn')

const continueButton = document.getElementById('continue-btn')


startButton.addEventListener('click', startGame)


function startGame(){
    document.getElementById("storyline_text").innerHTML = "Oh sorry, ofcourse you won't know how to grow these, don't worry I'll teach you but here are how things work. <br><br> Consider any teachings Fruits of Knowledge or Skills. To develop skills you'll go through a 5 question quiz, the better you do in the quiz the better your skill rating. <br><br> Your rating can make your products 5 times more valuable, so let me know when you're ready"
    startButton.classList.add('hide')
    continueButton.classList.remove('hide')
}


