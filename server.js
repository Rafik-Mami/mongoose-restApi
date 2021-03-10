const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, { useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we are connected")
});
app.use(express.json())
const Users = require('./routes/users')
app.use('/users', () => console.log('hh'))
app.listen(3000, () => console.log('server started'))