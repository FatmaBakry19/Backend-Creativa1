console.log("APP.JS IS RUNNING");

const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const filePath = "./notes.json";

// GET
app.get("/notes", (req, res) => {
    const data = fs.readFileSync(filePath, "utf8");
    const notes = JSON.parse(data);

    res.json(notes);
});

// POST
app.post("/notes", (req, res) => {
    const data = fs.readFileSync(filePath, "utf8");
    const notes = JSON.parse(data);

    const newNote = {
        id: notes.length + 1,
        title: req.body.title,
        content: req.body.content
    };

    notes.push(newNote);

    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));

    res.status(201).json({
        message: "Note added successfully",
        note: newNote
    });
});

// PUT
app.put("/notes/:id", (req, res) => {
    const data = fs.readFileSync(filePath, "utf8");
    const notes = JSON.parse(data);

    const id = parseInt(req.params.id);

    const note = notes.find(note => note.id === id);

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    note.title = req.body.title;
    note.content = req.body.content;

    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));

    res.json({
        message: "Note updated successfully",
        note: note
    });
});

// DELETE
app.delete("/notes/:id", (req, res) => {
    const data = fs.readFileSync(filePath, "utf8");
    const notes = JSON.parse(data);

    const id = parseInt(req.params.id);

    const noteExists = notes.some(note => note.id === id);

    if (!noteExists) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    const updatedNotes = notes.filter(note => note.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(updatedNotes, null, 2));

    res.json({
        message: "Note deleted successfully"
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});