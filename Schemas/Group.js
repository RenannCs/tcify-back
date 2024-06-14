const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    students: Array,
    leaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    status: String
})

const ModelGroup = mongoose.model("Group" , groupSchema , "Groups");

module.exports = ModelGroup;