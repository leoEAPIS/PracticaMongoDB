//busquedaTotal

const { response } = require("express")

const Usuario = require('../models/usuario.models');
const Odontologo = require('../models/odontologo.models');
const Paciente = require('../models/paciente.models');



const busquedaTotal = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const miRegExp = new RegExp(busqueda, 'i'); //i  insensible

    const [usuario, odontologo, paciente] = await Promise.all([
        Usuario.find({ nombre: miRegExp }), // la busqueda es por nombre
        Odontologo.find({ nombre: miRegExp }),
        Paciente.find({ nombre: miRegExp })
    ]);

    res.json({
        ok: true,
        msg: 'busqueda total',
        usuario,
        odontologo,
        paciente
    });

}

//estructura de la peticion 
const busquedaColeccion = async(req, res = response) => {

    const miColeccion = req.params.micoleccion;
    const busqueda = req.params.busqueda;
    const miRegExp = new RegExp(busqueda, 'i'); //i  insensible

    let data = [];

    switch (miColeccion) {
        case 'usuarios':
            data = await Usuario.find({ nombre: miRegExp })

            break;
        case 'pacientes':
            data = await Paciente.find({ nombre: miRegExp })
                .populate('odontologo', 'nombre img');
            break;
        case 'odontologos':
            data = await Odontologo.find({ nombre: miRegExp })
                .populate('paciente', 'nombre img');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: "La coleccion tiene que ser usuarios/pacientes/odontologos"
            });
    }
    res.json({
        ok: true,
        resultados: data
    });

}





module.exports = {
    busquedaTotal,
    busquedaColeccion
}