const multer = require('multer');
const { v4 : uuid} = require('uuid');
const name = uuid()

const storage = multer.diskStorage({
    destination : (_req, _file, _cb) =>{
        const complete_path = `disk/${_req.user._uuid}/${name}`;
        _req.file_path = complete_path;

        _cb(null,complete_path );
    },

    filename : (_req, _file, _cb)=>{       
        _cb(null, name);
    }
});

const upload = multer({storage : storage});

module.exports =  upload.single() ; 