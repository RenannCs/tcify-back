const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    id_tcc: ObjectId,
    students: Array
})

const ModelGroup = mongoose.model("Group" , groupSchema , "Groups");

module.exports = ModelGroup;