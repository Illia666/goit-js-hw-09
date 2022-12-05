// Write a script that, after clicking the "Start" button, changes the <body> background color once a second to a random value using the inline style. When clicking on the "Stop" button, background color change must stop.

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  class Timer {
    constructor(onTick, delay) {
      this.interval = null;
      this.onTick = onTick;
      this.delay = delay;
    }
  
    startTimer() {
      if (!this.interval) {
        this.interval = setInterval(this.onTick, this.delay);
      }
    }
  
    stopTimer() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  }
  
  const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.body,
  };
  
  const setBodyRandColor = () => {
    refs.body.style.backgroundColor = getRandomHexColor();
  };
  
  let timer = new Timer(setBodyRandColor, 1000);
  
  refs.start.addEventListener('click', timer.startTimer.bind(timer));
  refs.stop.addEventListener('click', timer.stopTimer.bind(timer));
