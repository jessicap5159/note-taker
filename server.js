// Variables

const express = require('express');
const { savedNotes } = require('./db/db.json');

// HTML routes

// To return notes.html file
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './notes.html'));
});

// To return index.html file
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

// API ROUTES

// To read db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    let results = savedNotes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// To receive a new note to save on the request body, add to db.json file, and return new note to client
// Need to find a way to give each note a unique ID when it's saved (npm package)
app.post('/api/notes', (req, res) => {
    // set id here, add to db.json, return to client
 
});