const controleLivre = require('./controllers/ControleLivre');
const SchemaLivre = require('./modeles/livre');

async function routes(fastify, options) {
    fastify.post('/livre', { schema: { body: SchemaLivre } }, controleLivre.createBookHandler);

    // Route pour récupérer tous les livres
    fastify.get('/livre', controleLivre.getAllBooksHandler);
}

module.exports = routes;
