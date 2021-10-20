const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

const { getEspecialidad, crearEspecialidad, actualizarEspecialidad, eliminarEspecialidad } = require('../controllers/especialidad.controller')
const router = Router();

router.get('/', getEspecialidad);
router.post('/', [
        check('nombre', 'El nombre dela especialidad es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion de la especialidad es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearEspecialidad);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre dela especialidad es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion de la especialidad es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarEspecialidad);

router.delete('/:id', validarJWT, eliminarEspecialidad);

module.exports = router;