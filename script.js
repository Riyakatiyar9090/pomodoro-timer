let workTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = workTime;
let isWork = true;
let isRunning = false;
let timerInterval;

const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");
const alertSound = document.getElementById("alertSound");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
  modeDisplay.textContent = isWork ? "Work" : "Break";
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      alertSound.play();
      isWork = !isWork;
      timeLeft = isWork ? workTime : breakTime;
      alert(isWork ? "Back to Work! 💻" : "Take a Break! ☕");
      updateDisplay();
      startTimer();
    }
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  isWork = true;
  timeLeft = workTime;
  updateDisplay();
}

updateDisplay();

document.getElementById("darkModeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.innerHTML = `<span>${taskText}</span> <button onclick="completeTask(this)">✔️</button>`;
  document.getElementById("taskList").appendChild(li);
  input.value = "";
  updateProgress();
}

function completeTask(btn) {
  const li = btn.parentElement;
  li.classList.toggle("completed");
  updateProgress();
}

function updateProgress() {
  const tasks = document.querySelectorAll("#taskList li");
  const completed = document.querySelectorAll("#taskList li.completed");
  const percent = tasks.length ? (completed.length / tasks.length) * 100 : 0;
  document.getElementById("progressBar").style.width = percent + "%";
}
