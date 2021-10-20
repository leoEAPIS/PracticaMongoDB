const { Schema, model } = require('mongoose');

const CitaSchema = Schema({
    motivo: {
        type: String,
        required: true
    },
    tratamiento: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    paciente: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Paciente'
    },
    odontologo: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Odontologo'
    }
});


CitaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Cita', CitaSchema);