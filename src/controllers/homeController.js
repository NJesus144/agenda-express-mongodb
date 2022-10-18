const Contato = require('../models/ContatoModel')

exports.Index = async (req, res) => {
    const contatos = await Contato.buscaContatos();
    res.render("index", { contatos });
  

};
