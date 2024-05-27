import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBVvZa4lWspp6H9lFKN6xvI_CGnCrhHMj8",
  authDomain: "alexsoft-442a0.firebaseapp.com",
  projectId: "alexsoft-442a0",
  storageBucket: "alexsoft-442a0.appspot.com",
  messagingSenderId: "191631423497",
  appId: "1:191631423497:web:70b1ce7e56c276647ee0d8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const authLink = document.getElementById("auth");
const myPage = document.getElementById("myPage");

//Запуск функции на проверку авторизован пользователь или нет
onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  if (loggedInUserId) {
    console.log(user);
    authLink.style.display = "none";
    myPage.style.display = "block";

  }
  else {
    console.log("User Id not Found in Local storage")
    authLink.style.display = "block";
    myPage.style.display = "none";
  }
})
