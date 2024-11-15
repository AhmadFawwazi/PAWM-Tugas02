import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const db = getDatabase(app);

const startButton = document.getElementById('start');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const timeElement = document.getElementById('time');

let currentQuestionIndex = 0;
let score = 0;
let highScore = 0;
let timeLeft = 6000;
let timer;
let userId = null;

// Daftar pertanyaan
const questions = [
    // Existing questions 1-5 here...
    
    {
        question: 'Q6: In a geometric sequence, the first term is 3 and the common ratio is 2. What is the 4th term?',
        answers: [
            { text: '12', correct: false },
            { text: '24', correct: true },
            { text: '18', correct: false },
            { text: '48', correct: false }
        ]
    },
    {
        question: 'Q7: What is the formula for the sum of the first n terms in an arithmetic sequence?',
        answers: [
            { text: 'S_n = n/2 * (a + l)', correct: true },
            { text: 'S_n = a + (n - 1)d', correct: false },
            { text: 'S_n = a * r^(n-1)', correct: false },
            { text: 'S_n = a + l', correct: false }
        ]
    },
    {
        question: 'Q8: In a geometric sequence, if the first term is 5 and the common ratio is 3, what is the 3rd term?',
        answers: [
            { text: '15', correct: false },
            { text: '45', correct: true },
            { text: '30', correct: false },
            { text: '60', correct: false }
        ]
    },
    {
        question: 'Q9: The sum of an infinite geometric series is 16, and the first term is 8. What is the common ratio?',
        answers: [
            { text: '0.5', correct: true },
            { text: '2', correct: false },
            { text: '0.25', correct: false },
            { text: '1', correct: false }
        ]
    },
    {
        question: 'Q10: If the 5th term of an arithmetic sequence is 20 and the common difference is 3, what is the first term?',
        answers: [
            { text: '5', correct: false },
            { text: '8', correct: true },
            { text: '10', correct: false },
            { text: '15', correct: false }
        ]
    },
    {
        question: 'Q11: What is the sum of the first 8 terms of an arithmetic sequence where the first term is 4 and the common difference is 5?',
        answers: [
            { text: '120', correct: false },
            { text: '132', correct: true },
            { text: '128', correct: false },
            { text: '140', correct: false }
        ]
    },
    {
        question: 'Q12: In an arithmetic sequence, if the first term is 10 and the last term is 50 with 6 terms, what is the common difference?',
        answers: [
            { text: '8', correct: false },
            { text: '10', correct: false },
            { text: '5', correct: true },
            { text: '12', correct: false }
        ]
    },
    {
        question: 'Q13: The first term of a geometric sequence is 2 and the common ratio is 3. What is the 5th term?',
        answers: [
            { text: '54', correct: true },
            { text: '36', correct: false },
            { text: '72', correct: false },
            { text: '18', correct: false }
        ]
    },
    {
        question: 'Q14: The sum of the first 4 terms of a geometric sequence is 30. If the first term is 2, what is the common ratio?',
        answers: [
            { text: '2', correct: false },
            { text: '3', correct: true },
            { text: '4', correct: false },
            { text: '5', correct: false }
        ]
    },
    {
        question: 'Q15: In an arithmetic sequence, if the first term is 1 and the common difference is 6, what is the sum of the first 10 terms?',
        answers: [
            { text: '280', correct: false },
            { text: '300', correct: true },
            { text: '320', correct: false },
            { text: '330', correct: false }
        ]
    },
    {
        question: 'Q16: If the first term of a geometric sequence is 10 and the common ratio is 0.5, what is the 6th term?',
        answers: [
            { text: '0.625', correct: true },
            { text: '1.25', correct: false },
            { text: '2.5', correct: false },
            { text: '5', correct: false }
        ]
    },
    {
        question: 'Q17: The sum of the first 5 terms of an arithmetic sequence is 40. If the first term is 4, what is the common difference?',
        answers: [
            { text: '1.5', correct: true },
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '5', correct: false }
        ]
    },
    {
        question: 'Q18: In a geometric sequence, if the sum of the first 4 terms is 30 and the first term is 6, what is the common ratio?',
        answers: [
            { text: '0.5', correct: false },
            { text: '2', correct: true },
            { text: '1.5', correct: false },
            { text: '3', correct: false }
        ]
    },
    {
        question: 'Q19: The 10th term of an arithmetic sequence is 45, and the common difference is 5. What is the first term?',
        answers: [
            { text: '10', correct: false },
            { text: '5', correct: false },
            { text: '0', correct: true },
            { text: '15', correct: false }
        ]
    },
    {
        question: 'Q20: What is the formula for the sum of the first n terms of a geometric sequence?',
        answers: [
            { text: 'S_n = a(1 - r^n) / (1 - r)', correct: true },
            { text: 'S_n = a + (n - 1)d', correct: false },
            { text: 'S_n = a * r^(n-1)', correct: false },
            { text: 'S_n = n/2 * (a + l)', correct: false }
        ]
    }
];


// Simpan skor ke Firebase
function saveQuizResultToDatabase(score, highScore, timeSpent) {
    if (!userId) return; // Pastikan userId tersedia

    set(ref(db, 'quizResults/' + userId), {
        score: score,
        highScore: highScore,
        timeSpent: timeSpent,
        timestamp: new Date().toISOString()
    })
    .then(() => {
        console.log("Quiz result saved successfully.");
    })
    .catch((error) => {
        console.error("Error saving quiz result:", error);
    });
}

// Muat high score dari Firebase
function loadHighScore() {
    if (!userId) return; // Pastikan userId tersedia
    const highScoreRef = ref(db, 'quizResults/' + userId + '/highScore');

    get(highScoreRef).then((snapshot) => {
        if (snapshot.exists()) {
            highScore = snapshot.val();
            highScoreElement.innerText = highScore;
        } else {
            console.log("No high score available.");
        }
    }).catch((error) => {
        console.error("Error loading high score:", error);
    });
}

// Memulai game
function startGame() {
    startButton.classList.add('hide');
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 6000;
    scoreElement.innerText = score;
    timeElement.innerText = timeLeft;
    timer = setInterval(updateTime, 1000);
    showQuestion();
}

// Menampilkan pertanyaan
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach((answer, index) => {
        const button = answerButtons[index];
        button.innerText = answer.text;
        button.dataset.correct = answer.correct;
        button.classList.remove('correct', 'wrong');
        button.addEventListener('click', selectAnswer);
    });
}

// Mengatur ulang tombol jawaban
function resetState() {
    answerButtons.forEach(button => {
        button.removeEventListener('click', selectAnswer);
    });
}

// Memilih jawaban
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
        scoreElement.innerText = score;
    }
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        endGame();
    }
}

// Memperbarui waktu
function updateTime() {
    timeLeft--;
    timeElement.innerText = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}

// Mengakhiri game
function endGame() {
    clearInterval(timer);

    document.querySelector('.game-content').classList.add('hidden');
    const endScreen = document.getElementById('end-screen');
    endScreen.classList.remove('hidden');

    const timeSpent = 6000 - timeLeft;
    document.getElementById('final-score').innerText = score;
    document.getElementById('final-time').innerText = timeSpent;

    if (score > highScore) {
        highScore = score;
        highScoreElement.innerText = highScore;
        document.getElementById('final-high-score').innerText = highScore;
        saveQuizResultToDatabase(score, highScore, timeSpent);
    } else {
        document.getElementById('final-high-score').innerText = highScore;
    }
}

// Autentikasi Firebase untuk mendapatkan userId
onAuthStateChanged(auth, (user) => {
    if (user) {
        userId = user.uid; // Tetapkan userId pengguna yang sedang login
        loadHighScore(); // Panggil fungsi untuk memuat high score
    } else {
        window.location.href = "index.html"; // Arahkan ke halaman login jika tidak ada pengguna
    }
});

// Event listener untuk tombol mulai
startButton.addEventListener('click', startGame);
