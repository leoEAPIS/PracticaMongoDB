const { response } = require('express');

const Especialidad = require('../models/especialidad.models');


const getEspecialidad = async(req, res = response) => {

    const especialidad = await Especialidad.find()
        .populate('odontologo', 'nombre img');

    res.json({
        ok: true,
        especialidad
    });
}

const crearEspecialidad = async(req, res = response) => {

    const uid = req.uid;
    const especialidad = new Especialidad({
        odontologo: uid,
        ...req.body
    });

    try {

        const especialidadDB = await especialidad.save();

        res.json({
            ok: true,
            especialidad: especialidadDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar la especialidad, consulte con el administrador'
        })
    }

}

const actualizarEspecialidad = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const especialidad = await Especialidad.findById(id);

        if (!especialidad) {
            return res.status(404).json({
                ok: true,
                msg: 'especialidad no encontrado por id',
            });
        }

        const cambiosEspecialidad = {
            ...req.body,
            odontologo: uid
        }

        const EspecialidadActualizado = await Especialidad.findByIdAndUpdate(id, cambiosEspecialidad, { new: true });


        res.json({
            ok: true,
            especialidad: EspecialidadActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar la especialidad, consulte con el administrador'
        })
    }

}

const eliminarEspecialidad = async(req, res = response) => {

    const id = req.params.id;

    try {

        const especialidad = await Especialidad.findById(id);

        if (!especialidad) {
            return res.status(404).json({
                ok: true,
                msg: 'especialidad no encontrado por id',
            });
        }

        await Especialidad.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'La especialidad se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar la especialidad, consulte con el administrador'
        })
    }
}

module.exports = {
    getEspecialidad,
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad,
}