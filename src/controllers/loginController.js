const Login = require("../models/LoginModel")

exports.index = (req, res) => {
  if(req.session.user) return res.redirect('/admin')
  return res.render("login")
}

exports.admin = (req, res) => {
  if(req.session.user) return res.render('admin')
  return res.redirect("/login")
}

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.register()

    if (login.errors.length) {
      req.flash("errors", login.errors)
      req.session.save(() => {
        return res.redirect("back")
      })
      return
    }

    req.flash("success", 'Seu usuário foi criado com sucesso.')
    req.session.save(() => {
        return res.redirect("back")
    })
  } catch (e) {
    console.log(e)
    res.render("404")
  }
}

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.login()

    if (login.errors.length) {
      req.flash("errors", login.errors)
      req.session.save(() => {
        return res.redirect("back")
      })
      return
    }

    req.flash("success", 'Login efetuado com sucesso.')
    req.session.user = login.user
    req.session.save(() => {
        return res.redirect("back")
    })
  } catch (e) {
    console.log(e)
    res.render("404")
  }
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}