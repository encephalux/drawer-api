const uuid = require('uuid');
const api = require('../../core/api');
const jwt = require('jsonwebtoken');
const env = require('../../env');
const bcrypt = require("bcryptjs");
const mailer = require("../../core/mailer");

const db = require('../../core/db');

module.exports.get = (_req, _res) => {
    db().then(_client => {
        _client.query(`select * from t_users`, []).then(_result => {
            api.ok(_res, _result[0]);
        }).catch(_err => console.log("Error on selection, users getting") || api.internal(_res));
    } );
};

module.exports.delete = (_req, _res) => {
    db().then(_client => {
        _client.query(`update t_users set  _status = ? where _id = ?`, ['deleted',_req.body._id]).then(_result => {
            api.ok(_res,_result);
        }).catch(_err => console.log("Error on deleting, users getting") || api.internal(_res));
    } );
};

module.exports.register = (_req, _res) => {
    const {_last_name, _first_name, _birthday, _email, _password} = _req.body;

    bcrypt.hash(_password, 10, (_err, _hash) => {
        if(_err) return api.internal(_res);

        db().then(_client => {
            _client.query(`select _id from t_users where _email=?`, [_email]).then(_result => {
                if(_result[0].length > 0)
                    return api.forbidden(_res, "USER_ALD_RGSTRD");

                _client.query(`insert into t_users(_uuid, _last_name, _first_name, _birthday, _email, _password) values(?, ?, ?, ?, ?, ?)`, [
                    uuid.v4(), _last_name, _first_name, _birthday, _email, _hash
                ]).then(_result => {
                    api.ok(_res, {_id: _result[0].insertId}); // return the new user id to the client

                    jwt.sign({
                        user: {
                            _id: _result[0].insertId,
                            _email: _email
                        }
                    }, env.jwt.secret.email_confirmation, {algorithm: "HS512"}, (_err, _token) => {
                        mailer.email_confirmation({
                            _token: _token,
                            _email: _email
                        }).catch(_err => console.log(_err));
                    });
                }).catch(_err => console.log("Error on insertion, user registration", _err) || api.internal(_res));
            }).catch(_err => console.log("Error on selection, user registration", _err) || api.internal(_res));
        });
    });
};


module.exports.confirm_account = (_req, _res)=>{    
    jwt.verify(_req.params.token, env.jwt.secret.email_confirmation, (_err, _result)=>{
        if(_err)  return  api.forbidden(_res, 'INVALID_TOKEN');
        api.ok(_res,_result )        
    });
}

module.exports.confirm = (_req, _res)=>{
    db().then(_client => {
        _client.query(`update t_users set  _confirmed = ? where _id = ?`, [true,_req.body._id]).then(_result => {
            api.ok(_res,_result);
        }).catch(_err => console.log("Error on confirmation, users account confirmation") || api.internal(_res));
    } );
}



module.exports.update = (_req, _res) => {
    const {_last_name, _first_name, _birthday, _email, _password, _id} = _req.body;

    bcrypt.hash(_password, 10, (_err, _hash) => {
        if(_err) return api.internal(_res);

        db().then(_client => {
            
            _client.query(`update t_users set  _last_name = ?, _first_name = ?, _birthday = ?, _password = ?, _email = ? where _id = ? `, [
                 _last_name, _first_name, _birthday,_hash, _email, _id
            ]).then(_result => {
                api.ok(_res);
            }).catch(_err => console.log("Error on update, user update" ) || api.internal(_res));
            
        });
    });
};

module.exports.deactivate = (_req, _res) => {
    db().then(_client => {
        _client.query(`update t_users set  _status = ? where _id = ?`, ['deactivated',_req.body._id]).then(_result => {
            api.ok(_res,_result);
        }).catch(_err => console.log("Error on deactivation, users account deactivation") || api.internal(_res));
    } );
};

module.exports.activate = (_req, _res) => {
    db().then(_client => {
        _client.query(`update t_users set  _status = ? where _id = ?`, ['activated',_req.body._id]).then(_result => {
            api.ok(_res,_result);
        }).catch(_err => console.log("Error on activation, users  accountactivation") || api.internal(_res));
    } );
};
module.exports.login = (_req, _res) => {
    const { _email, _password} = _req.body;

    db().then(_client =>{
        _client.query(`select * from t_users where _email = ? and _status = 'activated' and _confirmed = true`, [_email]).then(([_rows]) =>{
            if(_rows.length === 0)return api.forbidden(_res, "NO_ACCOUNT")
            
            jwt.sign({
                user: {
                    _id: _rows[0]._id,
                    _uuid: _rows[0]._uuid,
                    _email: _rows[0]._email
                }
            }, env.jwt.secret.session, {algorithm: "HS512"}, (_err, _token) => {
                
                db().then(_client =>{
                    _client.query(`insert into t_sessions(_id, _data, _valide) values(?, ?, ?)`, [uuid.v4(), _token, true]).then(() =>{
                        _res.cookie('session_token', _token);
                        api.ok(_res, _token);
                    });
                })
            });

            
        });
    }).catch(_err => console.log("Error on login,  invalide user data " ) || api.internal(_res));
    
};

module.exports.logout = (_req, _res) => {
    console.log(_req.cookies.session_token);
    _res.clearCookie('session_token');

    api.ok(_res, 'USER_LOGOUT');
};