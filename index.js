// implement your API here
const express = require('express');
const db = require('./data/db');


const server = express();
const { hubs } = db;

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
        res.status(500).send(err);
    });
});

server.listen(9090, () => {
    console.log('Listening on port 9090');
});