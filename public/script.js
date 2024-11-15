// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCrn_5-iXrlMqt36fvLDnJ6FJfBPQ_PDks",
  authDomain: "auth-derago.firebaseapp.com",
  databaseURL: "https://auth-derago-default-rtdb.firebaseio.com",
  projectId: "auth-derago",
  storageBucket: "auth-derago.firebasestorage.app",
  messagingSenderId: "499415292914",
  appId: "1:499415292914:web:e2a20c36a36186ed0ea96b"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Debugging inisialisasi
console.log("Firebase telah diinisialisasi.");

// Mendapatkan elemen tombol dari DOM
let buttonSignup = document.getElementById("button_signup");
let buttonSignin = document.getElementById("button_signin");

// Handler untuk Sign Up
buttonSignup.addEventListener("click", async (e) => {
  e.preventDefault(); // Mencegah pengiriman form secara default
  let name = document.getElementById("name").value;
  let nohp = document.getElementById("nohp").value;
  let emailSignup = document.getElementById("email_signup").value;
  let passwordSignup = document.getElementById("psw_signup").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, emailSignup, passwordSignup);
    const user = userCredential.user;

    await set(ref(database, "users/" + user.uid), {
      name: name,
      nohp: nohp,
      email: emailSignup
    });

    alert("Pengguna berhasil ditambahkan.");
    console.log("Sign up berhasil:", user);
  } catch (error) {
    console.error("Error saat Sign Up:", error);
    alert(error.message);
  }
});

// Handler untuk Sign In
buttonSignin.addEventListener("click", async (e) => {
  e.preventDefault(); // Mencegah pengiriman form secara default
  let emailSignin = document.getElementById("email_signin").value;
  let passwordSignin = document.getElementById("psw_signin").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, emailSignin, passwordSignin);
    const user = userCredential.user;

    let lgDate = new Date();
    await update(ref(database, "users/" + user.uid), {
      last_login: lgDate
    });

    console.log("User berhasil login:", user);
    location.href = "/auth/derago.html"; // Redirect ke halaman utama
  } catch (error) {
    console.error("Error saat Sign In:", error);
    alert(error.message);
  }
});

// Debugging tambahan untuk log status pengguna
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Pengguna saat ini:", user);
  } else {
    console.log("Tidak ada pengguna yang sedang login.");
  }
});
