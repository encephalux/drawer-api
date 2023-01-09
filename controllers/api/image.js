const db = require("../../core/db");
const api  = require("../../core/api");
const env = require('../../env');
const uuid = require('uuid');
const fs = require('fs');
const buffer = require('buffer');
const { json } = require("body-parser");

module.exports.register = (_req, _res) =>{
    
    fs.readdir('disk/', (_err, _folders)=>{
        if( _err && _err.code == "ENOENT") api.forbidden(_res, "NO_DIRECTORY");
        if(_folders.indexOf(_req.user._uuid) == -1) fs.mkdir(`disk/${_req.user._uuid}/`,(err) => {}); 

        const data = JSON.stringify(_req.body.data);
        const file_uuid = uuid.v4();

        fs.writeFile(`disk/${_req.user._uuid}/${file_uuid}`, data, {flag : "a+"}, (err) => {
            if (err)  return  console.log(_err) && api.forbidden(_res, "FAIL");

            db().then(_client =>{
                _client.query(`insert into t_users_media(_uuid, _user) values( ?, ?)`, [file_uuid, _req.user._id]).then((_resp) =>{
                    api.ok(_res, {});
                });
            }).catch(_err => console.log("Error on media insertion,  invalide meadia data " ) || api.internal(_res));
                
        });

    })

    
};

module.exports.get =  (_req, _res) =>{
    db().then(_client =>{
        _client.query(`select * from t_users_media where _user = ?`, [_req.user._id]).then((_result) =>{
            api.ok(_res, _result[0]);
        });
    }).catch(_err => console.log("Error on media ,  invalide media  " ) || api.internal(_res));
};

module.exports.by_id =  (_req, _res) =>{
    db().then(_client =>{
        _client.query(`select * from t_users_media where _user = ? and _id = ?`, [_req.user._id, _req.params.id]).then((_result) =>{ 
            api.ok(_res, _result[0]);
        });
    }).catch(_err => console.log("Error on media ,  invalide media  " ) || api.internal(_res));
};

module.exports.delete =  (_req, _res) =>{
    db().then(_client =>{
        _client.query(`delete from t_users_media where _user = ? and _id = ?`, [_req.user._id, _req.body._id]).then((_result) =>{
            
            api.ok(_res,{});
        });
    }).catch(_err => console.log("Error on media ,  invalide media  " ) || api.internal(_res));
};

module.exports.range =  (_req, _res) =>{
    db().then(_client =>{
        _client.query(`select  count(_id) as _count from t_users_media where _user = ?`, [_req.user._id]).then((_count) =>{ 
            _client.query(`select * from t_users_media where _user = ? `, [_req.user._id, _req.body._factor]).then((_result) =>{
                let data = {
                    _images : _result[0], 
                    _data_length : _count[0][0]._count,
                    _total_page : Math.round(_count[0][0]._count/_req.body._factor),
                };

                
                
                api.ok(_res, data);
            });
        });
    }).catch(_err => console.log("Error on media ,  invalide media  " ) || api.internal(_res));
}