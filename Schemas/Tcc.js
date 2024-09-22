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
    names_string: {
      type: String,
      default: null,
    },
  },
  {
    statics: {
      async addNamesString(_id) {
        try {
          const User = require("./User");
          const Group = require("./Group");
          const tcc = await this.findById(_id).exec();
          const group_id = tcc.group_id;
          const group = await Group.findById(group_id).exec();

          const students = group.students;
          let names_string = "";
          let primeiro = true;

          for (let student_id of students) {
            let student = await User.findById(student_id).exec();
            let name = student.name;
            if (primeiro) {
              names_string += name;
              primeiro = false;
            } else {
              names_string += ", " + name;
            }
          }

          tcc.names_string = names_string;

          tcc.save();
        } catch (error) {
          console.log("Erro em Schemas/Tcc/post.save");
          console.error(error.message);
        }
      },
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
          names_string: tcc.names_string,
          course_id: tcc.course_id ? tcc.course_id._id : null,
          course: tcc.course_id ? tcc.course_id.name : null,

          date: new Date(tcc.date).getFullYear().toString(),
        }));
      },

      async allPublic(
        title,
        students,
        date,
        course_id,
        supervisor_id,
        limit,
        page
      ) {
        let query = { status: "1" };

        if (title) {
          const regex_title = `(?i).*${title}.*(?-i)`;
          query.title = { $regex: regex_title };
        }
        if (students) {
          const regex_students = `(?i).*${students}.*(?-i)`;
          query.names_string = { $regex: regex_students };
        }
        if (date) {
          const query_year = {
            $eq: [{ $year: "$date" }, date],
          };
          query.$expr = query_year;
        }
        if (course_id) {
          query.course_id = course_id;
        }
        if (supervisor_id) {
          query.supervisor_id = supervisor_id;
        }

        const tccs = await this.find(query)
          .populate({
            path: "group_id",
            model: "Group",
            select: "students",
            populate: {
              path: "students",
              model: "User",
              select: ["name", "register", "email", "link", "image"],
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
          .limit(limit)
          .skip((page - 1) * limit)
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
      async singleByGroup(_id) {
        const tcc = await this.findOne({ group_id: _id })
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
    },
  }
);

tccSchema.pre("save", function (next) {
  const tcc = this;
  tcc.title = tcc.title ? tcc.title.trim() : undefined;
  tcc.summary = tcc.summary ? tcc.summary.trim() : undefined;

  next();
});
/*
tccSchema.post("save", async function (tcc) {
  const User = require("./User");
  const Group = require("./Group");
  try {
    const group_id = tcc.group_id;
    const group = await Group.findById(group_id).exec();

    const students = group.students;
    let names_string = "";
    let primeiro = true;

    for (let student_id of students) {
      let student = await User.findById(student_id).exec();
      let name = student.name;
      if (primeiro) {
        names_string += name;
        primeiro= false;
      } else {
        names_string += ", " + name;
      }
    }

    tcc.names_string = names_string;

    tcc.save();
    console.log("aqui")
  } catch (error) {
    console.log("Erro em Schemas/Tcc/post.save");
    console.error(error.message);
  }
});*/

const tccModel = mongoose.model("TCC", tccSchema, "TCCs");

module.exports = tccModel;
