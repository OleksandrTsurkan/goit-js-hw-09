import Notiflix from 'notiflix';

// Get the form
const form = document.querySelector('.form');

// Add a submit event handler for the form
form.addEventListener('submit', function (event) {
  event.preventDefault(); 

// Get the values of the form fields
  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  // Call the function to create promises
  createPromises(delay, step, amount);
});
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); 
      } else {
        reject({ position, delay }); 
      }
    }, delay);
  });
}
function createPromises(delay, step, amount) {
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }
}