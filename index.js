// implement your API here
const express = require('express');
const db = require('./data/db');


const server = express();
const { hubs } = db;

//middleware
server.use(express.json());

//endpoints
server.get('/', (req, res) => {

    res.send('<h2>Hello World</h2>')
});

//current date
server.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now);
});

//read
server.get('/hubs', (req, res) => {
    hubs.find()
    .then(allHubs => {
        res.json(allHubs);
    }).catch(err => {
        res.status(500).json(err);
    });
});

//create - add
server.post('/hubs', (req, res) => {
    const newHub = req.body;
    hubs.add(newHub)
    .then(addedHub => {
        res.status(201).json(addedHub)
    })
    .catch(({ code, message}) => {
        res.status(code).json({ err: message});
    });
});

//delete - destroy
server.delete('/hubs/:id', (req, res) => {
    const { id } = req.params;

    hubs.remove(id)
    .then(removedHub => {
        res.json(removedHub);
    })
    .catch(({ code, message }) => {
        res.status(code).json({ err: message});
    });
});

server.listen(9090, () => {
    console.log('Listening on port 9090');
});