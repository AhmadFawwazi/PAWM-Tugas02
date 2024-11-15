import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrn_5-iXrlMqt36fvLDnJ6FJfBPQ_PDks",
  authDomain: "auth-derago.firebaseapp.com",
  databaseURL: "https://auth-derago-default-rtdb.firebaseio.com",
  projectId: "auth-derago",
  storageBucket: "auth-derago.firebasestorage.app",
  messagingSenderId: "499415292914",
  appId: "1:499415292914:web:e2a20c36a36186ed0ea96b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function loadUserProfile(userId) {
  const db = getDatabase(app);
  const userRef = ref(db, 'users/' + userId);
  const highScoreRef = ref(db, 'quizResults/' + userId + '/highScore');

  // Mengambil data pengguna (nama, email, nohp)
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      document.getElementById('user-name').innerText = userData.name || '-';
      document.getElementById('user-email').innerText = userData.email || '-';
      document.getElementById('user-phone').innerText = userData.nohp || '-';
    } else {
      console.log("No user data found.");
    }
  }).catch((error) => {
    console.error("Error loading user data:", error);
  });

  // Mengambil high score dari hasil quiz
  get(highScoreRef).then((snapshot) => {
    if (snapshot.exists()) {
      const highScore = snapshot.val();
      document.getElementById('user-high-score').innerText = highScore;
    } else {
      console.log("No high score found.");
    }
  }).catch((error) => {
    console.error("Error loading high score:", error);
  });
}

// Cek apakah ada pengguna yang sedang login
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadUserProfile(user.uid);
  } else {
    window.location.href = "/root/index.html";
  }
});

function handleLogout() {
  signOut(auth).then(() => {
    window.location.href = "/root/index.html";
  }).catch((error) => {
    console.error("Error during logout:", error);
  });
}

// Event listener untuk tombol logout
document.getElementById('logout-button').addEventListener('click', handleLogout);
