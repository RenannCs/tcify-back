const mongoose = require("mongoose");
const Tcc = require("./TCC")
const groupSchema = new mongoose.Schema(
  {
    title: String,
    students: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    course_id: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    supervisor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    tcc_id: {
      type: mongoose.Types.ObjectId,
      ref: "TCC",
    },
    leader_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: String,
  },
  {
    statics: {
      single(id) {
        return this.findById(id)
          .populate({
            path: "students",
            model: "User",
            select: ["name", "email", "link", "linkedin", "image"],
          })
          .populate({
            path: "leader_id",
            model: "User",
            select: "name",
          })
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .populate({
            path: "tcc_id",
            model: "TCC",
          })
          .populate({
            path: "supervisor",
            model: "User",
            select: "name",
          })
          .exec();
      },
      all() {
        return this.find()
          .populate({
            path: "students",
            model: "User",
            select: ["name", "email", "link", "linkedin", "image"],
          })
          .populate({
            path: "leader_id",
            model: "User",
            select: "name",
          })
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .populate({
            path: "tcc_id",
            model: "TCC",
          })
          .populate({
            path: "supervisor",
            model: "User",
            select: "name",
          })
          .exec();
      },
      existsByStudent(id) {
        return this.exists({ students: id }).exec();
      },
      findByStudentId(id) {
        return this.findOne({ students: id })
          .populate({
            path: "students",
            model: "User",
            select: ["name", "email", "link", "linkedin", "image"],
          })
          .populate({
            path: "leader_id",
            model: "User",
            select: "name",
          })
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .populate({
            path: "tcc_id",
            model: "TCC",
          })
          .populate({
            path: "supervisor",
            model: "User",
            select: "name",
          })
          .exec();
      },
    },
  }
);


const ModelGroup = mongoose.model("Group", groupSchema, "Groups");

module.exports = ModelGroup;
