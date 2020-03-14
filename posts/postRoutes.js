var db = require('../data/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const posts = db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = db.findById(id)
        .then(post => {
            if (post) {
                res.json(post);
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
});

router.get('/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const postComments = db.findPostComments(postId)
        .then(postComments => {
            if (postComments.length !== 0) {
                res.json(postComments);
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
});

router.post('/', (req, res) => {
    const post = (req.query)
    if (req.query.title && req.query.contents) {
        db.insert(post)
            .then(post => {
                res.status(201).json(post);
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
    else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
});

router.post('/:id/comments', (req, res) => {
    const post_id = parseInt(req.params.id);
    const comment = { text: req.query.text, post_id: post_id }
    if (post_id && req.query.text.length !== 0) {
        db.insertComment(comment)
            .then(comment => {
                //console.log('req.params in post comment ', req.params)
                res.status(201).json(comment);
            })
            .catch(err => {
                //console.log('req.params in post comment ', req.params)
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
    }
    else {
        if (post_id) {
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = db.findById(id);
    //console.log('post', post)
    db.remove(id)
        .then(post => {
            if (post) {
                res.json(post);
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" })
        })
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = req.query
    if (id) {
        db.update(id, post)
            .then(post => {
                if ((req.query.title) && (req.query.contents)) {
                    res.status(200).json(req.query)
                    //res.json(req.query)
                }
                else {
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }
    else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
});

module.exports = router;
