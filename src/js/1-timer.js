import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast/dist/js/iziToast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const timerFields = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

let userSelectedDate;
let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (Date.now() > userSelectedDate) {
      iziToast.warning({
        title: "Error",
        message: "Please choose a date in the future",
      });
      startButton.classList.add("button-start-unactive");
      startButton.classList.remove("button-start-hover-efect");
    } else {
      startButton.classList.remove("button-start-unactive");
      startButton.classList.add("button-start-hover-efect");
      startButton.classList.add("button-start");
    }
  },
};

flatpickr(input, options);

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

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

function startCountdown() {
  const currentTime = Date.now();
  const timeDifference = userSelectedDate - currentTime;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    startButton.classList.add("disabled");
  } else {
    const timeRemaining = convertMs(timeDifference);
    updateTimerInterface(timeRemaining);
  }
}

startButton.addEventListener("click", () => {
  countdownInterval = setInterval(startCountdown, 1000);
  startButton.classList.add("disabled");
});