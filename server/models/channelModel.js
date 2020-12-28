//Akshay Raikar
const mongoose = require("../database/fiveberg_db");
const schema = {
    category: { type: mongoose.SchemaTypes.String, required: true },
    name: { type: mongoose.SchemaTypes.String, required: true },
    img: { type: mongoose.SchemaTypes.String, required: true },
    desc: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    publish_date: { type: mongoose.SchemaTypes.Date, required: true },
    update_date: { type: mongoose.SchemaTypes.Date, required: true },
};
const collectionName = "channels"; // Name of the collection of documents
const channelSchema = mongoose.Schema(schema);
const Channel = mongoose.model(collectionName, channelSchema);
module.exports = Channel;