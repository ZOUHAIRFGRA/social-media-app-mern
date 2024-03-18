const express = require('express');
const { loginUser, signupUser, logoutUser} = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);