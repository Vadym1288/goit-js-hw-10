import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const delayInput = document.querySelector('input[name="delay"]');
    const delay = parseInt(delayInput.value, 10);
    const stateInputs = document.querySelectorAll('input[name="state"]');
    let selectedState;
    stateInputs.forEach(input => {
      if (input.checked) {
        selectedState = input.value;
      }
    });
    const promise = new Promise((resolve, reject) => {
      if (selectedState === 'fulfilled') {
        setTimeout(() => resolve(delay), delay);
      } else {
        setTimeout(() => reject(delay), delay);
      }
    });
    promise.then(
      (result) => {
        iziToast.success({
          title: 'Fulfilled promise',
          message: `✅ Fulfilled promise in ${result}ms`,
        });
      },
      (error) => {
        iziToast.error({
          title: 'Rejected promise',
          message: `❌ Rejected promise in ${error}ms`,
        });
      }
    );
  });
});