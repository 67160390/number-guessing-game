// filepath: script.js
// ตัวแปรเก็บตัวเลขลับ
let secretNumber = 0;
// ตัวแปรนับจํานวนครั้งที่ทาย
let attemptCount = 0;
// ฟังก์ชันเริ่มเกมใหม่
function initializeGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptCount = 0;
  document.getElementById("guessInput").disabled = false; // ปลดล็อค input
  // document.getElementById("guessBtn").disabled = false; // ถ้ามี id นี้ให้ปลดล็อคด้วย
  updateDisplay();
  startTimer(); // <--- เพิ่มบรรทัดนี้เพื่อให้เวลาเริ่มเดิน
}
// ฟังก์ชันตรวจสอบการทาย
function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guessValue = parseInt(guessInput.value);
  const resultContainer = document.getElementById("resultContainer");
  // ... validation code ...
  if (isNaN(guessValue) || guessInput.value === "") {
    resultContainer.innerHTML = `
 <div class="alert alert-danger" role="alert">
 กรุณาใส่ตัวเลข!
 </div>
 `;
    return;
  }
  // Validation: ตรวจสอบว่าอยู่ในช่วง 1-100 หรือไม่
  if (guessValue < 1 || guessValue > 100) {
    resultContainer.innerHTML = `
 <div class="alert alert-danger" role="alert">
 กรุณาใส่ตัวเลขระหว่าง 1 ถึง 100!
 </div>
 `;
    return;
  }
  attemptCount++;
  if (guessValue === secretNumber) {
    clearInterval(timerInterval); // หยุดเวลาเมื่อทายถูก
    resultContainer.innerHTML = `
 <div class="alert alert-success" role="alert">
 <h5>✓ ถูกต้อง!</h5>
 <p>คุณทายถูกในครั้งที่ ${attemptCount}</p>
 </div>
 `;
  } else if (guessValue > secretNumber) {
    resultContainer.innerHTML = `
 <div class="alert alert-warning" role="alert">
 ↓ ตัวเลขสูงไป
 </div>
 `;
  } else {
    resultContainer.innerHTML = `
 <div class="alert alert-info" role="alert">
 ↑ ตัวเลขตํ่าไป
 </div>
 `;
  }
  updateDisplay();
  guessInput.value = "";
  guessInput.focus();
}
// ฟังก์ชันอัปเดตจํานวนครั้ง
function updateDisplay() {
  const attemptsContainer = document.getElementById("attemptsContainer");
  attemptsContainer.textContent = `ทายแล้ว: ${attemptCount} ครั้ง`;
}
// ฟังก์ชันเริ่มเกมใหม่
function resetGame() {
  initializeGame();
  document.getElementById("resultContainer").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}
// เริ่มเกมเมื่อโหลดหน้า
window.addEventListener("load", initializeGame);
// เพิ่มการ select text เมื่อคลิก input
document.addEventListener("DOMContentLoaded", function () {
  const guessInput = document.getElementById("guessInput");
  guessInput.addEventListener("focus", function () {
    this.select();
  });
});
// เพิ่มการรองรับ Enter key
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("guessInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        checkGuess();
      }
    });
});
// ตั้งเวลาไว้ 30 วินาที
let timeLeft = 30;
let timerInterval;

function startTimer() {
  clearInterval(timerInterval); // เคลียร์ตัวจับเวลาเดิม (ถ้ามี)
  timeLeft = 30;
  document.getElementById("timer").innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver(); // ฟังก์ชันที่เรียกเมื่อเวลาหมด
    }
  }, 1000);
}

function gameOver() {
  document.getElementById("guessInput").disabled = true; // ห้ามพิมพ์ต่อ
  document.getElementById("guessBtn").disabled = true; // ห้ามกดปุ่มทาย
  alert("หมดเวลาแล้ว! คุณแพ้แล้วครับ");
}

// ในฟังก์ชันที่คุณเช็คว่า "ทายถูก" อย่าลืมใส่:
// clearInterval(timerInterval); เพื่อหยุดเวลาเมื่อชนะ
