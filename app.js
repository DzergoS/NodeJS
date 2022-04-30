const logger = require('./utils/Logger');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const {seek} = require("./utils/FileSeeker");
const {notifications} = require("./utils/Notifications");

const argv = yargs(hideBin(process.argv)).argv;

seek(argv.dir, argv.file);

notifications.addListener('seek-success', file => {
    logger.info("[SEEK][SUCCESS]", file);
})
notifications.addListener('seek-error', err => {
    logger.info("[SEEK][ERROR]", err.toString());
})
notifications.addListener('seek-data', content => {
    logger.info("[SEEK][DATA]", content);
})