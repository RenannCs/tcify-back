const mongoose = require("mongoose");

const tccSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
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
    document: String,
    monography: String,
    zip: String,
    image: String,
    group_id: {
      type: mongoose.Types.ObjectId,
      ref: "Group",
    },
    course_id: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    supervisor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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
              select: ["name", "email", "link", "linkedin", "image"],
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
            path: "supervisor",
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
            path: "supervisor",
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
            path: "supervisor",
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
              select: ["name", "email", "link", "linkedin", "image"],
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
            path: "supervisor",
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
