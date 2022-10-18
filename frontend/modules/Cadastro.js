import validator from "validator";

export default class Cadastro {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const el = e.target;
      let error = false;
      const emailInput = el.querySelector('input[name="email"]');
      const email = document.querySelector(".msg-email-cadastro");
      email.innerHTML = " ";

      if (!validator.isEmail(emailInput.value)) {
        email.classList.add("alert-danger");
        email.innerHTML = "E-mail inválido!";
        error = true;
      }

      const passwordInput = el.querySelector('input[name="password"]');
      const password = document.querySelector(".msg-password-cadastro");
      password.innerHTML = " ";

      if (passwordInput.value.length < 8) {
        password.classList.add("alert-danger");
        password.innerHTML = "Senha precisa ter no minímo 8 caracteres.";
        error = true;
      }
      if (!error) el.submit();
    });
  }



}
