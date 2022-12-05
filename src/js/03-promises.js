// Write a script that, when submitting the form, calls the createPromise(position, delay) function as many times as you entered in the amount field. On each call, pass it the number of the promise to be created (position) and the delay given the first delay (delay) and step (step) entered by the user.

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

console.log(refs);

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const {
    delay: { value: delay },
    step: { value: step },
    amount: { value: amount },
  } = e.currentTarget.elements;
  console.log(delay, step, amount);

  //exec(delay, step, amount));
  simplePromises(parseInt(delay), parseInt(step), parseInt(amount));
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

// async function exec(delay, step, amount) {
//   for (let i = 1; i <= amount; i += 1) {
//     const innerDel = i === 1 ? delay : step;
//     try {
//       let res = await createPromise(i, delay).onResolve(res);
//     } catch (err) {
//       onReject(err);
//     }
//   }
// }

function simplePromises(delay, step, amount) {
  for (let i = 1, innerDelay = delay; i <= amount; i += 1, innerDelay += step) {
    createPromise(i, innerDelay).then(onResolve).catch(onReject);
  }
}

function onResolve({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}