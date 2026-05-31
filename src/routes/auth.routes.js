const express = require('express');
const { userRegisterController, userLoginController, userLogoutController } = require('../controller/auth.controller');


const router = express.Router();


// api/auth/register
router.post('/register',userRegisterController)

// api/auth/login
router.post("/login",userLoginController)
// api/auth/logout
router.post("/logout",userLogoutController)



module.exports = router;
