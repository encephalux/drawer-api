const express = require('express');
const parser = require('body-parser');
const app = express();
const cookie_parser = require('cookie-parser'); 

app.use(express.json())
app.use(parser.urlencoded({extended : false}));
app.use(cookie_parser())

app.use('/api/user', require('./routes/user'));
app.listen(3001);
