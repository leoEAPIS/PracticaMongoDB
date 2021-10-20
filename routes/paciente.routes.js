/*
    Path: /api/proyectos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

const { getPaciente, crearPaciente, actualizarPaciente, eliminarPaciente } = require('../controllers/paciente.controller')
const router = Router();

router.get('/', getPaciente);
router.post('/', [
        check('nombre', 'El nombre del paciente es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido del paciente es obligatorio').not().isEmpty(),
        check('celular', 'El celular del paciente es obligatorio').not().isEmpty(),
        check('correo', 'El correo del paciente es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearPaciente);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del paciente es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido del paciente es obligatorio').not().isEmpty(),
        check('celular', 'El celular del paciente es obligatorio').not().isEmpty(),
        check('correo', 'El correo del paciente es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarPaciente);

router.delete('/:id', validarJWT, eliminarPaciente);

module.exports = router;