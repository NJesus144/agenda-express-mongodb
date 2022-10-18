import "core-js/stable";
import "regenerator-runtime/runtime";

//  import "./assets/css/style.css";

import Cadastro from "./modules/Cadastro";
import Login from "./modules/Login";
import Contato from "./modules/Contato";

// const login = new Login(".form-login");
const cadastro = new Cadastro(".form-cadastro");
const login = new Login(".form-login");
const contato = new Contato(".form-register");
cadastro.init();
login.init();
contato.init();
