const uuid = require('uuid');
const api = require('../../core/api');
const jwt = require('jsonwebtoken');
const env = require('../../env');
const bcrypt = require("bcryptjs");

const db = require('../../core/db');

module.exports.get = (_req, _res) => {
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
                    api.ok(_res, {_id: _result[0].insertId});
                }).catch(_err => console.log("Error on insertion, user registration") || api.internal(_res));
            }).catch(_err => console.log("Error on selection, user registration") || api.internal(_res));
        });
    });
};

module.exports.update = (_req, _res) => {
};

module.exports.login = (_req, _res) => {
};

module.exports.logout = (_req, _res) => {
};