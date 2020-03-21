
require('dotenv').config(); 

const express = require('express');

const postRoutes = require('./posts/postRoutes');

const server = express();

server.use('/posts', postRoutes);

if (!module.parent) {
  var port = process.env.PORT || 5000;
  server.listen(port);
  console.log('Express started on port 5000');
}

