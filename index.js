// implement your API here
const express = require('express');
const db = require('./data/seeds/users');


const server = express();
const { users } = db;

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
server.get('/users', (req, res) => {
    users.find()
    .then(allUsers => {
        res.json(allUsers);
    }).catch(err => {
        res.status(500).json(err);
    });
});

//create - add
server.post('/users', (req, res) => {
    const newUser = req.body;
    hubs.add(newUser)
    .then(addedUser => {
        res.status(201).json(addedUser)
    })
    .catch(({ code, message }) => {
        res.status(code).json({ err: message});
    });
});

//delete - destroy
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    users.remove(id)
    .then(removedUser => {
        res.json(removedUser);
    })
    .catch(({ code, message }) => {
        res.status(code).json({ err: message});
    });
});

//update
server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;

    hubs.update(id, user)
    .then(updatedUser => {
        if (updatedUser) {
            res.json(updatedUser)
        } else {
            res.status(404).json({ err: 'incorrect id'});
        }
    })
    .catch(({ code, message }) => {
        res.status(code).json({ err: message });
    });
});

server.listen(9090, () => {
    console.log('Listening on port 9090');
});