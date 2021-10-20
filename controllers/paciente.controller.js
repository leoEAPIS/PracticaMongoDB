const { response } = require('express');

const Paciente = require('../models/paciente.models');


const getPaciente = async(req, res = response) => {

    const paciente = await Paciente.find()
        .populate('odontologo', 'nombre img');

    res.json({
        ok: true,
        paciente
    });
}

const crearPaciente = async(req, res = response) => {

    const uid = req.uid;
    const paciente = new Paciente({
        odontologo: uid,
        ...req.body
    });

    try {

        const pacienteDB = await paciente.save();

        res.json({
            ok: true,
            paciente: pacienteDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar paciente, consulte con el administrador'
        })
    }

}

const actualizarPaciente = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const paciente = await Paciente.findById(id);

        if (!paciente) {
            return res.status(404).json({
                ok: true,
                msg: 'paciente no encontrado por id',
            });
        }

        const cambiosPaciente = {
            ...req.body,
            odontologo: uid
        }

        const pacienteActualizado = await Paciente.findByIdAndUpdate(id, cambiosPaciente, { new: true });


        res.json({
            ok: true,
            paciente: pacienteActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el paciente, consulte con el administrador'
        })
    }

}

const eliminarPaciente = async(req, res = response) => {

    const id = req.params.id;

    try {

        const paciente = await Paciente.findById(id);

        if (!paciente) {
            return res.status(404).json({
                ok: true,
                msg: 'paciente no encontrado por id',
            });
        }

        await Paciente.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'El paciente se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el paciente, consulte con el administrador'
        })
    }
}

module.exports = {
    getPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente,
}