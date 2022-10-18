const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const loginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const loginModel = mongoose.model("login", loginSchema);

class login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valida();
    if (this.errors.length > 0) return;
    this.user = await loginModel.findOne({ email: this.body.email });

    if(!this.user) {
      this.errors.push('Usuário não existe')
      return;
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)){
      this.errors.push('Senha Inválida');
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await loginModel.create(this.body);
  }

  async userExists() {
     this.user = await loginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push("Usuário já existe");
  }

  valida() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido!");

    if (this.body.password.length < 8) {
      this.errors.push("Senha precisa ter no mínimo 8 caracteres");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = login;
