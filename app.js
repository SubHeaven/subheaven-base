const express = require('express');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');

const env = require('subheaven-env');
env.addParams([
    { name: 'PORT', description: 'Porta onde o sistema irá rodar.', required: false, sample: '33320' }
]);
env.config();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;