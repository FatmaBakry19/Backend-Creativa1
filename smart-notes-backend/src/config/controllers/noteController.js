
const AppDataSource = require("../database");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const noteRepository = AppDataSource.getRepository("Note");

    const note = noteRepository.create({
      title,
      content,
      user: { id: req.user.id },
    });

    await noteRepository.save(note);

    return res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getMyNotes = async (req, res) => {
  try {
    const noteRepository = AppDataSource.getRepository("Note");

    const notes = await noteRepository.find({
      where: {
        user: { id: req.user.id },
      },
      order: {
        createdAt: "DESC",
      },
    });

    return res.status(200).json({ notes });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createNote,
  getMyNotes,
};
