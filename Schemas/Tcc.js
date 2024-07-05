const mongoose = require("mongoose");


const tccSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    grade: Number,
    date: Date,
    status: String,
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
      
      single(id){
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
      existsByGroup(id) {
        return this.exists({ group_id: id }).exec();
      },
      singleByGroup(id){
        return this.findOne({group_id: id})
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
      }
    },
  }
);

const tccModel = mongoose.model("TCC", tccSchema, "TCCs");

module.exports = tccModel;
