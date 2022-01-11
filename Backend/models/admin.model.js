const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
