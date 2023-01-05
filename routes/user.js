const { register, get, update, login } = require('../controllers/api/user')

const router = require('express').Router();

router.post('/register', register);
router.post('/update', update);
router.post('/login',login)
router.get('/get', get);

module.exports = router;