import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start');
const daysEl = document.querySelector('[data-days');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let intervalId;

let selectedTime;

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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

function updateTimerValues(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates <= Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      selectedTime = selectedDates.getTime();
    }
  },
});

btnStart.addEventListener('click', evt => {
  const selectedDate = new Date(datetimePicker.value);
  if (selectedDate > Date.now()) {
    evt.target.disabled = false;

    Notiflix.Notify.success('The timer has started');
    evt.target.disabled = true;
    clearInterval(intervalId);
  }

  btnStart.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const remainingTime = selectedDate - currentTime;

    if (remainingTime <= 0) {
      Notiflix.Notify.info('Time is up');
      clearInterval(intervalId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    updateTimerValues(days, hours, minutes, seconds);
  }, 1000);
});
