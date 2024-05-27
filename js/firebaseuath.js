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

//Получение ссылки на кнопку Авторизации
const signIn = document.getElementById("signInBtn");


//Обработчик события нажатия на кнопку авторизации
signIn.addEventListener("click", (event) => {
   event.preventDefault();
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;

   const auth = getAuth();

   signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    showMessage('Вы успешно авторизовались', 'signInMessage')
     const user = userCredential.user;
     localStorage.setItem('loggedInUserId', user.uid);
     window.location.href = 'Пользователь.html';
   })
   .catch((error) => {
     const errorCode = error.code;
     if(errorCode == 'auth/invalid-credential') {
       showMessage('Неверный пароль или Email', 'signInMessage');
     } else {
       showMessage('Что-то пошло не так', 'signInMessage');
     }
     console.error('error', error);
   })
});

