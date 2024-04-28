const Contato = require("../models/ContatoModel")

exports.index = (req, res) => {
  return res.render("contato", { contact: {}})
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body)
        await contato.register()
    
        if(contato.errors.length) {
            req.flash('errors', contato.errors)
            req.session.save(()=> res.redirect('back'))
            return
        }
    
        req.flash('success', 'Contato cadastrado com sucesso.')
        req.session.save(()=> res.redirect(`/contato/${ contato.contato._id }`))
        return
    } catch (e) {
        console.log(e)
        res.render("404")
    }
}

exports.view = async (req, res) => {
    if(!req.params.id) return res.render('404')

    const contato = new Contato()
    const contact = await contato.buscaPorId(req.params.id)
    if(!contact) return res.render('404')

    return res.render("contato", { contact })
}

exports.edit = async (req, res) => {
    if(!req.params.id) return res.render('404')

    try {
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)
    
        if(contato.errors.length) {
            req.flash('errors', contato.errors)
            req.session.save(()=> res.redirect('back'))
            return
        }
    
        req.flash('success', 'Contato atualizado com sucesso.')
        req.session.save(()=> res.redirect(`/contato/${ contato.contato._id }`))
        return
    } catch (e) {
        console.log(e)
        res.render("404")
    }
   
}

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404')

    const contato = new Contato()
    const contact = await contato.delete(req.params.id)
    if(!contact) return res.render('404')

    req.flash('success', 'Contato apagado com sucesso.')
    req.session.save(()=> res.redirect('back'))
    return
}