// Create web server with Express
const express = require('express');
const app = express();

// Import our comments data
const comments = require('./comments');

// Define a route to get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Define a route to get a specific comment
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).send('The comment with the given ID was not found');
    }
    res.json(comment);
});

// Define a route to create a new comment
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        body: req.body.body
    };
    comments.push(comment);
    res.json(comment);
});

// Define a route to update a comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).send('The comment with the given ID was not found');
    }
    comment.body = req.body.body;
    res.json(comment);
});

// Define a route to delete a comment
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).send('The comment with the given ID was not found');
    }
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.json(comment);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});