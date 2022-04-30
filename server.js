const fs = require('fs');
const express = require('express');
const path = require("path");
const {itemsProvider} = require("./services");

const {} = require('./services/itemsProvider')

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    let template = '';
    const index$ = fs.createReadStream(path.join(
        __dirname,
        'assets',
        'index.html'
    ), {encoding: 'utf8'})
    index$.on('data', (data) => {
        template += data;
    })
    index$.on('end', async () => {
        const items = await itemsProvider.getItems()
        const list = items.map(e => `<li>[${e.date}] ${e.value}</li>`).join('\n');
        template = template.replace('{%list%}', list);
        res.send(template);
    })

    index$.on('error', () => {
        res.status(500).send("Unexpected Error");
    })
})

app.get('/index.html', (req, res) => {
    res.redirect('/');
})

app.post('/', (req, res) => {
    let body = '';

    req.on('data', data => {
        body += data;
        console.log("data", data);
    })

    req.on('end', async () => {
        console.log(body);
        const item = body.replace('todo-item=', '');
        await itemsProvider.setItems({
            value: item,
            date: new Date().toISOString()
        })
        res.redirect('/');
    })

})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/ is running`);
});