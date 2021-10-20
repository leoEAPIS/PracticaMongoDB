/*const { response } = require('express');

const Odontologo = require('../models/odontologo.models');

const getOdontologo = async(req, res = response) => {

    const odontologo = await Odontologo.find()
        .populate('usuario', 'nombre img')
        .populate('paciente', 'nombre img')


    res.json({
        ok: true,
        odontologo: odontologo
    })
}

const crearOdontologo = async(req, res = response) => {

    const uid = req.uid;
    const odontologo = new Odontologo({
        usuario: uid,
        ...req.body
    });


    try {

        const odontologoDB = await odontologo.save();


        res.json({
            ok: true,
            odontologo: odontologoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear odontologo, consulte con el administrador'
        })
    }


}

const actualizarOdontologo = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const odontologo = await Odontologo.findById(id);

        if (!odontologo) {
            return res.status(404).json({
                ok: true,
                msg: 'odontologo no encontrado por id',
            });
        }

        const cambiosOdontologo = {
            ...req.body,
            usuario: uid
        }

        const odontologoActualizado = await Odontologo.findByIdAndUpdate(id, cambiosOdontologo, { new: true });


        res.json({
            ok: true,
            odontologo: odontologoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar odontologo, consulte con el administrador'
        })
    }

}

const eliminarOdontologo = async(req, res = response) => {

    const id = req.params.id;

    try {

        const odontologo = await Odontologo.findById(id);

        if (!odontologo) {
            return res.status(404).json({
                ok: true,
                msg: 'odontologo no encontrado por id',
            });
        }

        await Odontologo.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'odontologo borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'odontologo no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getOdontologo,
    crearOdontologo,
    actualizarOdontologo,
    eliminarOdontologo,
}*/
const { response } = require('express');

const Odontologo = require('../models/odontologo.models');


const getOdontologo = async(req, res = response) => {

    const odontologo = await Odontologo.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        odontologo
    });
}

const crearOdontologo = async(req, res = response) => {

    const uid = req.uid;
    const odontologo = new Odontologo({
        usuario: uid,
        ...req.body
    });

    try {

        const odontologoDB = await odontologo.save();

        res.json({
            ok: true,
            odontologo: odontologoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar odontologo, consulte con el administrador'
        })
    }

}

const actualizarOdontologo = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const odontologo = await Odontologo.findById(id);

        if (!odontologo) {
            return res.status(404).json({
                ok: true,
                msg: 'odontologo no encontrado por id',
            });
        }

        const cambiosOdontologo = {
            ...req.body,
            usuario: uid
        }

        const odontologoActualizado = await Odontologo.findByIdAndUpdate(id, cambiosOdontologo, { new: true });


        res.json({
            ok: true,
            odontologo: odontologoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el odontologo, consulte con el administrador'
        })
    }

}

const eliminarOdontologo = async(req, res = response) => {

    const id = req.params.id;

    try {

        const odontologo = await Odontologo.findById(id);

        if (!odontologo) {
            return res.status(404).json({
                ok: true,
                msg: 'odontologo no encontrado por id',
            });
        }

        await Odontologo.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'El odontologo se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el odontologo, consulte con el administrador'
        })
    }
}

module.exports = {
    getOdontologo,
    crearOdontologo,
    actualizarOdontologo,
    eliminarOdontologo,
}