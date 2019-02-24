'use strict';

const express = require('express');
const ts = require('typescript');
const argv = require('minimist')(process.argv.slice(2));

const app = express();

const port = argv.port || 3031;

app.use(async (request, response, next) => {
    // Enable CORS
    response.set('Access-Control-Allow-Origin', '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json({ limit: '10mb', extended: true }));

app.get('/', (req, res) => res.send('Hi! This is transpiler service!'));

app.post('/make', async (req, res) => {
    const compilerOptions = req.body.options || { module: ts.ModuleKind.ES2015, jsx: 'react' };
    try {
        let result = ts.transpileModule(req.body.source, { compilerOptions });
        res.type('json').send({ result });
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

const server = app.listen(port, '0.0.0.0', () => console.log(`app listening on port ${port}!`));

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

let connections = [];

server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

async function shutDown() {
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}

// Solve 'possible EventEmitter memory leak detected'
process.setMaxListeners(0);