const mongoose = require("mongoose")

const tccSchema = new mongoose.Schema({
    title: String, 
    summary: String,
    grade: Number,
    
    date: Date,
    status: Number,
    document: String,
    monography: String,
    zip: String,
    supervisor: String,
    supervisor_id: mongoose.Types.ObjectId,
    group_id: mongoose.Types.ObjectId,
    students: [],
    course_id: mongoose.Types.ObjectId,
    course_name: String,
    image: String
})

const tccModel = mongoose.model("TCC" , tccSchema , "TCCs");

module.exports =  tccModel;
