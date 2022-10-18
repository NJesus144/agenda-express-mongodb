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

      const nameInput = el.querySelector('input[name="nome"]');
      const emailInput = el.querySelector('input[name="email"]');
      const name = el.querySelector(".name-register");
      const email = document.querySelector(".email-register");

      name.innerHTML = "";
      email.innerHTML = " ";

      let error = false;

      if (!nameInput.value) {
        name.classList.add("alert-danger");
        name.innerHTML = "Nome é um campo obrigatório.";
        error = true;
      }

      if (!validator.isEmail(emailInput.value)) {
        email.classList.add("alert-danger");
        email.innerHTML = "E-mail inválido!";
        error = true;
      }


      if (!error) el.submit();
    });
  }
}
