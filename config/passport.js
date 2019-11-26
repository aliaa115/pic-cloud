const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
module.exports = usuarioGlobal = new Usuario();
var host = process.env.ADDRESS || 'localhost';
var port = process.env.PORT || 2001;

passport.serializeUser((usuario, done) => {
    done(null, usuario._id);
})

passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
        done(err, usuario);
    })
})

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        Usuario.findOne({ email }, (err, usuario) => {
            if (err) return done(null, false, { message: `Error ${err} al iniciar sesion` });
            if (!usuario) return done(null, false, { message: `El email ${email} no esta registrado` });
            usuarioGlobal = usuario;
            usuario.compararPassword(password, (err, sonIguales) => {
                if (sonIguales) return done(null, usuario, {usuario: usuario});
                else return done(null, false, { message: `La contrase;a no es valida ` });
            })
        })
    }
))

module.exports.estaAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.status(401).redirect(301, `http://${host}:${port}` + `/`);
}
