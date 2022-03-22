const fsPromises = require('fs/promises');

async function newEventLog (eventName, payload) {
    await fsPromises.appendFile("./event.log", `--[${new Date().toUTCString()}] [${eventName}]---\n ${payload}\n`);
}

module.exports = {
    newEventLog
};