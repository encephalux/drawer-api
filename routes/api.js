const user = require('../controllers/api/users');

const router = require('express').Router();

router.post('/users/register', user.register);
router.post('/users/update', user.update);
router.post('/users/login',user.login);
router.post('/users/logout', user.logout);
router.post('/users/confirm', user.confirm);
router.post('/users/activate', user.activate);
router.post('/users/deactivate', user.deactivate)

router.get('/users/get', user.get);
router.get('/users/email-confirmation/:token', user.confirm_account);

module.exports = router; 