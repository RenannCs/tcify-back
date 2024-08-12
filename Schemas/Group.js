const mongodb = require("mongodb");
const mongoose = require("mongoose");
const User = require("./User");
const Tcc = require("./Tcc");
const groupSchema = new mongoose.Schema(
  {
    title: String,
    students: {
      required: true,
      type: [mongoose.Types.ObjectId],
      ref: "User",
    },

    course_id: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    supervisor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tcc_id: {
      type: mongoose.Types.ObjectId,
      ref: "TCC",
    },
    leader_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "0",
    },
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
            select: ["name", "register", "email", "link", "linkedin", "image"],
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
      findByStudent(id) {
        return this.findOne({ students: id })
          .populate({
            path: "students",
            model: "User",
            select: ["name", "register", "email", "link", "linkedin", "image"],
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

groupSchema.pre("save", function (next) {
  const group = this;
  group.title = group.title ? group.title.trim() : undefined;
  next();
});

const ModelGroup = mongoose.model("Group", groupSchema, "Groups");

module.exports = ModelGroup;
