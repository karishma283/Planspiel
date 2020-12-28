//Taleh Muzaffarov

const mongoose = require("../database/fiveberg_db");
const schema = {
    firstname: { type: mongoose.SchemaTypes.String, required: true },
    lastname: { type: mongoose.SchemaTypes.String, required: true },
    email: { type: mongoose.SchemaTypes.String, required: true },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    category: [{ type: mongoose.SchemaTypes.ObjectId, required: true }],
    quizes: [{ type: mongoose.SchemaTypes.ObjectId, required: false }]
};
const collectionName = "users"; // Name of the collection of documents
const usersSchema = mongoose.Schema(schema);
const Users = mongoose.model(collectionName, usersSchema);
module.exports = Users;