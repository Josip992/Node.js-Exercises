const EventEmitter = require('events');
//const emitter = new EventEmitter();

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter{
    log(message) {
        //send http request
        console.log(message);

        //emitter.emit('messageLogged', {id: 1, url: 'http//'});
        this.emit('messageLogged', {id: 1, url: 'http//'});
    }
    
}

module.exports = Logger; //exporting log function 