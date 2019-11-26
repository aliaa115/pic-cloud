
const passport = require('passport');
const Usuario = require('../models/usuario');
var datos = new Usuario()
var ind = require('../index')
module.exports = usuarioGlobal = new Usuario();
var host = process.env.ADDRESS || 'localhost';
var port = process.env.PORT || 2001;

module.exports.postSignup = (req, res, next) => {
    const nuevoUsuario = new Usuario({
        email: req.body.email,
        nombre: req.body.nombre,
        password: req.body.password,
        edad: req.body.edad
    });

    Usuario.findOne({ email: req.body.email }, (err, usuarioExistente) => {
        if (err) res.status(400).sed({ message: `Error al crear el usuario: ${err}` });
        if (usuarioExistente) return res.status(400).render('./php/noLoged');
        nuevoUsuario.save((err) => {
            if (err) next(err);
            req.logIn(nuevoUsuario, (err) => {
                if (err) return next(err);
                res.status(200).redirect(301, `http://${host}:${port}` + '/perfil/' + req.user.nombre)
            })
        })
    })
}

module.exports.postLogin = (req, res, next) => {
    passport.authenticate('local', (err, usuario, info) => {
        if (err) next(err);
        if (!usuario) return res.status(400).render('./php/noLoged');
        req.logIn(usuario, (err) => {
            if (err) return next(err);
            res.status(200).redirect(301, `http://${host}:${port}` + '/perfil/' + req.user.nombre)
        })
        req.params.email = req.user.email
    })(req, res, next);
}

module.exports.logout = (req, res) => {
    req.logout();
    res.status(200).render('./index')
}
