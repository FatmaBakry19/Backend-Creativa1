const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const PORT = 3000;
const FILE = "./notes.json";

// GET - Get all notes
app.get("/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(FILE, "utf8"));

  res.json(notes);
});

// POST - Add a new note
app.post("/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(FILE, "utf8"));

  const newNote = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  };

  notes.push(newNote);

  fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));

  res.status(201).json(newNote);
});

// PUT - Update a note
app.put("/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(FILE, "utf8"));

  const id = Number(req.params.id);

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({
      message: "Note not found"
    });
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    title: req.body.title,
    content: req.body.content
  };

  fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));

  res.json(notes[noteIndex]);
});

// DELETE - Delete a note
app.delete("/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(FILE, "utf8"));

  const id = Number(req.params.id);

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({
      message: "Note not found"
    });
  }

  const deletedNote = notes.splice(noteIndex, 1);

  fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));

  res.json({
    message: "Note deleted successfully",
    note: deletedNote[0]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});