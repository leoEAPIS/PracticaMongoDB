const { response } = require('express');

const Cita = require('../models/cita.models');


const getCita = async(req, res = response) => {

    const cita = await Cita.find()
        .populate('odontologo', 'nombre img')
        .populate('paciente', 'nombre apellido celular correo');

    res.json({
        ok: true,
        cita
    });
}

const crearCita = async(req, res = response) => {

    const uid = req.uid;
    const cita = new Cita({
        odontologo: uid,
        paciente: uid,
        ...req.body
    });

    try {

        const citaDB = await cita.save();

        res.json({
            ok: true,
            cita: citaDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar la cita, consulte con el administrador'
        })
    }

}

const actualizarCita = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const cita = await Cita.findById(id);

        if (!cita) {
            return res.status(404).json({
                ok: true,
                msg: 'cita no encontrado por id',
            });
        }

        const cambiosCita = {
            ...req.body,
            odontologo: uid,
            paciente: uid
        }

        const citaActualizado = await Cita.findByIdAndUpdate(id, cambiosCita, { new: true });


        res.json({
            ok: true,
            cita: citaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar la cita, consulte con el administrador'
        })
    }

}

const eliminarCita = async(req, res = response) => {

    const id = req.params.id;

    try {

        const cita = await Cita.findById(id);

        if (!cita) {
            return res.status(404).json({
                ok: true,
                msg: 'cita no encontrado por id',
            });
        }

        await Cita.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'la cita se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar la cita, consulte con el administrador'
        })
    }
}

module.exports = {
    getCita,
    crearCita,
    actualizarCita,
    eliminarCita,
}