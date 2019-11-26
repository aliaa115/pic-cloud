var Usuario = new Object();

module.exports.crearUsuario = function(usuario){
    Usuario.nombre = usuario.nombre;
    Usuario.email = usuario.email;
    Usuario.edad = usuario.edad;
}

var ingresarDatos = function () {
    var nom = document.getElementById('nombre');
    var email = document.getElementById('email');
    var edad = document.getElementById('edad');
    console.log(Usuario);
    var innerNomb = nom.innerHTML;

    nom.innerHTML = innerNomb + Usuario.nombre;
    email.innerHTML = email.innerHTML + Usuario.email;
    edad.innerHTML = edad.innerHTML + Usuario.edad;
}
