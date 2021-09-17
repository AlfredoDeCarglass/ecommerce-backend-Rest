const express = require('express');
const { signup, signin } = require('../../controller/admin/auth');
const { validateSignUpRequest, validateSignInRequest, isRequestValidated } = require('../../validators/auth');
const router = express.Router();

 // Utilice la clase express.Router para crear manejadores de rutas montables y modulares.
 // Una instancia Router es un sistema de middleware y direccionamiento completo; por este motivo,
 // a menudo se conoce como una “miniaplicación”.

router.post('/admin/signup', validateSignUpRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSignInRequest, isRequestValidated, signin);


module.exports = router;