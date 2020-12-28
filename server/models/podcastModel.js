//Akshay Raikar
const mongoose = require("../database/fiveberg_db");
const schema = {
    channel: { type: mongoose.SchemaTypes.String, required: true },
    episode: { type: mongoose.SchemaTypes.Number, required: true },
    title: { type: mongoose.SchemaTypes.String, required: true },
    source: { type: mongoose.SchemaTypes.String, required: true },
    length: { type: mongoose.SchemaTypes.Number, required: true },
    desc: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    publish_date: { type: mongoose.SchemaTypes.Date, required: true },
    update_date: { type: mongoose.SchemaTypes.Date, required: true },
};
const collectionName = "podcasts"; // Name of the collection of documents
const podcastSchema = mongoose.Schema(schema);
const Podcast = mongoose.model(collectionName, podcastSchema);
module.exports = Podcast;