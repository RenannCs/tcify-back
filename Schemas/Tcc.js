const mongoose = require("mongoose");
const { BSON, ObjectId } = require("mongodb");
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
      async single(_id) {
        if (!ObjectId.isValid(_id)) {
          return null;
        }
        const tcc = await this.findById(_id)
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
        if (tcc == null) {
          return null;
        }
        return {
          _id: tcc.id,

          title: tcc.title ? tcc.title : null,
          summary: tcc.summary ? tcc.summary : null,
          grade: tcc.grade,

          status: tcc.status ? tcc.status : null,

          document: tcc.document
            ? `${process.env.API_PATH}${tcc.document}`
            : null,

          monography: tcc.monography
            ? `${process.env.API_PATH}${tcc.monography}`
            : null,

          zip: tcc.zip ? `${process.env.API_PATH}${tcc.zip}` : null,

          image: tcc.image
            ? `${process.env.API_PATH}${tcc.image}`
            : `${process.env.API_PATH}${process.env.TCC_PICTURE_DEFAULT}`,

          supervisor: tcc.supervisor_id ? tcc.supervisor_id.name : null,
          supervisor_id: tcc.supervisor_id ? tcc.supervisor_id._id : null,

          group_id: tcc.group_id ? tcc.group_id._id : null,
          students: tcc.group_id ? tcc.group_id.students : null,

          course_id: tcc.course_id ? tcc.course_id._id : null,
          course: tcc.course_id ? tcc.course_id.name : null,

          date: new Date(tcc.date).getFullYear().toString(),
        };
      },
      async all() {
        const tccs = await this.find({})
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

        return tccs.map((tcc) => ({
          _id: tcc.id,

          title: tcc.title ? tcc.title : null,
          summary: tcc.summary ? tcc.summary : null,
          grade: tcc.grade,

          status: tcc.status ? tcc.status : null,

          document: tcc.document
            ? `${process.env.API_PATH}${tcc.document}`
            : null,

          monography: tcc.monography
            ? `${process.env.API_PATH}${tcc.monography}`
            : null,

          zip: tcc.zip ? `${process.env.API_PATH}${tcc.zip}` : null,

          image: tcc.image
            ? `${process.env.API_PATH}${tcc.image}`
            : `${process.env.API_PATH}${process.env.TCC_PICTURE_DEFAULT}`,

          supervisor: tcc.supervisor_id ? tcc.supervisor_id.name : null,
          supervisor_id: tcc.supervisor_id ? tcc.supervisor_id._id : null,

          group_id: tcc.group_id ? tcc.group_id._id : null,
          students: tcc.group_id ? tcc.group_id.students : null,

          course_id: tcc.course_id ? tcc.course_id._id : null,
          course: tcc.course_id ? tcc.course_id.name : null,

          date: new Date(tcc.date).getFullYear().toString(),
        }));
      },
      async allFilter(query) {
        const tccs = await this.find(query)
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

        return tccs.map((tcc) => ({
          _id: tcc.id,

          title: tcc.title ? tcc.title : null,
          summary: tcc.summary ? tcc.summary : null,
          grade: tcc.grade,

          status: tcc.status ? tcc.status : null,

          document: tcc.document
            ? `${process.env.API_PATH}${tcc.document}`
            : null,

          monography: tcc.monography
            ? `${process.env.API_PATH}${tcc.monography}`
            : null,

          zip: tcc.zip ? `${process.env.API_PATH}${tcc.zip}` : null,

          image: tcc.image
            ? `${process.env.API_PATH}${tcc.image}`
            : `${process.env.API_PATH}${process.env.TCC_PICTURE_DEFAULT}`,

          supervisor: tcc.supervisor_id ? tcc.supervisor_id.name : null,
          supervisor_id: tcc.supervisor_id ? tcc.supervisor_id._id : null,

          group_id: tcc.group_id ? tcc.group_id._id : null,
          students: tcc.group_id ? tcc.group_id.students : null,

          course_id: tcc.course_id ? tcc.course_id._id : null,
          course: tcc.course_id ? tcc.course_id.name : null,

          date: new Date(tcc.date).getFullYear().toString(),
        }));
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
              select: [
                "name",
                "email",
                "link",
                "linkedin",
                "image",
                ,
                "register",
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
