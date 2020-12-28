const mongoose = require("../database/fiveberg_db");
const schema = {
    quizes_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    answer: { type: mongoose.SchemaTypes.String, required: true },
    index: [{ type: mongoose.SchemaTypes.Number, required: true }],
    choices: [{ type: mongoose.SchemaTypes.String, required: true }],
    points: { type: mongoose.SchemaTypes.Number, required: true },

};
const collectionName = "quiz_mc"; // Name of the collection of documents
const quizmcSchema = mongoose.Schema(schema);
const QuizMC = mongoose.model(collectionName, quizmcSchema);
module.exports = QuizMC;