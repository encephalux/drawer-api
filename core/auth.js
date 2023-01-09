const jwt = require('jsonwebtoken');
const env = require('../env');

module.exports.checkToken =  (_req, _res, _next) =>{
    jwt.verify(_req.cookies.session_token, env.jwt.secret.session, (_err, _result)=>{
        if(_err)  return  api.forbidden(_res, 'INVALID_TOKEN');
        _req.user = _result.user;

        _next();
    }); 
};