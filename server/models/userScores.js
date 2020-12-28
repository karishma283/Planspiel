//Taleh Muzaffarov

const mongoose = require("../database/fiveberg_db");
const schema = {
    user_id: { type: mongoose.SchemaTypes.ObjectId, required: true, index: { unique: true } },
    user_score: { type: mongoose.SchemaTypes.Number, required: true }
};
const collectionName = "gmf_scores"; // Name of the collection of documents
const gmfScoresSchema = mongoose.Schema(schema);
const gmfScores = mongoose.model(collectionName, gmfScoresSchema);
module.exports = gmfScores;