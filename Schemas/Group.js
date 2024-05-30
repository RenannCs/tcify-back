const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    students: Array
})

const ModelGroup = mongoose.model("Group" , groupSchema , "Groups");

module.exports = ModelGroup;