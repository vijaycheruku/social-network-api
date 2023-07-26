const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./dbdata');

connection.on('error', (err) => err);

connection.once('open', async () => {
    await User.collection.insertMany(users);    
    await Thought.collection.insertMany(thoughts);
    console.log('Data added to db');
    process.exit(0);
});