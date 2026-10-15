
const { DataSource } = require("typeorm");

const Note = require("./entities/Note");
const User = require("./entities/user");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Note, User],
  synchronize: true,
});

module.exports = AppDataSource;
