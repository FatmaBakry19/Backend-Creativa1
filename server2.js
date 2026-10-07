const express = require("express");
const sequelize = require("./db2");
const Note = require("./models/Note");
const { Op } = require("sequelize");

const app = express();

console.log("THIS IS MY SERVER FILE");

app.use(express.json());


// GET ALL NOTES
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.findAll();

        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Database error");
    }
});


// CREATE NOTE
app.post("/notes", async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.create({
            title,
            content
        });

        res.json(note);
    } catch (error) {
        console.log(error);
        res.status(500).send("Database error");
    }
});


// UPDATE NOTE
app.put("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).send("Note not found");
        }

        await note.update({
            title,
            content
        });

        res.json(note);
    } catch (error) {
        console.log(error);
        res.status(500).send("Database error");
    }
});


// DELETE NOTE
app.delete("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).send("Note not found");
        }

        await note.destroy();

        res.json({
            message: "Note deleted successfully",
            note
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Database error");
    }
});


// SEARCH NOTES BY TITLE
app.get("/notes/search", async (req, res) => {
    try {
        const { title } = req.query;

        const notes = await Note.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${title}%`
                }
            }
        });

        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Database error");
    }
});


// CONNECT DATABASE AND START SERVER
sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully");

        app.listen(4000, () => {
            console.log("Server is running on port 4000");
        });
    })
    .catch((error) => {
        console.log("Database connection failed:");
        console.log(error);
    });