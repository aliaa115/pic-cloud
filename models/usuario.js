
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const usuarioSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    signupDate: { type: Date, default: Date.now },
    edad: { type: Number, required: true }
}, {
    timestamps: true
})

usuarioSchema.pre('save', function (next) {
    const usuario = this;
    if (!usuario.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
            if (err) return next(err);
            usuario.password = hash;
            next();
        })
    })
})

usuarioSchema.methods.compararPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, sonIguales) => {
        if (err) return cb(err);
        cb(null, sonIguales);
    })
}

module.exports = mongoose.model('user', usuarioSchema);