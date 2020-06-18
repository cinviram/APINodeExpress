module.exports = (app) => {
    const entradas = require('../controllers/entrada.controller.js');

    // Crear una entrada
    app.post('/entradas', entradas.create);

    // Obtener todas las entradas
    app.get('/entradas', entradas.findAll);

    // Obtener una entrada usando un ID
    app.get('/entradas/:entradaId', entradas.findOne);

    // Actualizar una entrada usando un ID
    app.put('/entradas/:entradaId', entradas.update);

    // Eliminar una entrada usando un ID
    app.delete('/entradas/:entradaId', entradas.delete);
}