const mongoose = require('mongoose');

const EntradaSchema = mongoose.Schema({
    titulo: String,
    cuerpo: String,
    fecha_creacion :String,
    fecha_actualizacion :String,
    autor: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Entrada', EntradaSchema);
