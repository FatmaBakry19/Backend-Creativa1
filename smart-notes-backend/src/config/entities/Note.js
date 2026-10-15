const { EntitySchema } = require("typeorm");

const Note = new EntitySchema({
  name: "Note",
  tableName: "notes",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    title: {
      type: "varchar",
      length: 255,
    },

    content: {
      type: "text",
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },

    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "userId",
      },
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});

module.exports = Note;