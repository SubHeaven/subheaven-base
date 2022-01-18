const express = require('express');
const fs = require('fs');
const log = require('debug')('iacon:tasks');
const mb = require('iacon-mb')('iacon');
const router = express.Router();
const runner = require('subheaven-command-runner');
const tools = require('subheaven-tools');
// const showdown  = require('showdown');
// showdown.setFlavor('github');
// const converter = new showdown.Converter();
const { Remarkable } = require('remarkable');
const hljs = require('highlight.js');
const converter = new Remarkable('full', {
    html: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (err) {}
        }
    
        try {
            return hljs.highlightAuto(str).value;
        } catch (err) {}
    
        return ''; // use external default escaping
    }
});

router.get('/', async (req, res, next) => {
    log("Consultando raiz de tasks:");
    const page = converter.render(fs.readFileSync('./md/tasks.md', 'utf8'));
    res.status(200).send(page);
});

router.post('/add', async (req, res, next) => {
    console.log("Adicionando tarefa:");
    console.log(req.body);
    console.log("");
    await mb.add(process.env.NAME, req.body);
    res.status(200).send('hi!');
});

router.get('/list', async (req, res, next) => {
    console.log("Listando tarefas:");
    let tasks = await mb.list(process.env.NAME);
    res.status(200).send(tasks);
});

router.get('/history', async (req, res, next) => {
    console.log("Listando histórico de tarefas:");
    let tasks = await mb.list(`${process.env.NAME}_hist`);
    res.status(200).send(tasks);
});

router.post('/execute', async (req, res, next) => {
    console.log("Executando tarefa:");
    let local_log = await mb.process(process.env.NAME, async (payload, task) => {
        log(`Processando a task: ${task._id}`);
        console.log('Comando:');
        let command = payload.comando.replace('{services}', process.env.SERVICE);
        console.log(command);
        let resultado = await runner.execute(command);
        await resultado.log.split('\r\n').forEachAsync(async item => {
            console.log(item);
        });
        if (resultado.code != 0) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            await resultado.err.split('\r\n').forEachAsync(async item => {
                console.log(item);
            });
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            throw new Error("Erro ao executar o comando!!!");
        }
        log("");
    }, debug=true);
    res.status(200).send(local_log);
});

router.get('/success', async (req, res, next) => {
    console.log("Listando últimos comandos executados com sucesso:");
    let logs = await runner.logs();
    res.status(200).send(logs);
});

router.get('/errors', async (req, res, next) => {
    console.log("Listando últimos comandos executados com erro:");
    let errors = await runner.errors();
    res.status(200).send(errors);
});

module.exports = router;