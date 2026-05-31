const express = require('express');
const { userRegisterController } = require('../controller/auth.controller');


const router = express.Router();


// api/auth/register
router.post('/register',userRegisterController)


module.exports = router;