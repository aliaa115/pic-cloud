const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const Usuario = require('./models/usuario');
const controladorUsuario = require('./controllers/usuario');
const passportConfig = require('./config/passport')
const bodyParser = require('body-parser');
const passport = require('passport');
var phpExpress = require('php-express')();
usuarioGlobal = new Usuario();
const MONGO_URL = 'mongodb+srv://atlasAdmin:Soyirene2.@cluster0-sjwqe.mongodb.net/picCloud?retryWrites=true&w=majority';
const app = express();
var cookieParser = require('cookie-parser');
const http = require('http')
const request = require('request')
var host = process.env.ADDRESS || 'localhost';
var port = process.env.PORT || 2001;
var llenarPerfil = require('./views/js/llenarDatos')
const Cookies = require('cookies')


app.set('views', './views');
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');
app.use('/html', express.static(__dirname + '/views/html'));
app.use('/css', express.static(__dirname + '/views/css'));
app.use('/js', express.static(__dirname + '/views/js'));
app.use('/img', express.static(__dirname + '/views/img'));
app.use(cookieParser())

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) return err;
    console.log(`Conexion establecida`);
})

app.use(session({
    secret: `ESTO ES SECRETO`,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: MONGO_URL,
        autoReconnect: true
    })
}))

app.all(/.+\.php$/, phpExpress.router);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Logueado
//inicio
app.get('/pic/:nombre',passportConfig.estaAutenticado, (req, res) => {
    res.render('./php/header_inicio_login')
});
app.post('/inicLog', controladorUsuario.postLogin, (req, res)=>{
    res.redirect(307, `http://${host}:${port}` + '/pic/' + req.user.nombre)
});
app.get('/inicLog',passportConfig.estaAutenticado, (req, res) => {
    res.redirect(`http://${host}:${port}` + '/pic/' + req.user.nombre)
})

//perfil
app.post(`/perfil/:nombre`, controladorUsuario.postLogin);
app.get('/perfil/:nombre', passportConfig.estaAutenticado, (req, res) => {
    res.cookie('nombre', req.user.nombre, { expires: new Date(Date.now() + 10000), httpOnly: false })
    res.cookie('email', req.user.email, { expires: new Date(Date.now() + 10000), httpOnly: true })
    res.cookie('edad', req.user.edad, { expires: new Date(Date.now() + 10000), httpOnly: true })
    res.render('./php/perfil')
})

//fotos
app.get('/phptlog',passportConfig.estaAutenticado, (req, res)=>{
    res.redirect(307, `http://${host}:${port}` + '/photos/' + req.user.nombre)
})
app.get('/photos/:nombre',passportConfig.estaAutenticado, (req,  res)=>{
    res.render('./php/fotos')
})

//contacto  /contactolog
app.get('/contactolog',passportConfig.estaAutenticado, (req, res)=>{
    res.redirect(307, `http://${host}:${port}` + '/contacto/' + req.user.nombre)
} )
app.get('/contacto/:nombre',passportConfig.estaAutenticado, (req,  res)=>{
    res.render('./php/contacto_log_in')
})

//logOut
app.get('/logout', passportConfig.estaAutenticado, controladorUsuario.logout, (req, res) => {
    res.render('./index.php');
});


//No logueado
//  inicio
app.get(`/`, (req, res) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
    //res.send(`Hola, has visitado esta pagina: ${req.session.cuenta} veces. `);
    res.render('./index')
})
//  login
app.get('/login', (req, res) => {
    res.render('./php/login')
});
app.post('/loged', controladorUsuario.postLogin, (req, res)=>{
    res.redirect(307, `http://${host}:${port}` + '/perfil/' + req.user.nombre)
});
app.get('/loged',passportConfig.estaAutenticado, (req, res) => {
    res.redirect(`http://${host}:${port}` + '/perfil/' + req.user.nombre)
})


//  registrarse
app.post('/signup', controladorUsuario.postSignup);
app.get('/signup', (req, res) => {
    res.render('./php/signup')
})
app.post('/signedup', controladorUsuario.postSignup, (req, res)=>{
    res.redirect(307, `http://${host}:${port}` + '/perfil/' + req.user.nombre)
});
app.get('/signedup',passportConfig.estaAutenticado, (req, res) => {
    res.redirect(`http://${host}:${port}` + '/perfil/' + req.user.nombre)
})

//  contacto
app.set('/contacto', (req, res)=>{
    res.render('./php/contacto')
});

app.listen(port, function () {
    console.log(`app escuchando en el puerto http://${host}:${port}`);
});
/*

http.createServer(function (req, res) {
    console.log(`Escuchando en el puerto http://${host}:${port}`);
    res.writeHead(200, {'Content-Type': 'text/plain'});
}).listen(port);

http.get(`http://${host}:${port}/`, (req, res)=>{
    res.render('./index')
})*/