const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

const { getCita, crearCita, actualizarCita, eliminarCita } = require('../controllers/cita.controller')
const router = Router();

router.get('/', getCita);
router.post('/', [
        check('motivo', 'El motivo de la cita es obligatorio').not().isEmpty(),
        check('tratamiento', 'El tratamiento es obligatorio').not().isEmpty(),
        check('fecha', 'El fecha dela cita es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearCita);
router.put('/:id', [
        validarJWT,
        check('motivo', 'El motivo de la cita es obligatorio').not().isEmpty(),
        check('tratamiento', 'El tratamiento es obligatorio').not().isEmpty(),
        check('fecha', 'El fecha dela cita es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCita);

router.delete('/:id', validarJWT, eliminarCita);

module.exports = router;