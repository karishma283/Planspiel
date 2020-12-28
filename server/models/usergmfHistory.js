//Taleh Muzaffarov

const mongoose = require("../database/fiveberg_gmf_db");
const schema = {
    user_id: { type: mongoose.SchemaTypes.ObjectId, required: true, index: { unique: true } },
    quiz_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    answer: { type: mongoose.SchemaTypes.Boolean },
    date: { type: mongoose.SchemaTypes.Date, required: true }
};
const collectionName = "gmf_history"; // Name of the collection of documents
const gmfHistorySchema = mongoose.Schema(schema);
const gmfHistory = mongoose.model(collectionName, gmfHistorySchema);
module.exports = gmfHistory;