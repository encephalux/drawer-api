const { user } = require('../../middleware/api/User');
const { v4 : uuid} = require('uuid');
const { mail_validator, mailSender } = require('../../core/mailer');
const { data_error, success } = require('../../core/responses');
const { sign } = require('jsonwebtoken');
const env = require('../../env');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');


module.exports = {
    register : (_req, _res) =>{ 
        
        const data = _req.body;
        data._uuid = uuid();
        const salt = genSaltSync(10)
        data._password = hashSync( data._password, salt )

        if(mail_validator(data._email) == !1){
            return _res.json(data_error('INVALIDE_EMAIL'));
        }

        user.insert(data, (_err, _resp) =>{

            if(_err) {
                return _res.json(data_error());
            }


            const token = sign({user : _resp}, env.jwt.secret.key, {});
            console.log(token)

            const message = `Votre compte Drawer est créé avec succès , validez le : \n Cliquez sur lien "http://localhost:3000/account/confirm/${token}"`
            
            mailSender({content : message, mail : data._email},(_err, _result)=>{
                if(_err){
                    

                    return _res.json(data_error('EMAIL_NOT_SENT'))
                }

                _res.json(success())
            } )
        })
        
    },

    update : (_req, _res) =>{ 
        
        const data = _req.body;
        const salt = genSaltSync(10)
        data._password = hashSync( data._password, salt )

        if(mail_validator(data._email) == !1){
            return _res.json(data_error('INVALIDE_EMAIL'));
        }

        user.update(data, (_err, _resp) =>{

            if(_err) {
                console.log(_err)
                return _res.json(data_error());
            }


            const token = sign({user : _resp}, env.jwt.secret.key, {});
            console.log(token)

            const message = `Votre compte Drawer été modifié avec succès , validez le : \n Cliquez sur lien "http://localhost:3000/account/confirm/${token}"`
            
            mailSender({content : message, mail : data._email},(_err, _result)=>{
                if(_err){
                    
                    return _res.json(data_error('EMAIL_NOT_SENT'))
                }

                _res.json(success())
            } )
        })
        
    },

    get : (_req, _res)=>{
        
    
       user.get((_err, _resp) =>{

            if(_err) {
                console.log(_err)
                return _res.json(data_error());
            }

            _res.json(success(_resp));
       })
    },

    //login part 
    login : (_data, _res)=>{
        const data = _data.body

        user.by_email(data._email, (_err, _result)=>{
            if(_err) {
                console.log(_err) 

                return _res.json(data_error())
            } 
            if(_result.length == 0){

                return _res.json(data_error('ACCES_DENIED'))
            }
           
            //console.log({_id:_result[0]._id , _uuid : _result[0]._pseudo, _email : _result[0]._email})
            if(compareSync(data._password, _result[0]._password)){
                _result._password = undefined
               
                const jwt = sign({user : {_id:_result[0]._id , _uuid : _result[0]._pseudo, _email : _result[0]._email}}, env.jwt.secret.key, { });

                console.log(`User connected : ${_result[0]._pseudo}`);
                
                _res.cookie('session_token', jwt);
                 
                
                return _res.json(success(jwt));

            }else{

                return _res.json(data_error('INVALID_DATA'))
            }
 
        })
    }
}