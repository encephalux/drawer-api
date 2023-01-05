const { verify } = require('jsonwebtoken');

let check_token = (_req, _res, _next)=>{

    

    let jwt =  _req.headers['authorization'];
    
    if(jwt){

        jwt = jwt.slice(7);

        verify(jwt,process.env.TOKEN_KEY , (_err, _decode)=>{
            
            if(_err){

                return _res.json({
                    status : "INVALIDE_TOKEN",
                   
                });
            
            }

            _req.user = _decode.user;
            _next()
        })

    }else{
         _res.json({
            status : "TOKEN_NOT_FOUND"
        });
    }
}