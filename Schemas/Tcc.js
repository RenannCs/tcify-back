const mongoose = require("mongoose");

const tccSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    summary: {
      type: String,
      default: null,
    },
    grade: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: function () {
        const date = new Date();
        return date.toISOString();
      },
    },
    status: {
      type: String,
      default: "0",
    },
    document: {
      type: String,
      default: null,
    },
    monography: {
      type: String,
      default: null,
    },
    zip: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    group_id: {
      type: mongoose.Types.ObjectId,
      ref: "Group",
      default: null,
    },
    course_id: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      default: null,
    },
    supervisor_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    statics: {
      single(id) {
        return this.findById(id)
          .populate({
            path: "group_id",
            model: "Group",
            select: "students",
            populate: {
              path: "students",
              model: "User",
              select: [
                "name",
                "email",
                "link",
                "image",
                "course_id",
                "register",
              ],
              populate: {
                path: "course_id",
                model: "Course",
                select: "name",
              },
            },
          })
          .populate({
            path: "group_id",
            model: "Group",
            select: "leader_id",
            populate: {
              path: "leader_id",
              model: "User",
              select: "name",
            },
          })
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .populate({
            path: "supervisor_id",
            model: "User",
            select: "name",
          })
          .exec();
      },
      all() {
        return this.find({})
          .populate({
            path: "group_id",
            model: "Group",
            select: "students",
            populate: {
              path: "students",
              model: "User",
              select: [
                "name",
                "register",
                "email",
                "link",
                "linkedin",
                "image",
              ],
            },
          })
          .populate({
            path: "group_id",
            model: "Group",
            select: "leader_id",
            populate: {
              path: "leader_id",
              model: "User",
              select: "name",
            },
          })
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
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
            path: "group_id",
            model: "Group",
            select: "students",
            populate: {
              path: "students",
              model: "User",
              select: [
                "name",
                "register",
                "email",
                "link",
                "linkedin",
                "image",
              ],
            },
          })
          .populate({
            path: "group_id",
            model: "Group",
            select: "leader_id",
            populate: {
              path: "leader_id",
              model: "User",
              select: "name",
            },
          })
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .populate({
            path: "supervisor_id",
            model: "User",
            select: "name",
          })
          .exec();
      },
      existsByGroup(id) {
        return this.exists({ group_id: id }).exec();
      },
      singleByGroup(id) {
        return this.findOne({ group_id: id })
          .populate({
            path: "group_id",
            model: "Group",
            select: "students",
            populate: {
              path: "students",
              model: "User",
              select: ["name", "email", "link", "linkedin", "image" , , "register"],
            },
          })
          .populate({
            path: "group_id",
            model: "Group",
            select: "leader_id",
            populate: {
              path: "leader_id",
              model: "User",
              select: "name",
            },
          })
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
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

tccSchema.pre("save", function (next) {
  const tcc = this;
  tcc.title = tcc.title ? tcc.title.trim() : undefined;
  tcc.summary = tcc.summary ? tcc.summary.trim() : undefined;

  next();
});

const tccModel = mongoose.model("TCC", tccSchema, "TCCs");

module.exports = tccModel;
