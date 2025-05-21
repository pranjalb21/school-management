const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

const initializeDatabase = async () => {
    await mongoose
        .connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Database connected successfully."))
        .catch((error) => {
            console.error("Database connection error:", error);
            process.exit(1); // Ensures the app does not continue running if DB connection fails
        });
};

module.exports = initializeDatabase