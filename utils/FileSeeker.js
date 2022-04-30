const path = require('path');
const {notifications} = require('./Notifications');
const fs = require("fs");


function seek (dir, file) {

    fs.createReadStream(path.join(dir, file), {encoding: 'utf8'})
        .on('data', chunk => {
            notifications.emit('seek-success', path.join(dir, file));
            notifications.emit('seek-data', chunk);
        })
        .on('error', err => notifications.emit("seek-error", err));
}

module.exports = {seek};

