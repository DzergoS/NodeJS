const path = require('path');
const fsPromises = require('fs/promises');
const {notify} = require('./Notifications');


async function seek (dir, file) {
    try {
        await fsPromises.access(dir)
        const files = await fsPromises.readdir(dir);
        let content;
        if(files.includes(file)) {
            notify('success', path.join(dir, file));
            content = await fsPromises.readFile(path.join(dir, file), 'utf8');
            notify('data', content);
        }
        else {
            notify("error", "File doesn't exist ")
        }
    }
    catch (err) {
        notify("error", err)
    }
}

module.exports = {seek};

