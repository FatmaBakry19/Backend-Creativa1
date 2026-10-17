const Note = require("../entities/Note");

const create = async (data) => {
  return Note.create(data);
};

const findAllByUser = async (userId) => {
  return Note.find({ user: userId }).sort({ createdAt: -1 });
};

const findByIdAndUser = async (noteId, userId) => {
  return Note.findOne({
    _id: noteId,
    user: userId,
  });
};

const update = async (note, data) => {
  Object.assign(note, data);
  return note.save();
};

const remove = async (note) => {
  return note.deleteOne();
};

module.exports = {
  create,
  findAllByUser,
  findByIdAndUser,
  update,
  remove,
};