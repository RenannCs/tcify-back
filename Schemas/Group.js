const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    students: Array,
    leaderId: mongoose.Types.ObjectId,
    leaderName: String,
    status: String
})

const ModelGroup = mongoose.model("Group" , groupSchema , "Groups");

module.exports = ModelGroup;