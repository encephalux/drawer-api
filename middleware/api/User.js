
const pool = require('../../core/db');
const { success, data_error } = require('../../core/responses');

class User{

    data_validator = (_data)=>{
        if(typeof(_data._last_name) != "string" || typeof(_data._first_name) != "string" || typeof(_data._pseudo) != "string" || typeof(_data._email) != "string" || typeof(_data._password) != "string" || typeof(_data._birthday) != "string" ) return (data_error());
    
    
    }
    
    insert = (_data, _res)=>{
        this.data_validator(_data);
        pool.query("insert into t_users (_uuid, _last_name, _first_name, _birthday, _pseudo, _password, _email) values(?, ?, ?, ?,?, ?, ?)", [
            _data._uuid,
            _data._last_name,
            _data._first_name,
            _data._birthday,
            _data._pseudo,
            _data._password,
            _data._email
        ], (_err, _result, _resp)=>{
           
                if(_err) {
                   
                    return _res(data_error('Error :'+_err));
                }
    
                
                _res (null, success({
                    _id : _result.insertId,
                    _uuid : _data._uuid,
                    _pseudo : _data._pseudo
                }));
                
            });
    };

    update = (_data, _res)=>{
        const date = new Date();

        let mounth = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds()
        if(10 >date.getMonth() ) {
             mounth = '0'+(mounth+1);
        }
        if(10 >date.getDate() ) {
             day = '0'+date.getMonth() 
        }

        if(10 >date.getDate() ) {
            day = '0'+date.getDate() 
       }
       if(10 >date.getHours() ) {
            hour = '0'+date.getHours() 
       }
       if(10 >date.getMinutes() ) {
        minute = '0'+minute
   }
   if(10 >date.getSeconds() ) {
        second = '0'+second
   }
        this.data_validator(_data);
        pool.query(" update t_users set  _last_name = ?, _first_name = ?, _birthday = ?, _pseudo = ?, _password = ?, _email = ? , _updated_at = ? where _id = ? ", [
           
            _data._last_name,
            _data._first_name,
            _data._birthday,
            _data._pseudo,
            _data._password,
            _data._email,
            date.getFullYear()+"-"+ mounth+"-"+day+" "+ hour +":"+minute+":"+second,
            _data._id
        ], (_err, _result, _resp)=>{
           
                if(_err) {
                   
                    return _res(data_error('Error :'+_err));
                }
    
                
                _res (null, success({
                    _id : _result.insertId,
                    _uuid : _data._uuid,
                    _pseudo : _data._pseudo
                }));
                
            });
    }

    
    get = (_res) =>{
        pool.query("select * FROM t_users ", [],(_err, _result, _response)=>{
            if(_err)  return _res(`Error : ${_err}`);

            return _res(null, _result)
        })
    }

    by_id = (_id, _res) =>{
        pool.query("select * FROM t_users where _id = ?", [_id],(_err, _result, _response)=>{
            if(_err)  return _res(`Error : ${_err}`);

            return _res(null, _result)
        })
    }

    by_email = (_email , _res) =>{
        pool.query("select * FROM t_users where _email = ? ", [_email],(_err, _result, _response)=>{
            if(_err)  return _res(`Error : ${_err}`);

            return _res(null, _result)
        })
    }





}


module.exports = {user : new User}