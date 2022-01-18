## Lista de URLs da API

---

### Listar as Tarefas Pendentes

Tipo: **GET**

Parâmetros:

URL:
[http://127.0.0.1:17060/tasks/list](http://127.0.0.1:17060/tasks/list)

Retorno: Um array de tarefas

Exemplo:

```javascript
C:\iacon\iacon-mb>iacon-task-queue --list
//////////////////////////////////////////////////////////////////
///// LISTAR TAREFAS PENDENTES
//////////////////////////////////////////////////////////////////

C:\iacon\iacon-mb\cli.js:21:29
[
    {
        "payload": {
            "message": "Olá SubHeaven 1"
        },
        "date": "2022-01-18T13:49:59.604Z",
        "picked": false,
        "tryout": 0,
        "history": [
            {
                "date": "2022-01-18T13:49:59.604Z",
                "name": "added"
            }
        ],
        "_id": 2
    },
    {
        "payload": {
            "message": "Olá SubHeaven 2"
        },
        "date": "2022-01-18T13:49:59.613Z",
        "picked": false,
        "tryout": 0,
        "history": [
            {
                "date": "2022-01-18T13:49:59.613Z",
                "name": "added"
            }
        ],
        "_id": 3
    },
}
```

---

### Listar Histórico de Tarefas Executadas

Tipo: **GET**

Parâmetros:

URL:
[http://127.0.0.1:17060/tasks/history](http://127.0.0.1:17060/tasks/history)

Retorno: Um array de tarefas executadas

Exemplo:
```javascript
C:\iacon\iacon-mb>node cli.js --hist
//////////////////////////////////////////////////////////////////
///// LISTAR HISTÓRICO DE TAREFAS EXECUTADAS
//////////////////////////////////////////////////////////////////

C:\iacon\iacon-mb\cli.js:34:29
[
    {
        "log": "Processando a task: 2\npayload:\n{\n    \"message\": \"Olá SubHeaven 1\"\n}\nTask processada\n",
        "payload": {
            "message": "Olá SubHeaven 1"
        },
        "tryout": 1,
        "date": "2022-01-18T14:15:00.644Z",
        "history": [
            {
                "date": "2022-01-18T13:49:59.604Z",
                "name": "added"
            },
            {
                "date": "2022-01-18T14:15:00.640Z",
                "name": "picked"
            },
            {
                "date": "2022-01-18T14:15:00.644Z",
                "name": "processed",
                "log": "Processando a task: 2\npayload:\n{\n    \"message\": \"Olá SubHeaven 1\"\n}\nTask processada\n"
            }
        ],
        "_id": 2
    }
]
```

---

### Adicionar uma Nova Tarefa

Tipo: **POST**

Parâmetros:

URL:
[http://127.0.0.1:17060/tasks/add](http://127.0.0.1:17060/tasks/add)

---

### Executar uma Tarefa da Fila

Tipo: **POST**

Parâmetros:

URL:
[http://127.0.0.1:17060/tasks/execute](http://127.0.0.1:17060/tasks/execute)

---

### Listar Últimos Comandos Executados com Sucesso

Tipo: **GET**

Parâmetros:

URL:
[http://127.0.0.1:17060/tasks/success](http://127.0.0.1:17060/tasks/success)

Retorno: Um array de comandos executados com sucesso

Exemplo:
```javascript
[
    {
        "_id": 3,
        "code": 1,
        "command": "python3 C:\\iacon\\dharma-servicos\\tools\\GeradorDeErro.py",
        "err": "Traceback (most recent call last):\r\n  File \"C:\\iacon\\dharma-servicos\\tools\\GeradorDeErro.py\", line 23, in <module>\r\n    _err = _counter / 0\r\nZeroDivisionError: division by zero\r\n",
        "log": "0\r\n1\r\n2\r\n3\r\n4\r\n5\r\n6\r\n7\r\n8\r\n9\r\n",
        "time": "2022-01-18 15:57:46"
    },
    {
        "_id": 4,
        "code": 1,
        "command": "python3 C:\\iacon\\dharma-servicos\\tools\\GeradorDeErro.py",
        "err": "Traceback (most recent call last):\r\n  File \"C:\\iacon\\dharma-servicos\\tools\\GeradorDeErro.py\", line 23, in <module>\r\n    _err = _counter / 0\r\nZeroDivisionError: division by zero\r\n",
        "log": "0\r\n1\r\n2\r\n3\r\n4\r\n5\r\n6\r\n7\r\n8\r\n9\r\n",
        "time": "2022-01-18 15:59:11"
    }
]
```

---

### Listar Últimos Comandos Executados com Erro

Tipo: **GET**

Parâmetros:

URL:
[http://127.0.0.1:17060/tasks/errors](http://127.0.0.1:17060/tasks/errors)

Retorno: Um array de comandos executados com erro

Exemplo:
```javascript
[
    {
        "command": "python3 C:\\iacon\\dharma-servicos\\tools\\GeradorDeErro.py",
        "log": "0\r\n1\r\n2\r\n3\r\n4\r\n5\r\n6\r\n7\r\n8\r\n9\r\n",
        "code": 1,
        "err": "Traceback (most recent call last):\r\n  File \"C:\\iacon\\dharma-servicos\\tools\\GeradorDeErro.py\", line 23, in <module>\r\n    _err = _counter / 0\r\nZeroDivisionError: division by zero\r\n",
        "time": "2022-01-18 15:57:46",
        "_id": 3
    },
    {
        "command": "python3 C:\\iacon\\dharma-servicos\\tools\\GeradorDeErro.py",
        "log": "0\r\n1\r\n2\r\n3\r\n4\r\n5\r\n6\r\n7\r\n8\r\n9\r\n",
        "code": 1,
        "err": "Traceback (most recent call last):\r\n  File \"C:\\iacon\\dharma-servicos\\tools\\GeradorDeErro.py\", line 23, in <module>\r\n    _err = _counter / 0\r\nZeroDivisionError: division by zero\r\n",
        "time": "2022-01-18 15:59:11",
        "_id": 4
    }
]
```