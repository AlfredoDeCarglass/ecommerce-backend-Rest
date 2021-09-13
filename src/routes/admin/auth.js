const express = require('express');
const { signup, signin, requireSignin } = require('../../controller/admin/auth')
const router = express.Router();
 // Utilice la clase express.Router para crear manejadores de rutas montables y modulares.
 // Una instancia Router es un sistema de middleware y direccionamiento completo; por este motivo,
 //  a menudo se conoce como una “miniaplicación”.

router.post('/admin/signup', signup);
router.post('/admin/signin', signin);


module.exports = router;