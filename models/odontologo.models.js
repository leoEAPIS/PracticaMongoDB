/*const { Schema, model } = require('mongoose');

const OdontologoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'

    },
    paciente: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Paciente'

    },

});


OdontologoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})





module.exports = model('Odontologo', OdontologoSchema);*/

const { Schema, model } = require('mongoose');

const OdontologoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    paciente: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Paciente'
    }
});


OdontologoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Odontologo', OdontologoSchema);