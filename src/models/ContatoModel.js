const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body
        this.errors = []
        this.contato = null
    }

    async buscaPorId(id) {
        if(typeof id !== 'string') return
        const contact = await ContatoModel.findById(id)
        return contact
    }

    async delete(id) {
        if(typeof id !== 'string') return
        const contact = await ContatoModel.findOneAndDelete({ _id: id })
        return contact
    }

    async buscaContatos() {
        const contacts = await ContatoModel.find().sort({ criadoEm: -1 })
        return contacts
    }

    async register() {
        this.valida();
        if(this.errors.length) return

        this.contato = await ContatoModel.create(this.body)
    }

    async edit(id) {
        if(typeof id !== 'string') return

        this.valida();
        if(this.errors.length) return

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })
    }

    valida() {
        this.cleanUp();

        if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.')
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
        if(!this.body.telefone) this.errors.push('Telefone é um campo obrigatório.')
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        }
    }
}

module.exports = Contato