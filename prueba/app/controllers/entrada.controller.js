const Entrada = require('../models/entrada.model.js');

exports.create = (req, res) => {
    if(!req.body.cuerpo) {
        return res.status(400).send({
            message: "El contenido no puede estar vacio"
        });
    }

    const entrada = new Entrada({
        titulo: req.body.titulo || "Nota sin titulo", 
        contenido: req.body.cuerpo,
        fecha_creacion : req.body.fecha_creacion,
        fecha_actualizacion :req.body.fecha_actualizacion,
        autor:req.body.autor
    });

    entrada.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al crear la entrada."
        });
    });
};

exports.findAll = (req, res) => {
    Entrada.find()
    .then(entradas => {
        res.send(entradas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al obtener las entradas."
        });
    });
};



//Encontrar una entrada usando un ID de entrada
exports.findOne = (req, res) => {
    Entrada.findById(req.params.entradaId)
    .then(entrada => {
        if(!entrada) {
            return res.status(404).send({
                message: "Entrada no encontrada" + req.params.entradaId
            });            
        }
        res.send(entrada);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Entrada no encontrada " + req.params.entradaId
            });                
        }
        return res.status(500).send({
            message: "Entrada no encontrada " + req.params.entradaId
        });
    });
};



// Actualizar una entrada usando el ID de entrada para identificar la que se va a actualizar
exports.update = (req, res) => {
    if(!req.body.cuerpo) {
        return res.status(400).send({
            message: "El contenido no puede estar vacio! ERROR"
        });
    }

    Entrada.findByIdAndUpdate(req.params.entradaId, {
        titulo: req.body.titulo || "Entrada sin titulo",
        cuerpo: req.body.cuerpo,
        fecha_creacion : req.body.fecha_creacion,
        fecha_actualizacion :req.body.fecha_actualizacion,
        autor:req.body.autor
    }, {new: true})
    .then(entrada => {
        if(!entrada) {
            return res.status(404).send({
                message: "Entrada no encontrada " + req.params.entradaId
            });
        }
        res.send(entrada);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Entrada no encontrada " + req.params.entradaId
            });                
        }
        return res.status(500).send({
            message: "Error al actualizar" + req.params.entradaId
        });
    });
};

// Eliminar una entrada usando su ID
exports.delete = (req, res) => {
    Entrada.findByIdAndRemove(req.params.entradaId)
    .then(entrada => {
        if(!entrada) {
            return res.status(404).send({
                message: "Entrada no encontrada " + req.params.entradaId
            });
        }
        res.send({message: "Entrada eliminada correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'No Encontrada') {
            return res.status(404).send({
                message: "Entrada no encontrada " + req.params.entradaId
            });                
        }
        return res.status(500).send({
            message: "No es posible eliminar la entrada " + req.params.entradaId
        });
    });
};