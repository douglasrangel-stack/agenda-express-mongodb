const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
    try {
        const contatos = new Contato()
        const contacts = await contatos.buscaContatos()
        if(!contacts) return res.render('404')
        res.render('index', { contacts });
    } catch (e) {
        console.log(e)
        res.render("404")
    }
    
}