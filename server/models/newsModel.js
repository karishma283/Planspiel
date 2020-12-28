//Akshay Raikar
const mongoose = require("../database/fiveberg_db");
const schema = {
    category: { type: mongoose.SchemaTypes.ObjectId, required: true },
    img: { type: mongoose.SchemaTypes.String, required: true },
    title: { type: mongoose.SchemaTypes.String, required: true },
    url: { type: mongoose.SchemaTypes.String, required: true },
    desc: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    content: { type: mongoose.SchemaTypes.String, required: true },
    publish_date: { type: mongoose.SchemaTypes.Date, required: true },
    update_date: { type: mongoose.SchemaTypes.Date, required: true },
};
const collectionName = "news"; // Name of the collection of documents
const newsSchema = mongoose.Schema(schema);
const News = mongoose.model(collectionName, newsSchema);
module.exports = News;