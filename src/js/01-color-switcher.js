const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function start() {
  btnStart.disabled = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stop() {
  btnStart.disabled = false;
  clearInterval(intervalId);
}

btnStart.addEventListener('click', start);
btnStop.addEventListener('click', stop);
