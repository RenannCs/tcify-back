const mongoose = require("mongoose");
const User = require("./User");
const Tcc = require("./Tcc");
const Course = require("./Course");
const { ObjectId } = require("mongodb");
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
      async single(_id) {
        if (!ObjectId.isValid(_id)) {
          return null;
        }
        const group = await this.findById(_id)
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

        return {
          _id: group._id,

          title: group.title ? group.title : null,

          students: group.students,

          course_id: group.course_id ? group.course_id._id : null,
          course: group.course_id ? group.course_id.name : null,

          supervisor: group.supervisor_id ? group.supervisor_id.name : null,
          supervisor_id: group.supervisor_id ? group.supervisor_id._id : null,

          project: group.tcc_id ? group.tcc_id : null,

          leader: group.leader_id ? group.leader_id.name : null,
          leader_id: group.leader_id ? group.leader_id._id : null,

          status: group.status ? group.status : null,
        };
      },
      async all() {
        const groups = await this.find()
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

        return groups.map((group) => ({
          _id: group._id,

          title: group.title,

          students: group.students,

          course_id: group.course_id ? group.course_id._id : null,
          course: group.course_id ? group.course_id.name : null,

          supervisor: group.supervisor_id ? group.supervisor_id.name : null,
          supervisor_id: group.supervisor_id ? group.supervisor_id._id : null,

          project: group.tcc_id ? group.tcc_id : null,

          leader: group.leader_id ? group.leader_id.name : null,
          leader_id: group.leader_id ? group.leader_id._id : null,

          status: group.status,
        }));
      },
      async allFilter(query) {
        const groups = await this.find(query)
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

        return groups.map((group) => ({
          _id: group._id,

          title: group.title,

          students: group.students,

          course_id: group.course_id ? group.course_id._id : null,
          course: group.course_id ? group.course_id.name : null,

          supervisor: group.supervisor_id ? group.supervisor_id.name : null,
          supervisor_id: group.supervisor_id ? group.supervisor_id._id : null,

          project: group.tcc_id ? group.tcc_id : null,

          leader: group.leader_id ? group.leader_id.name : null,
          leader_id: group.leader_id ? group.leader_id._id : null,

          status: group.status,
        }));
      },

      existsByStudent(_id) {
        return this.exists({ students: _id }).exec();
      },
      async findByStudent(_id) {
        const groups = await this.find({students: _id})
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

        return groups.map((group) => ({
          _id: group._id,

          title: group.title,

          students: group.students,

          course_id: group.course_id ? group.course_id._id : null,
          course: group.course_id ? group.course_id.name : null,

          supervisor: group.supervisor_id ? group.supervisor_id.name : null,
          supervisor_id: group.supervisor_id ? group.supervisor_id._id : null,

          project: group.tcc_id ? group.tcc_id : null,

          leader: group.leader_id ? group.leader_id.name : null,
          leader_id: group.leader_id ? group.leader_id._id : null,

          status: group.status,
        }));
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
