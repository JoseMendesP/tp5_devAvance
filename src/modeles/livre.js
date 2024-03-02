const mongoose = require('mongoose');

const SchemaLivre = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: String,
    format: {
        type: String,
        enum: ['poche', 'manga', 'audio'],
        default: 'poche'
    }
});


async function getAllBooks() {
    try {
        const livres = await Book.find({}, { _id: 0, __v: 0 });
        return livres;
    } catch (error) {
        throw new Error('Erreur pour récuperer les livres :', error);
    }
}

const Book = mongoose.model('Book', SchemaLivre,getAllBooks);
module.exports = Book;

