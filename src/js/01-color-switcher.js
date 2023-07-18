
const startBtn = document.querySelector(".data-start");
const stopBtn = document.querySelector(".data-stop");
const changeColorBody = document.querySelector("body");
let timerId = null;

stopBtn.disabled = true;

const getRandomHexColor = () => {
    let colorChange = Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0);
    changeColorBody.style.backgroundColor = `#${colorChange}`;
  }

  function onClick () {
    timerId = setInterval(getRandomHexColor, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  };

 startBtn.addEventListener("click", onClick);

 function onRemoveClick() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

 stopBtn.addEventListener("click", onRemoveClick);