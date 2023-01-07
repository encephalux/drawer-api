const env = require('../env');

const respond = (_res, _status, {status, content = {}}) => {
    return _res.status(_status).end(JSON.stringify({
        meta: env.api.meta,
        status,
        content
    }));
};

const ok = (_res, content = {}) => {
    return respond(_res, 200, {status: "OK", content});
};

const internal = (_res) => {
    return respond(_res, 500, {status: "INTERNAL_ERROR"});
};

const forbidden = (_res, _status) => {
    return respond(_res, 403, {status: _status});
};

module.exports = {respond, ok, internal, forbidden};