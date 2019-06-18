const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send("It's alive!");
});

server.get('/api/users', (req, res) => {
db
.find()
.then(users => {
    res.status(200).json(users)
}).catch(err => {
    //handle error
    res.status(400).json({ error: err, errorMessage: 'Please provide name and bio for the user.' });
});
});

server.get('/api/users/:id', (req, res) => {
    db
    .findById()
    .then(user => {
        res.status(200).json(user)
    }).catch(err => {
        //handle error
        res.status(404).json({ error: err, errorMessage: 'The user with the specified ID does not exist.' });
    });
})

server.post('/api/users', (req, res) => {

    const userInformation = req.body;
    console.log('request body', userInformation)

    db
    .insert(userInformation)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        //handle error
        res.status(500).json({ error: err, message: 'Error adding user' });
    });
});

server.delete('/api/users/:id', (req, res) => {

    const userId = req.params.id
    db
    .remove(userId)
    .then(deleted => {
        res.status(200).json(deleted)
    })
    .catch(err => {
        //handle error
        res.status(500).json({ error: err, message: 'Error adding user' });
    });
})

server.put('/api/users/:id', (req, res) => {

    const userId = req.params.id
    db
    .update(userId, updatedUser)
    .then(updatedUser => {
        res.status(200).json(updatedUser)
    })
    .catch(err => {
        //handle error
        res.status(500).json({ error: err, message: 'The user information could not be modified.' });
    });
})


server.listen(9090, () => {
    console.log('API Running on port 9090')
});