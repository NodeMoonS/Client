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

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();


//Запуск функции на проверку пользователя и отображения его данных
onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  if (loggedInUserId) {
    console.log(user);
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if(userData) {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('userName').innerText = userData.name;
            document.getElementById('userSurname').innerText = userData.surname;
            document.getElementById('userPatr').innerText = userData.patronymic;
            document.getElementById('userEmail').innerText = userData.email;
          }
          else {
            document.getElementById('loading').style.display = 'block';
          }


        }
        else {
          console.log("no document found matching id")
        }
      })
      .catch((error) => {
        console.log("Error getting document");
      })
  }
  else {
    console.log("User Id not Found in Local storage")
  }
})


//Получение ссылки на кнопку Выход
const logoutButton = document.getElementById('logOut');

//Обработчик события нажатия на кнопку регистрации
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
    .then(() => {
      window.location.href = 'Авторизация.html';
    })
    .catch((error) => {
      console.error('Error Signing out:', error);
    })
})