const fs = require('fs');
const fastify = require('fastify')({
    https: {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }
});
const connectAndSaveBook = require('./databases');
const Book = require('./modeles/livre.js');

fastify.post('/livre', async (request, reply) => {
    try {
        const { title, author, description, format } = request.body;
        const livre = new Book({ title, author, description, format });
        await livre.save();
        reply.code(201).send(livre);
    } catch (error) {
        reply.code(500).send({ message: 'Erreur lors de la création du livre', error });
    }
});

fastify.get('/livre', async (request, reply) => {
    try {
        const livres = await getAllBooks(); // Utiliser la fonction pour récupérer tous les livres
        reply.send(livres);
    } catch (error) {
        reply.code(500).send({ message: 'Erreur lors de la récupération des livres', error });
    }
});
async function startServer() {
    try {
        await fastify.listen(3000);
        console.log('Serveur Fastify sécurisé en cours d\'exécution sur https://localhost:3000');

        await connectAndSaveBook(); // Connexion à la base de données
    } catch (err) {
        console.error('Erreur de démarrage du serveur :', err);
        process.exit(1);
    }
}

startServer();
