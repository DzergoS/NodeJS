const fs = require('fs')
const path = require('path')
const {createWriteStream} = require("fs");

class itemDataProvider {
    constructor() {
        this._dataFile = path.join(__dirname, '..', 'data', 'items.json')
        this._cashe = null
    }

    async getItems() {
        if (this._cashe) return this._cashe
        try {
            fs.accessSync(this._dataFile)
        } catch {
            this._cashe = []
            return this._cashe
        }
        const file$ = fs.createReadStream(this._dataFile, {encoding: 'utf8'})

        const data = await new Promise((res, rej) => {
            let result = '';

            file$.on('data', data => {
                result += data
            })

            file$.on('end', () => {
                res(result)
            })

            file$.on('error', rej)
        });

        this._cashe = JSON.parse(data);
        return this._cashe;
    }

    async setItems(item) {
        if (!this._cashe) {
            this._cashe = await this.getItems()
        }
        this._cashe.push(item)
        const file$ = createWriteStream(
            this._dataFile,
            {encoding: 'utf8'}
        )

        file$.end(JSON.stringify(this._cashe))
        return this._cashe

    }
}

const itemsProvider = new itemDataProvider();

module.exports = itemsProvider