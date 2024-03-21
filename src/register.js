// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, doc, getDoc, setDoc, updateDoc, query, where } from "firebase/firestore";
import { getAnalytics, setUserId } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

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


// Initialize Firebase
const app = initializeApp(firebaseConfig);


//initialise services
const db = getFirestore(app);
const auth = getAuth(app)

//collection reference
const colRef = collection(db, 'userdata')

//get data

getDocs(colRef)
  .then((snapshot) => {
    let userdata = []

    snapshot.docs.forEach((doc) => {
      userdata.push({...doc.data(), id: doc.id})
    })

    console.log(userdata)
  })
  .catch(err => {
    console.log(err.message)
  })

//add user

let userId = "";

const addUser = document.querySelector('.register')

addUser.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const username = addUser.username.value
  const email = addUser.email.value
  const password = addUser.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created: ', cred.user.uid)
      localStorage.setItem('uid', cred.user.uid)
      localStorage.setItem('username', username)
      userId = cred.user.uid

      window.location.replace("maingame.html") //fix
      }
    )
})



//switch functionality

const loginSwitch = document.getElementById("switch_login")
const registerSwitch = document.getElementById("switch_register")
const registerForm = document.getElementById("register_form")
const loginForm = document.getElementById("login_form")

loginSwitch.addEventListener('click', () =>{
    
    // loginSwitch.style.backgroundColor = "#5fd47e"
    // registerSwitch.style.backgroundColor ="#d8ebdd"
    // registerSwitch.style.zIndex ="0"
    // loginSwitch.style.zIndex ="1"

    loginSwitch.classList.toggle('active')
    registerSwitch.classList.toggle('active')
    
    loginForm.classList.remove('hide')
    registerForm.classList.add('hide')
    
})

registerSwitch.addEventListener('click', () =>{
  registerForm.classList.remove('hide')
  loginForm.classList.add('hide')
  // registerSwitch.style.backgroundColor = "#5fd47e"
  // loginSwitch.style.backgroundColor = "#d8ebdd"
  // loginSwitch.style.zIndex = "0"
  // registerSwitch.style.zIndex = "1"
  loginSwitch.classList.toggle('active')
  registerSwitch.classList.toggle('active')
})


//login form

const login_form = document.querySelector('.login_form')

login_form.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = login_form.email.value
  const password = login_form.password.value
  const username = login_form.username.value
  
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      localStorage.setItem('uid', cred.user.uid)
      localStorage.setItem('username', username)
      let userId = cred.user.uid
      localStorage.setItem('logIn', true)

      loadData(userId)
    })
})


function loadData(userId){
    getDoc(doc(colRef, userId))
        .then((doc) => {
         let docTime = doc.data().timestamp
         let localTime = localStorage.timestamp
         let localTimeInt = parseInt(localTime)
         let docTimeInt = parseInt(docTime)

         if(localTime == null || localTimeInt < docTimeInt){
            localStorage.setItem("level", doc.data().level)
            localStorage.setItem("correctAnswers", doc.data().correctAnswers) 
            localStorage.setItem("lemonFruit", doc.data().lemonFruit)
            localStorage.setItem("seeds_per_second", doc.data().seeds_per_second)
            localStorage.setItem("questions", doc.data().questions) 
            localStorage.setItem("totalSeeds", doc.data().totalSeeds) 
            localStorage.setItem("tutorialState", doc.data().tutorialState) 
            localStorage.setItem("username", doc.data().username) 
            localStorage.setItem('apple', doc.data().apples) 
            localStorage.setItem('banana', doc.data().banana) 
            localStorage.setItem('Lemonade', doc.data().lemonade) 
            localStorage.setItem('Toffee Apples', doc.data().toffeeApples) 
            localStorage.setItem('Banana Bread', doc.data().bananaBread)
            localStorage.setItem('currentProfile', doc.data().currentProfile)
            localStorage.setItem('lemon_profile.svg', doc.data().lemon_profile)
            localStorage.setItem('crabapple.svg', doc.data().crab_profile)
            localStorage.setItem('elon_muskmelon.svg', doc.data().musk_profile)
            localStorage.setItem('bill_dates.svg', doc.data().bill_profile)
            localStorage.setItem('mark_zucchini.svg', doc.data().mark_profile)
            localStorage.setItem('che_guavera.svg', doc.data().che_profile)
            localStorage.setItem('islandName', doc.data().islandName)
         }
         window.location.href = "maingame.html"
        })
 
}






