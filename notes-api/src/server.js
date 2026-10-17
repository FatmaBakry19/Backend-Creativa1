require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const connectDB = require("./db");
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();