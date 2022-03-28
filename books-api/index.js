//dependencies
const express = require('express');
const mongoose = require('mongoose');

//config
require('dotenv').config();
const PORT = process.env.PORT;
const app = express()
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

// MIDDLEWARE
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//requiring the controller
const booksController = require('./controllers/books.js')
app.use('/books', booksController)

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the Books App')
})

// LISTEN
app.listen(PORT, () => {
    console.log('The app is now live on port ', PORT);
})