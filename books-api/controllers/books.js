const express = require('express')
const books = express.Router()
const Book = require('../models/books')

//middleware function to get a book and then run the next piece of code
async function getBook(req, res, next) {
    let book
    try {
        book = await Book.findById(req.params.id)
        if (book == null) {
            return res.status(404).json({ message: 'Book not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.book = book
    next()
}

//get all the books
books.get('/', (req, res) => {
    Book.find()
        .then(foundBooks => {
            res.json(foundBooks)
        }) 
        .catch(err => {
            res.status(400).json('400: Bad request')
            res.status(404).json('404: Not found')
            res.status(500).json('500: Internal server error')
            console.log(err)
        })
})

//get specific book
books.get('/:id', (req, res) => {
    Book.findById(req.params.id)
    .then(book => {
        res.json(book)
    })
    .catch(err => {
        //do I need to write a status response for every relevant status code?
        res.status(400).json('400: Bad request')
        res.status(404).json('404: Not found')
        res.status(500).json('500: Internal server error')
        console.log(err)
    })
})

//add a book
books.post('/', async (req, res) => {
    var book = new Book({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        quantity: req.body.quantity,
        imageURL: req.body.imageURL
    })
    try {
        const newBook = await book.save()
        res.status(201).json(newBook)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//update a specific book
books.put('/:id', getBook, async (req, res) => {
    if (req.body.title != null) {
        res.book.title = req.body.title
    }
    if (req.body.description != null) {
        res.book.bescription = req.body.description
    }
    if (req.body.year != null) {
        res.book.year = req.body.year
    }
    if (req.body.quantity != null) {
        res.book.quantity = req.body.quantity
    }
    if (req.body.imageURL != null) {
        res.book.imageURL = req.body.imageURL
    }
    try {
        const updatedBook = await res.book.save()
        res.json(updatedBook)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
books.delete('/:id', getBook, async (req, res) => {
    try {
        await res.book.remove()
        res.json({ message: 'The book has been removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = books