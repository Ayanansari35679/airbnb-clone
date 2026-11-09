
(() => {
  'use strict';

  console.log("Validation script loaded!");

  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[data-bs-validate]');

    console.log("Forms found:", forms.length);

    for (const form of forms) {
      form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      });
    }
  });
})();
