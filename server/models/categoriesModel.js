//Akshay Raikar
const mongoose = require("../database/fiveberg_db");
const schema = {
    name: { type: mongoose.SchemaTypes.String, required: true, index: { unique: true } },
    desc: { type: mongoose.SchemaTypes.String, required: true },
};
const collectionName = "categories"; // Name of the collection of documents
const newsSchema = mongoose.Schema(schema);
const Categories = mongoose.model(collectionName, newsSchema);
module.exports = Categories;