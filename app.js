const express = require('express');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');

const env = require('subheaven-env');
env.addParams([
    { name: 'PORT', description: 'Porta onde o sistema irá rodar.', required: false, sample: '33320' },
    { name: 'SERVICE', description: 'Caminho onde está instalado o Dharma Serviços.', required: false, sample: 'C:\\iacon\\dharma-servicos' },
    { name: 'NAME', description: 'Nome da lista de tarefas', required: false, sample: 'malha_antecipada' },
]);
env.config();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tasks = require('./routes/tasks');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasks);

module.exports = app;