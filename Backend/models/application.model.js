const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    dob: { type: String, required: true, trim: true },
    CV: { type: String, required: true, trim: true },
    status:{ type: String, default:'pending' },
    createdAt: { type: Date, default: Date.now },
});

const jobApplication = mongoose.model("jobApplication", jobApplicationSchema);

module.exports = jobApplication;
