const express = require('express');
const { signup, signin} = require('../controller/auth');
const { validateSignUpRequest, validateSignInRequest, isRequestValidated } = require('../validators/auth');
const router = express.Router();
 // Utilice la clase express.Router para crear manejadores de rutas montables y modulares.
 // Una instancia Router es un sistema de middleware y direccionamiento completo; por este motivo,
 //  a menudo se conoce como una “miniaplicación”.

router.post('/signup', validateSignUpRequest, isRequestValidated, signup);
router.post('/signin', validateSignInRequest, isRequestValidated, signin);

/*
router.post('/profile', requireSignin, (req, res) => {
    res.status(200).json({ user: 'profile'})
});
*/

module.exports = router;