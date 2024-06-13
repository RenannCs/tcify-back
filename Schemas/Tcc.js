const mongoose = require("mongoose")

const tccSchema = new mongoose.Schema({
    title: String, 
    summary: String,
    grade: Number,
    supervisor: String,
    date: Date,
    status: Number,
    document: String,
    monography: String,
    zip: String,
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses"
    },
    image: String
})

const tccModel = mongoose.model("TCC" , tccSchema , "TCCs");

module.exports =  tccModel;
