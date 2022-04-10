// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, doc, getDoc, setDoc, updateDoc, query, where } from "firebase/firestore";
import { getAnalytics, setUserId } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

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

const addUser = document.querySelector('.add')

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














