const noteRepository = require("../repositories/note.repository");

const createNote = async (userId, data) => {
  return noteRepository.create({
    ...data,
    user: userId,
  });
};

const getNotes = async (userId) => {
  return noteRepository.findAllByUser(userId);
};

const getNoteById = async (noteId, userId) => {
  const note = await noteRepository.findByIdAndUser(noteId, userId);

  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }

  return note;
};

const updateNote = async (noteId, userId, data) => {
  const note = await getNoteById(noteId, userId);

  return noteRepository.update(note, data);
};

const deleteNote = async (noteId, userId) => {
  const note = await getNoteById(noteId, userId);

  await noteRepository.remove(note);
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};