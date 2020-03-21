
require('dotenv').config(); 

const express = require('express');

const postRoutes = require('./posts/postRoutes');

const server = express();

server.get('/', function(req,res) => res.send({message:"Hello World"}));

server.use('/posts', postRoutes);

if (!module.parent) {
  var port = process.env.PORT || 5000;
  server.listen(port);
  console.log('Express started on port 5000');
}

