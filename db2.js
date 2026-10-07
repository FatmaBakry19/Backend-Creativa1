const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "note_db",
    "postgres",
    "kokofe",
    {
        host: "localhost",
        dialect: "postgres",
        port: 5432
    }
);

module.exports = sequelize;