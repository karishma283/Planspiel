//Akshay Raikar

const mongoose = require("../database/fiveberg_db");
const schema = {
    article_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    text: { type: mongoose.SchemaTypes.String, required: true }

};
const collectionName = "quizes"; // Name of the collection of documents
const quizesSchema = mongoose.Schema(schema);
const Quizes = mongoose.model(collectionName, quizesSchema);
module.exports = Quizes;