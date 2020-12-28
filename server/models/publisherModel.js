//Akshay Raikar
const mongoose = require("../database/fiveberg_db");
const schema = {
    name: { type: mongoose.SchemaTypes.String, required: true },
};
const collectionName = "publisher"; // Name of the collection of documents
const publisherSchema = mongoose.Schema(schema);
const Publisher = mongoose.model(collectionName, publisherSchema);
module.exports = Publisher;