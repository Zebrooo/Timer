const createTimerAnimator = () => {
  let timerInterval = null;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  const timerEl = document.getElementById("timerEl");

  return (totalSeconds) => {
    clearInterval(timerInterval);
    seconds = totalSeconds % 60;
    minutes = Math.floor(totalSeconds / 60) % 60;
    hours = Math.floor(totalSeconds / 3600);
    timerInterval = setInterval(() => {
      seconds--;
      if (seconds < 0) {
        minutes--;
        seconds = 59;
      }
      if (minutes < 0) {
        hours--;
        minutes = 59;
      }
      if (hours < 0) {
        clearInterval(timerInterval);
        timerEl.innerHTML = "00:00:00";
      } else {
        timerEl.innerHTML = `${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }:${seconds < 10 ? "0" + seconds : seconds}`;
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

const inputEl = document.getElementById("inputEl");
inputEl.addEventListener("input", () => {
  inputEl.value = inputEl.value.replace(/\D/g, ""); // очищаем input от всего кроме цифр
});

const buttonEl = document.getElementById("buttonEl");
buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  inputEl.value = "";
});
