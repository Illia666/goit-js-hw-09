// Write a timer script that counts down to a specific date. Such a timer can be used in blogs and online stores, event-logging pages, during maintenance, etc. Watch a demo video of the timer.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Class MyTimer
class MyTimer {
  /**   *
   * @delay {number} -milliseconds between action
   * @onTick {function({days, hours, seconds})} - action
   *
   */
  constructor(delay, onTick) {
    this.futureDate = 0;
    this.delay = delay;
    this.onTick = onTick;
    this.onBeforeStart = onBeforeStart;

    this.interval = null;
    this.isActive = false;
    this.time = 0;
  }

  checkFutureDate() {
    const isRightDate = this.futureDate.getTime() > Date.now();
    return isRightDate;
  }

  setFutureDate(futureDate) {
    this.futureDate = futureDate;
  }
  /**
   *
   * @returns promise if timer started resolve else reject
   */
  onstart() {
    if (!this.checkFutureDate) {
      return Promise.reject('check time');
    }
    this.time = this.futureDate.getTime() - Date.now();

    if (!this.isActive) {
      this.isActive = true;
      this.interval = setInterval(() => {
        this.onChangeTime();
        const obj = this.convertMs(this.time);
        this.onTick(obj);
      }, this.delay);
      return Promise.resolve('ok');
    }
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  onChangeTime() {
    if (this.time > this.delay) {
      this.time -= this.delay;
    } else {
      this.time = 0;
      clearInterval(this.interval);
      this.isActive = false;
      this.interval = null;
    }
  }

  setTime() {
    this.onTick(this.convertMs(this.time));
  }
}

// global variables
const timer = new MyTimer(1000, onSetCurrentTime);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onSetFutureDate(selectedDates[0]);
    timer.setFutureDate(selectedDates[0]);
    refs.btnStart.disabled = !timer.checkFutureDate();
  },
};

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  lDays: document.querySelector('[ data-days]'),
  lHours: document.querySelector('[data-hours]'),
  lMinutes: document.querySelector('[data-minutes]'),
  lSeconds: document.querySelector('[data-seconds]'),
};

// Interface

function onBeforeStart() {
  refs.btnStart.disabled = true;
}

function onSetFutureDate(fDate) {
  timer.setFutureDate(fDate);
  if (!timer.checkFutureDate()) {
    refs.btnStart.disabled = true;
    Notify.failure('Please choose a date in the future ');
    return;
  }
  refs.btnStart.disabled = false;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onSetCurrentTime({ days, hours, minutes, seconds }) {
  refs.lDays.innerHTML = addLeadingZero(days);
  refs.lHours.innerHTML = addLeadingZero(hours);
  refs.lMinutes.innerHTML = addLeadingZero(minutes);
  refs.lSeconds.innerHTML = addLeadingZero(seconds);
}

refs.btnStart.addEventListener('click', () => {
  timer.onstart().then(mes => {
    onBeforeStart();
  });
});

flatpickr('#datetime-picker', options);
refs.btnStart.disabled = true;