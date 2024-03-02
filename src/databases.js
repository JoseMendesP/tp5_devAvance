const mongoose = require('mongoose');
const Book = require('./modeles/livre.js');

async function connectAndSaveBook() {
    try {
        await mongoose.connect('mongodb://localhost:27017/devAvance', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connexion réussie');

        const newBook = new Book({
            title: "Naruto",
            author: "Masashi Kishimoto",
            description: "Ninja du village de Konoha",
            format: "manga"
        });

        const savedBook = await newBook.save();
        console.log('Le livre a été enregistré :', savedBook);
    } catch (error) {
        console.error('Erreur de connexion ou l\'enregistrement du livre :', error);
    }
}

module.exports = connectAndSaveBook;
