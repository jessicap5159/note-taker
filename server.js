// Variables

const express = require('express');
const { notes } = require('./db/db.json');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(require('body-parser').urlencoded({extended:true}));

// HTML routes

// To return notes.html file
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


// API ROUTES

// To read db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    
    res.json(notes);
});

// To receive a new note to save on the request body, add to db.json file, and return new note to client
app.post('/api/notes', (req, res) => {
    // set id here, add to db.json, return to client
    // res.send(req.body);
    res.send(req.body);
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }
    // making sure each note includes a title
    if (!newNote.title) {
        return res.status(400).send("Please include a title for your note.");
    }
    // adding the new note to the json file
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    console.log(notes);
    return newNote;
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
    const found = notes.some(note => note.id === req.params.id);
    if (!found) {
        res.status(400).send("Note not found");
    } else {
        console.log("note deleted!")
        res.json(notes = notes.filter(note => note.id !== req.params.id));
        console.log(notes);
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify({ notes }, null, 2)
        );
    }
});


// To return index.html file
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// setting the PORT and PORT testing
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));