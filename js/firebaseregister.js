//Импорт основных библиотек из firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"



//Ключи подключения к firebsase
const firebaseConfig = {
  apiKey: "AIzaSyBVvZa4lWspp6H9lFKN6xvI_CGnCrhHMj8",
  authDomain: "alexsoft-442a0.firebaseapp.com",
  projectId: "alexsoft-442a0",
  storageBucket: "alexsoft-442a0.appspot.com",
  messagingSenderId: "191631423497",
  appId: "1:191631423497:web:70b1ce7e56c276647ee0d8"
};

// инициализация firebase
const app = initializeApp(firebaseConfig);


//Функция показа сообщения
function showMessage(message, divId) {
   var messageDiv = document.getElementById(divId);
   messageDiv.style.display = "block";
   messageDiv.innerHTML = message;
   messageDiv.style.opacity = 1;
   setTimeout(function() {
    messageDiv.style.opacity = 0
   }, 5000);
}

//Получение ссылки на кнопку регистрации
const signUp = document.getElementById("signUpBtn");

//Обработчик события нажатия на кнопку регистрации
signUp.addEventListener("click", (event) => {
  event.preventDefault()
  const email = document.getElementById("email-3b9a").value
  const username = document.getElementById("login-3b9a").value
  const name = document.getElementById("name-3b9a").value
  const surname = document.getElementById("surname-3b9a").value
  const patronymic = document.getElementById("pat-3b9a").value
  const password = document.getElementById("pass-3b9a").value

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password).then((userCredential)=> {
    const user = userCredential.user;
    const userData = {
      email: email,
      username: username,
      name: name,
      surname: surname,
      patronymic: patronymic
    };
    showMessage('Вы успешно зарегистрировались', 'signUpMessage');
    const docRef = doc(db, "users", user.uid);
    setDoc(docRef, userData).then(() => {
      window.location.href = 'Авторизация.html';
    })
    .catch((error) => {
      console.error('error', error);
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    if(errorCode == 'auth/email-already-in-use') {
      showMessage('Пользователь с таким email уже существует', 'signUpMessage');
    } else {
      showMessage('Что-то пошло не так', 'signUpMessage');
    }
  })
})



