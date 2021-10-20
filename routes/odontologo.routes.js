/*
    
    ruta: '/api/odontologos'
*/
/*
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT.js');


const {
    getOdontologo,
    crearOdontologo,
    actualizarOdontologo,
    eliminarOdontologo
} = require('../controllers/odontologo.controller');



const router = Router();

router.get('/', getOdontologo);

router.post('/', [

        validarJWT,
        check('nombre', 'El nombre del odontologo es necesario').not().isEmpty(),
        check('paciente', 'El id del paciente debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearOdontologo
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del odontologo es necesario').not().isEmpty(),
        check('paciente', 'El id del paciente debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarOdontologo
);

router.delete('/:id',
    eliminarOdontologo
);



module.exports = router;
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

const { getOdontologo, crearOdontologo, actualizarOdontologo, eliminarOdontologo } = require('../controllers/odontologo.controller')
const router = Router();

router.get('/', getOdontologo);
router.post('/', [
        check('nombre', 'El nombre del paciente es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearOdontologo);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del paciente es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarOdontologo);

router.delete('/:id', validarJWT, eliminarOdontologo);

module.exports = router;