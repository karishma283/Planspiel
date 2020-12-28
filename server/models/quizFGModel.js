//Akshay Raikar

const mongoose = require("../database/fiveberg_db");
const schema = {
    quiz_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    answer: { type: mongoose.SchemaTypes.String, required: true },
    index: [{ type: mongoose.SchemaTypes.Number, required: true }],
    points: { type: mongoose.SchemaTypes.Number, required: true }

};
const collectionName = "quiz_fg"; // Name of the collection of documents
const quizfgSchema = mongoose.Schema(schema);
const QuizFG = mongoose.model(collectionName, quizfgSchema);
module.exports = QuizFG;