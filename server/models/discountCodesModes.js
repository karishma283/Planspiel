//Akshay Raikar
const mongoose = require("../database/fiveberg_gmf_db");
const schema = {
    provider_id: { type: mongoose.SchemaTypes.ObjectId, required: true, index: { unique: true } },
    codes: [{ type: mongoose.SchemaTypes.String, required: true }],
};
const collectionName = "discount_codes"; // Name of the collection of documents
const discountCodesSchema = mongoose.Schema(schema);
const discountCodes = mongoose.model(collectionName, discountCodesSchema);
module.exports = discountCodes;