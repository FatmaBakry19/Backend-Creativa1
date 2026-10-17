const express = require("express");
const router = express.Router();

const noteController = require("../controllers/note.controller");
const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const {
  createNoteSchema,
  updateNoteSchema,
} = require("../validators/note.validator");

router.use(authMiddleware);

router.post("/", validate(createNoteSchema), noteController.createNote);
router.get("/", noteController.getNotes);
router.get("/:id", noteController.getNoteById);
router.patch("/:id", validate(updateNoteSchema), noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;