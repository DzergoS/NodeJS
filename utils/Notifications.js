const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const EventEmitter = require("events");
const {newEventLog} = require("./EventLogger");

const notifications = new EventEmitter();

const argv = yargs(hideBin(process.argv)).argv;

async function notify (eventName, payload) {
    if(argv.verbose)
        await newEventLog(eventName, payload);

    notifications.emit(eventName, payload);
}

module.exports = {
    notify,
    notifications
}