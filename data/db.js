const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  hubs: {
    find,
    findById,
    insert,
    update,
    remove,
  },
};

let _hubs = [
  {
    id: 1,
    name: "Jane Doe",
    bio: "Not Tarzan's wife, another Jane",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

function find() {
  return db('users');
}

function findById(id) {
  return db('users')
    .where({ id: Number(id) })
    .first();
}

function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

function remove(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}
