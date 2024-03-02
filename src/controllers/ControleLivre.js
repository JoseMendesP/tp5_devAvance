const Book = require('./modeles/livre.js');

async function createBookHandler(request, reply) {
    try {
        const { title, author, description, format } = request.body;
        const livre = new Book({ title, author, description, format });
        await livre.save();
        reply.code(201).send(livre);
    } catch (error) {
        reply.code(500).send({ message: 'Erreur lors de la création du livre', error });
    }
}

async function getAllBooksHandler(request, reply) {
    try {
        const livres = await Book.find({}, { _id: 0, __v: 0 });
        reply.send(livres);
    } catch (error) {
        reply.code(500).send({ message: 'Erreur lors de la récupération des livres', error });
    }
}

module.exports = { createBookHandler, getAllBooksHandler };
