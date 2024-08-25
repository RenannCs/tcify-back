const mongoose = require("mongoose");
const User = require("./User");
const Tcc = require("./Tcc");
const Course = require("./Course");
const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    students: {
      required: true,
      type: [mongoose.Types.ObjectId],
      ref: "User",
      default: [],
    },

    course_id: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      validate: async (_id) => {
        if ((await Course.findById(_id)) == null) {
          throw new Error("Curso não existe!");
        }
      },
    },
    supervisor_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      validate: async (_id) => {
        if (
          (await User.exists({
            $and: [{ _id: _id }, { user_type: "Professor" }],
          })) == null
        ) {
          throw new Error("Professor não existe!");
        }
      },
    },
    tcc_id: {
      type: mongoose.Types.ObjectId,
      ref: "TCC",
      default: null,
      validate: async (_id) => {
        if (_id) {
          if ((await Tcc.findById(_id)) == null) {
            throw new Error("TCC não existe!");
          }
        }
      },
    },
    leader_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      validate: async (_id) => {
        if (_id) {
          if ((await User.findById(_id)) == null) {
            throw new Error("Líder não existe!");
          }
        }
      },
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
            path: "supervisor_id",
            model: "User",
            select: "name",
          })
          .exec();
      },
      allFilter(filter) {
        return this.find(filter)
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
            path: "supervisor_id",
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
            path: "supervisor_id",
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
            path: "supervisor_id",
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
