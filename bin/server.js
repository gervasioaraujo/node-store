'use-strict' // força o JavaScript ser muito mais criterioso (não pode esquecer ponto e vírgula, por exemplo).

const app = require('../src/app');
const debug = require('debug')('node-store:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log(`API rodando na porta: ${port}`);


function normalizePort(val) { // pegar uma porta disponível na máquina do servidor

    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;

}

function onError(error) {

    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES': // erro de permissão
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE': // erro de endereço em uso
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }

}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'pipe ' + addr.port;
    debug(`Listening on ${bind}`);
}

// Aula 33