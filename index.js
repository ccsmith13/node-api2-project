require('dotenv').config();
const port = process.env.PORT || 5000;

const express = require('express');

const postRoutes = require('./posts/postRoutes');

const server = express();

server.use('/posts', postRoutes);

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

