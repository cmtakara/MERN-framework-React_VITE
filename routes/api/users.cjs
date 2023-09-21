const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users.cjs');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn.cjs');

// const ctrl = (req, res) => {

// }

// router.get("/blah", ctrl)

// Insert ensureLoggedIn on all routes that need protecting
// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// /api/users
// appends this path to the app.use path in the server
router.post('/', usersCtrl.create);


// /api/users/login
router.post('/login', usersCtrl.login);

router.get('/check-token', usersCtrl.checkToken);

module.exports = router;










