const db = require("../../core/db");
const api  = require("../../core/api");
const env = require('../../env');
const uuid = require('uuid');
const fs = require('fs');
const buffer = require('buffer');
const { json } = require("body-parser");

module.exports.register = (_req, _res) =>{
    
    const data = JSON.stringify(_req.body.data);
    const file_uuid = uuid.v4();
    fs.mkdir(`disk/users_images/${_req.user._uuid}/`,(_err) => {
        if (_err)   (console.log(_err) && api.internal(_err));
            
    }); 

    fs.writeFile(`disk/users_images/${_req.user._uuid}/${file_uuid}`, data, {flag : "a+"}, (_err) => {
        if (_err)  return  console.log(_err) && api.forbidden(_res, "FAIL");

        db().then(_client =>{
            _client.query(`insert into t_users_media(_uuid, _user, _name) values( ?, ?, ?)`, [file_uuid, _req.user._id, _req.body._name]).then((_resp) =>{
                api.ok(_res, {_id: _resp[0].insertId});
            });
        }).catch(_err => console.log("Error on media insertion,  invalide meadia data " ) || api.internal(_res));
                
    });   
};

module.exports.update = (_req, _res) =>{
    const data = JSON.stringify(_req.body.data);

    fs.writeFile(`disk/users_images/${_req.user._uuid}/${_req.body._uuid}`, data, {flag : "a+"}, (_err) => {
        if (_err)    console.log(_err) && api.forbidden(_res, "FAIL");

        api.ok(_res);               
    });   
};

module.exports.get =  (_req, _res) =>{
    db().then(_client =>{
        _client.query(`select * from t_users_media where _user = ?`, [_req.user._id]).then((_result) =>{
            api.ok(_res, _result[0]);
        });
    }).catch(_err => console.log("Error on media ,  invalide media  " ) || api.internal(_res));
};

module.exports.rename =  (_req, _res) =>{
    db().then(_client =>{
        _client.query(`update t_users_media set _name = ? where _user = ? and _id = ?`, [_req.body._name, _req.user._id , _req.body._id]).then((_result) =>{
            console.log([_req.body._name, _req.user._id , _req.body._id]);
            api.ok(_res, {_id: _req.body._id});
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
            
            api.ok(_res);
        });
    }).catch(_err => console.log("Error on media ,  invalide media  " ) || api.internal(_res));
};

module.exports.range =  (_req, _res) =>{
    const {_factor, _page} = _req.body;
    db().then(_client =>{
        _client.query(`select  count(_id) as _count from t_users_media where _user = ?`, [_req.user._id]).then((_count) =>{ 
            let page = 0;
            const count = _count[0][0]._count;
            if(count  > _factor) page = (_page -1)*_factor;

            _client.query(`select * from t_users_media where _user = ? limit ? offset ?`, [_req.user._id, _req.body._factor, page]).then((_result) =>{
                let data = {
                    list : _result[0], 
                    total : count
                };

                api.ok(_res, data);
            });
        });
    }).catch(_err => console.log("Error on media ,  invalide media  " ) || api.internal(_res));
}