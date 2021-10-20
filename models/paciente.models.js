const { Schema, model } = require('mongoose');

const PacienteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    celular: {
        type: Number,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    odontologo: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Odontologo'
    }
});


PacienteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Paciente', PacienteSchema);