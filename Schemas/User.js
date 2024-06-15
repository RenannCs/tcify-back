const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    course_id: mongoose.Types.ObjectId,
    course_name: String,
    register: String,
    email: String,
    password: String,
    phone_number: String,
    github: String,
    linkedin: String,
    user_type: String,
    image: String
});

const ModelUser = mongoose.model("User", userSchema, "Users");

module.exports = ModelUser;
