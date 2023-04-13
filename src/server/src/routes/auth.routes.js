const router = require("express").Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.AuthenticateUser);

module.exports = router;