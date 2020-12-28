//Taleh Muzaffarov

const mongoose = require("../database/fiveberg_db");
const schema = {
    user_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    provider_id: { type: mongoose.SchemaTypes.ObjectId, required: true, index: { unique: true } },

    expiration_date: { type: mongoose.SchemaTypes.Date, required: false },
    activation_date: { type: mongoose.SchemaTypes.Date, required: false }
};
const collectionName = "subscription"; // Name of the collection of documents
const subscriptionSchema = mongoose.Schema(schema);
const Subscription = mongoose.model(collectionName, subscriptionSchema);
module.exports = Subscription;