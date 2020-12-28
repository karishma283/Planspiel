//Akshay Raikar

const mongoose = require("../database/fiveberg_gmf_db");
const schema = {
    point: { type: mongoose.SchemaTypes.Number, required: true, index: { unique: true } },
    provider_ids: [{ type: mongoose.SchemaTypes.ObjectId, required: true }]
};
const collectionName = "discount_providers"; // Name of the collection of documents
const discountProvidersSchema = mongoose.Schema(schema);
const discountProviders = mongoose.model(collectionName, discountProvidersSchema);
module.exports = discountProviders;