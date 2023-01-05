const env = require('../env');

const respond = (_res, {status, content = {}}) => {
    return _res.end(JSON.stringify({
        meta: env.api.meta,
        status,
        content
    }));
};

const ok = (_res, content = {}) => {
    return respond(_res, {status: "OK", content});
}

const internal = (_res) => {
    return respond(_res, {status: "INTERNAL_ERROR"});
};

const forbidden = (_res, _status) => {
    return respond(_res, {status: _status});
};

module.exports = {respond, ok, internal, forbidden};