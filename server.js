const express = require('express');
const app = express();
const cookie_parser = require('cookie-parser'); 

app.use(express.json());
app.use(cookie_parser());
app.use("/", (_req, _res, _next) => {
    const allowed_methods = ["POST", "GET", "OPTIONS"];
    let origin = _req.header("origin");
    _res.header("Access-Control-Allow-Origin", origin);
    _res.header("Access-Control-Allow-Headers", "Content-Type, Referer");
    _res.header("Access-Control-Allow-Methods", allowed_methods.join(", "));
    _res.header("Access-Control-Allow-Credentials", "true");
    _res.header("Access-Control-Expose-Headers", "X-SESSION-TOKEN, X-APP-AUTH");

    if(_req.method.toUpperCase() === "OPTIONS") _res.end();
    else if(!allowed_methods.includes(_req.method.toUpperCase())) _res.status(403).end();
    else _next();
});
app.use('/api', require('./routes/api'));
app.use('/', (_req, _res) => _res.status(200).end("API"));
app.listen(3001);
