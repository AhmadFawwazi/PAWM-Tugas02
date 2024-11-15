// Menghitung suku ke-n untuk Deret Aritmatika
document.getElementById('aritmatika-form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const a = parseFloat(document.getElementById('a1').value);
  const d = parseFloat(document.getElementById('d').value);
  const n = parseInt(document.getElementById('n1').value);
  
  if (!isNaN(a) && !isNaN(d) && !isNaN(n)) {
    const un = a + (n - 1) * d;
    document.getElementById('aritmatika-result').textContent = `Suku ke-${n}: ${un}`;
  }
});

// Menghitung suku ke-n untuk Deret Geometri
document.getElementById('geometri-form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const a = parseFloat(document.getElementById('a2').value);
  const r = parseFloat(document.getElementById('r').value);
  const n = parseInt(document.getElementById('n2').value);
  
  if (!isNaN(a) && !isNaN(r) && !isNaN(n)) {
    const un = a * Math.pow(r, n - 1);
    document.getElementById('geometri-result').textContent = `Suku ke-${n}: ${un}`;
  }
});

// Array untuk menyimpan soal dan jawaban
const soalList = [
  { soal: "Soal 1: Suku pertama deret aritmatika adalah 3 dan selisihnya adalah 5. Berapa suku ke-4?", jawaban: 18 },
  { soal: "Soal 2: Suku pertama deret geometri adalah 2 dan rasio adalah 3. Berapa suku ke-3?", jawaban: 18 },
  { soal: "Soal 3: Apa suku ke-5 dari deret aritmatika dengan suku pertama 10 dan selisih 2?", jawaban: 18 },
  { soal: "Soal 4: Suku pertama deret aritmatika adalah 7 dan selisihnya adalah 4. Berapa suku ke-6?", jawaban: 27 },
  { soal: "Soal 5: Suku pertama deret geometri adalah 5 dan rasionya adalah 2. Berapa suku ke-4?", jawaban: 40 },
  { soal: "Soal 6: Deret aritmatika memiliki suku pertama 8 dan selisih 3. Berapa jumlah 5 suku pertamanya?", jawaban: 35 },
  { soal: "Soal 7: Suku pertama deret geometri adalah 3 dan rasionya 4. Berapa suku ke-3?", jawaban: 48 },
  { soal: "Soal 8: Deret aritmatika memiliki suku pertama 4 dan selisih 5. Berapa suku ke-8?", jawaban: 39 },
  { soal: "Soal 9: Suku pertama deret geometri adalah 2 dan rasionya 5. Berapa suku ke-4?", jawaban: 250 },
  { soal: "Soal 10: Deret aritmatika dengan suku pertama 15 dan selisih -3. Berapa suku ke-6?", jawaban: 0 },
  { soal: "Soal 11: Deret geometri memiliki suku pertama 2 dan rasionya 3. Berapa suku ke-5?", jawaban: 162 },
  { soal: "Soal 12: Jumlah 7 suku pertama dari deret aritmatika dengan suku pertama 3 dan selisih 2 adalah?", jawaban: 42 },
  { soal: "Soal 13: Deret geometri dengan suku pertama 5 dan rasionya 3. Berapa suku ke-6?", jawaban: 1215 },
  { soal: "Soal 14: Deret aritmatika memiliki suku pertama -2 dan selisih 6. Berapa suku ke-7?", jawaban: 34 },
  { soal: "Soal 15: Suku pertama deret geometri adalah 8 dan rasio 2. Berapa suku ke-5?", jawaban: 128 },
  { soal: "Soal 16: Jumlah 10 suku pertama dari deret aritmatika dengan suku pertama 1 dan selisih 3 adalah?", jawaban: 145 },
  { soal: "Soal 17: Deret geometri dengan suku pertama 3 dan rasio 2. Berapa suku ke-8?", jawaban: 384 },
  { soal: "Soal 18: Berapa suku ke-10 dari deret aritmatika dengan suku pertama 12 dan selisih -4?", jawaban: -24 },
  { soal: "Soal 19: Deret geometri memiliki suku pertama 3 dan rasio 3. Berapa suku ke-5?", jawaban: 243 },
  { soal: "Soal 20: Jumlah 6 suku pertama dari deret aritmatika dengan suku pertama -3 dan selisih 4 adalah?", jawaban: 42 },
  { soal: "Soal 21: Deret aritmatika memiliki suku pertama 9 dan selisih -2. Berapa suku ke-15?", jawaban: -19 },
  { soal: "Soal 22: Deret geometri memiliki suku pertama 3 dan rasionya 2. Berapa suku ke-6?", jawaban: 96 },
  { soal: "Soal 23: Deret aritmatika memiliki suku pertama -5 dan selisih 7. Berapa suku ke-12?", jawaban: 72 },
  { soal: "Soal 24: Jumlah 8 suku pertama dari deret geometri dengan suku pertama 2 dan rasio 2 adalah?", jawaban: 510 },
  { soal: "Soal 25: Deret aritmatika memiliki suku pertama 11 dan selisih -5. Berapa suku ke-20?", jawaban: -84 },
  { soal: "Soal 26: Deret geometri memiliki suku pertama 2 dan rasio 3. Berapa suku ke-7?", jawaban: 1458 },
  { soal: "Soal 27: Jumlah 15 suku pertama dari deret aritmatika dengan suku pertama 6 dan selisih 2 adalah?", jawaban: 255 },
  { soal: "Soal 28: Deret geometri memiliki suku pertama 3 dan rasio 2. Berapa suku ke-10?", jawaban: 1536 },
  { soal: "Soal 29: Deret aritmatika memiliki suku pertama 10 dan selisih -3. Berapa suku ke-30?", jawaban: -77 },
  { soal: "Soal 30: Jumlah 12 suku pertama dari deret geometri dengan suku pertama 1 dan rasio 2 adalah?", jawaban: 4095 },
  { soal: "Soal 31: Deret aritmatika memiliki suku pertama -10 dan selisih 7. Berapa suku ke-25?", jawaban: 158 },
  { soal: "Soal 32: Deret geometri memiliki suku pertama 4 dan rasio 2. Berapa suku ke-10?", jawaban: 2048 },
  { soal: "Soal 33: Deret aritmatika dengan suku pertama 20 dan selisih -4. Berapa suku ke-40?", jawaban: -136 },
  { soal: "Soal 34: Jumlah 15 suku pertama dari deret geometri dengan suku pertama 2 dan rasio 2 adalah?", jawaban: 65534 },
  { soal: "Soal 35: Deret aritmatika memiliki suku pertama 18 dan selisih -6. Berapa suku ke-50?", jawaban: -282 },
  { soal: "Soal 36: Deret geometri memiliki suku pertama 5 dan rasio 3. Berapa suku ke-9?", jawaban: 98415 },
  { soal: "Soal 37: Deret aritmatika dengan suku pertama -3 dan selisih 5. Berapa suku ke-100?", jawaban: 492 },
  { soal: "Soal 38: Jumlah 20 suku pertama dari deret geometri dengan suku pertama 1 dan rasio 2 adalah?", jawaban: 1048575 },
  { soal: "Soal 39: Deret aritmatika dengan suku pertama 25 dan selisih -2. Berapa suku ke-200?", jawaban: -373 },
  { soal: "Soal 40: Jumlah 10 suku pertama dari deret geometri dengan suku pertama 3 dan rasio 2 adalah?", jawaban: 3069 }
];



let currentSoalIndex = 0; 

// Fungsi untuk menampilkan soal
function tampilkanSoal() {
  const soalElement = document.getElementById('soal');
  soalElement.textContent = soalList[currentSoalIndex].soal;
}

// Fungsi untuk mengecek jawaban
function cekJawaban() {
  const jawabanInput = document.getElementById('jawaban').value;
  const feedbackElement = document.getElementById('feedback');

  if (parseInt(jawabanInput) === soalList[currentSoalIndex].jawaban) {
    feedbackElement.textContent = "Jawaban Anda benar! Selamat!";
    currentSoalIndex++;
    if (currentSoalIndex < soalList.length) {
      tampilkanSoal(); 
      document.getElementById('jawaban').value = ''; 
    } else {
      feedbackElement.textContent += " Anda telah menyelesaikan semua soal!";
      document.getElementById('cek-jawaban').disabled = true; 
    }
  } else {
    feedbackElement.textContent = "Jawaban Anda salah. Coba lagi!";
  }
}


document.getElementById('cek-jawaban').addEventListener('click', cekJawaban);


window.onload = tampilkanSoal;

