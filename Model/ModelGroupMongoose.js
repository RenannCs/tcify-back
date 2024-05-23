const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    id_tcc: ObjectId,
    student1: {
        _id: ObjectId,
        name: String,
        register: String,
        course_name: String,
        email: String,
        phone_number: String,
        github: String,
        linkedin: String,
    },
    student2: {
        _id: ObjectId,
        name: String,
        register: String,
        course_name: String,
        email: String,
        phone_number: String,
        github: String,
        linkedin: String,
    },
    student3: {
        _id: ObjectId,
        name: String,
        course_name: String,
        register: String,
        email: String,
        phone_number: String,
        github: String,
        linkedin: String,
    }
})

const ModelGroup = mongoose.model("Group" , groupSchema , "Groups");

module.exports = ModelGroup;