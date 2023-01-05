const env = require('../env')

const data_error = (msg = 'BAD_DATA') =>{
    return {
        meta : env.api,
        status : msg
    };
};

const success= (data) =>{
    return {
        meta : env.api.meta,
        status : "OK",
        data : data || {} 
    }
}

module.exports = { data_error , success}