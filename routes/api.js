const { register, get, update, login } = require('../controllers/api/users')

const router = require('express').Router();

router.post('/users/register', register);
router.post('/users/update', update);
router.post('/users/login',login)
router.get('/users/get', get);

module.exports = router;