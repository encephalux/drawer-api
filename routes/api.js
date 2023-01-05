const user = require('../controllers/api/users');

const router = require('express').Router();

router.post('/users/register', user.register);
router.post('/users/update', user.update);
router.post('/users/login',user.login);
router.post('/users/logout', user.logout);
router.get('/users/get', user.get);

module.exports = router; 