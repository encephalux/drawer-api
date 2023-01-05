const express = require('express');
const app = express();
const cookie_parser = require('cookie-parser'); 

app.use(express.json())
app.use(cookie_parser())

app.use('/api', require('./routes/api'));
app.use('/', (_req, _res) => _res.status(200).end("API"));
app.listen(3001);
