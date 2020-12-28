//Akshay Raikar
const mongoose = require("../database/fiveberg_gmf_db");
const schema = {
    name: { type: mongoose.SchemaTypes.String, required: true, index: { unique: true } },
    text: { type: mongoose.SchemaTypes.String, required: true },
    img: { type: mongoose.SchemaTypes.String, required: true }
};
const collectionName = "provider_details"; // Name of the collection of documents
const providerDetailsSchema = mongoose.Schema(schema);
const providerDetails = mongoose.model(collectionName, providerDetailsSchema);
module.exports = providerDetails;