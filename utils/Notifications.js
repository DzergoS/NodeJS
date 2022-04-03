const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const EventEmitter = require("events");
const logger = require("./Logger");
const fsPromises = require("fs/promises");

class ExtEventEmitter extends EventEmitter {
    constructor(options) {
        super(options);

        this.checkVerbose();
    }

    checkVerbose() {
        const argv = yargs(hideBin(process.argv)).argv;
        this._verbose = !!argv.verbose;
        logger.warn(`[ExtEventEmitter] Verbose mode: ${!!this._verbose}`)
    }

    async newEventLog (eventName, payload) {
        await fsPromises.appendFile("./event.log", `---------[${new Date().toUTCString()}] [${eventName.toUpperCase()}]:\n ${payload}\n`);
    }

    emit(event, ...args) {
        this._verbose && this.newEventLog(event, ...args);
        return super.emit(event, ...args)
    }
}

const notifications = new ExtEventEmitter();

module.exports = {
    notifications
}