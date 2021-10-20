const { Schema, model } = require('mongoose');

const EspecialidadSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    odontologo: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Odontologo'
    }
});


EspecialidadSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Especialidad', EspecialidadSchema);