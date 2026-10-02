const express = require("express");

const pool = require("./db");

const app = express();

app.use(express.json());
app.get("/test", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM notes");

        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send("Database error");
    }
});
app.post("/notes", async (req, res) => {
    try {
        const result = await pool.query(
            "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
            [req.body.title, req.body.content]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error saving note");
    }
});
app.put("/notes/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
            [req.body.title, req.body.content, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Note not found");
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating note");
    }
});
 
app.delete("/notes/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM notes WHERE id = $1 RETURNING *",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Note not found");
        }

        res.json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting note");
    }
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
