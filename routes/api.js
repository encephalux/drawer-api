const user = require('../controllers/api/users');
const image = require('../controllers/api/image');
const uploader = require('../core/uploader');
const auth = require('../core/auth');
const router = require('express').Router();

// user routers
router.post('/users/register', user.register);
router.post('/users/update', auth.checkToken, user.update);
router.post('/users/login', user.login);
router.post('/users/logout', auth.checkToken, user.logout);
router.post('/users/confirm', user.confirm);
router.post('/users/activate', user.activate);
router.post('/users/deactivate', auth.checkToken, user.deactivate);
router.post('/users/delete', auth.checkToken, user.delete);
router.post('/users/update_password',auth.checkToken,  user.update_password);
router.post('/users/reset_password',auth.checkToken, user.reset_password);
router.get('/users/get', user.get);

//image routers
router.post('/user/images/register', auth.checkToken, image.register);
router.post('/user/images/delete', auth.checkToken, image.delete);
router.post('/user/images/range', auth.checkToken, image.range);
router.post('/user/images/update', auth.checkToken, image.update);
router.post('/user/images/rename', auth.checkToken, image.rename);

router.get('/user/images/get', auth.checkToken, image.get);
router.get('/user/images/get/:id',auth.checkToken, image.by_id);

module.exports = router; 