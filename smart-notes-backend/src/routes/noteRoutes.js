
const express = require("express");

const {
  createNote,
  getMyNotes,
} = require("../config/controllers/noteController");

const { authenticateUser } = require("../middleware/authMiddleware");
const { validateNote } = require("../config/validators/noteValidator");

const router = express.Router();

router.post("/", authenticateUser, validateNote, createNote);

router.get("/", authenticateUser, getMyNotes);

module.exports = router;
