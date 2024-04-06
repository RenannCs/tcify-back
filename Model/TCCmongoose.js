const mongoose = require("mongoose")

const tccSchema = new mongoose.Schema({
    title: String, 
    summary: String,
    grade: Number,
    supervisor: String,
    date: String,
    status: Boolean,
    file: {document: String , monography: String , zip: String},
    group: { 
        students: Array
    },
    course_id: String,
    course_name: String,
    image: String
})

const tccModel = mongoose.model("TCC" , tccSchema , "TCCs");

module.exports = {
    tccModel
}