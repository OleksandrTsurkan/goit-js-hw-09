// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const inputRef = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysRef = document.querySelector("[data-days]");
const hoursRef = document.querySelector("[data-hours]");
const minutesRef = document.querySelector("[data-minutes]");
const secondsRef = document.querySelector("[data-seconds]");

let intervalId = null;

// Функція для перевірки часу
function checkTime(date) {
  const currentDate = new Date();
  return date > currentDate;
}

// Функція для оновлення таймера
function updateTimer(date) {
  const time = date - new Date();
  if (time < 0) {
    clearInterval(intervalId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(time);
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

// Функція для перевірки та оновлення кнопки Start
function updateStartButton() {
  const selectedDate = new Date(inputRef.value);
  if (checkTime(selectedDate)) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
  }
}

// Функція для запуску таймера
function startTimer() {
  const selectedDate = new Date(inputRef.value);
  if (!checkTime(selectedDate)) {
    alert("Please choose a date in the future");
    return;
  }

  intervalId = setInterval(() => {
    updateTimer(selectedDate);
  }, 1000);

  startBtn.disabled = true;
  inputRef.disabled = true;
}

// Функція для зупинки таймера
function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;

  inputRef.disabled = false;
  startBtn.disabled = false;

  daysRef.textContent = "00";
  hoursRef.textContent = "00";
  minutesRef.textContent = "00";
  secondsRef.textContent = "00";
}

// Функція для перетворення мілісекунд в дні, години, хвилини і секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для додавання 0 перед числами менше 10
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// Ініціалізація flatpickr
flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    updateStartButton(selectedDate);
  },
});

// Додавання слухачів подій
startBtn.addEventListener("click", startTimer);
document.querySelector("[data-stop]").addEventListener("click", stopTimer);