// const http = require('http');
const fs = require('fs');
const express = require('express');
// const {notifications} = require("./utils/Notifications");
// const routes = require("./routes");
const path = require("path");
const {itemsProvider} = require("./services");

const  {} = require('./services/itemsProvider')

const PORT = 3000;

// NO EXPRESS
// const server = http.createServer();

// server.on('request', (req, res) => {
//     console.log(`[Request] url: `, req.url);
//     notifications.emit("request-url", req.url);
//
//     if(req.url === "/favicon.ico")
//         fs.createReadStream("./assets/favicon.ico").pipe(res);
//
//     if(req.url === "/")
//         fs.createReadStream("./index.html").pipe(res);
//
//     else res.end();
// })

// server.listen(PORT, () => {
//     console.log(`Server is serving on http://localhost:${PORT}`);
// });

//EXPRESS
const app = express()

app.get('/', (req, res) => {
    let template = '';
    const index$ = fs.createReadStream(path.join(
        __dirname,
        'assets',
        'index.html'
    ), {encoding: 'utf8'})
    index$.on('data', (data) => {
        template += data
    })
    index$.on('end', async () => {
        const items = await itemsProvider.getItems()
        const list = items.map(e => `<li>[${e.date}] ${e.value}</li>`).join('\n');
        template = template.replace('{%list%}', list );
        res.send(template);
    })

    index$.on('error', () => {
        res.status(500).send("Unexpected Error");
    })
})

app.get('/index.html', (req, res) => {
    res.redirect('/')
})

app.post('/', (req, res) => {
    let body = '';

    req.on('data', data => {
        body += data;
        console.log("data", data)
    })

    req.on('end', async () => {
        console.log(body)
        const item = body.replace('todo-item=', '')
        await itemsProvider.setItems({
            value: item,
            date: new Date().toISOString()
        })
        res.redirect('/')
    })

})

app.get('/messages/:user', (req, res) => {
    res.send(`messages with id ${JSON.stringify(req.params)}`);
});

app.get('/messages/:user/verbose', (req, res) => {
    res.send(`messages with id ${JSON.stringify(req.params)} verbose`);
});

app.get('/messages', (req, res) => {
    res.send(`messages`);
});

// app.use('/dashboard', routes.dashboard);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/ is running`);
});