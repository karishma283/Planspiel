// Akshay Raikar

const mongoose = require("mongoose");
const dbPath = "mongodb://mongo:27017/fiveberg";
mongoose.connect(dbPath, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the fiveberg database");
});

module.exports = mongoose;