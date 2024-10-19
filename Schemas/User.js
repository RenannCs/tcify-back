const md5 = require("md5");
const mongoose = require("mongoose");
const Course = require("../Schemas/Course");
const Group = require("../Schemas/Group");
const { ObjectId } = require("mongodb");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course_id: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      /*validate: async (_id) => {
        const Course = require("./Course");
        if (_id) {
          if ((await Course.findById(_id)) == null) {
            throw new Error("Curso não existe!");
          }
        }
      },*/
    },
    group_id: {
      type: mongoose.Types.ObjectId,
      ref: "Group",
    },
    register: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
    },
    link: {
      type: String,
    },
    user_type: {
      type: String,
      default: "Estudante",
      /*enum: {
        values: ["Administrador", "Professor", "Estudante"],
        message: "Tipo de usuário não suportado!",
      },*/
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      default: "0",
    },
    date: {
      type: Date,
      default: function () {
        const date = new Date();
        return date.toISOString();
      },
    },
  },
  {
    statics: {
      async validateTokenId(_id) {
        if (!ObjectId.isValid(_id)) {
          return null;
        }
        const resp = await this.exists({ _id: new ObjectId(_id) }).exec();
        if (resp == null) {
          return false;
        }
        return true;
      },
      validatePermission(type) {
        return ["Professor", "Administrador"].includes(type);
      },
      async single(_id) {
        if (!ObjectId.isValid(_id)) {
          return null;
        }
        const user = await this.findById(_id)
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .exec();

        if (user == null) {
          return null;
        }

        return {
          _id: user.id,
          register: user.register,
          name: user.name,

          course_id: user.course_id ? user.course_id._id : "N/A",
          course: user.course_id ? user.course_id.name : "N/A",

          group_id: user.group_id ? user.group_id : null,

          email: user.email ? user.email : null,
          phone_number: user.phone_number ? user.phone_number : null,

          link: user.link ? user.link : null,
          image: user.image
            ? `${process.env.API_PATH}${user.image}`
            : `${process.env.API_PATH}${process.env.USER_PROFILE_PICTURE_DEFAULT}`,

          user_type: user.user_type,

          status: user.status,
        };
      },
      async all() {
        const users = await this.find({})
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .exec();

        return users.map((user) => ({
          _id: user._id,
          register: user.register,
          name: user.name,

          course_id: user.course_id ? user.course_id._id : "N/A",
          course: user.course_id ? user.course_id.name : "N/A",

          group_id: user.group_id ? user.group_id : null,

          email: user.email ? user.email : null,
          phone_number: user.phone_number ? user.phone_number : null,

          link: user.link ? user.link : null,
          image: user.image
            ? `${process.env.API_PATH}${user.image}`
            : `${process.env.API_PATH}${process.env.USER_PROFILE_PICTURE_DEFAULT}`,

          user_type: user.user_type,

          status: user.status,
        }));
      },
      async allFilter(query) {
        const users = await this.find(query)
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .exec();

        return users.map((user) => ({
          _id: user._id,
          register: user.register,
          name: user.name,

          course_id: user.course_id ? user.course_id._id : "N/A",
          course: user.course_id ? user.course_id.name : "N/A",

          group_id: user.group_id ? user.group_id : null,

          email: user.email ? user.email : null,
          phone_number: user.phone_number ? user.phone_number : null,

          link: user.link ? user.link : null,
          image: user.image
            ? `${process.env.API_PATH}${user.image}`
            : `${process.env.API_PATH}${process.env.USER_PROFILE_PICTURE_DEFAULT}`,

          user_type: user.user_type,

          status: user.status,
        }));
      },
      login(user, password) {
        const newPassword = md5(password);
        return this.findOne({
          $or: [{ register: user }, { email: user }],
          password: newPassword,
          status: "1",
        }).exec();
      },
      async addGroupId(group_id, student) {
        try {
          const _student = await this.findById(student);
          _student.group_id = group_id;
          await _student.save();
        } catch (error) {
          console.log("Erro em Schemas/User/removeGroupId:");
          console.error(error.messsage);
        }
      },
      async addGroupIds(group_id, students) {
        try {
          for (let _student of students) {
            let student = await this.findById(_student).exec();
            student.group_id = group_id;
            await student.save();
          }
        } catch (error) {
          console.log("Erro em Schemas/User/addGroupIds:");
          console.error(error.message);
        }
      },
      async removeGroupId(student_id) {
        try {
          const student = await this.updateOne(
            { _id: student_id },
            { group_id: null }
          ).exec();

          console.log(
            "Id de grupo removido de um usuário: " + student.modifiedCount
          );
        } catch (error) {
          console.log("Erro em Schemas/User/removeGroupId:");
          console.error(error.message);
        }
      },
      async removeGroupIds(students_ids) {
        try {
          let count = 0;
          for (let _student of students_ids) {
            let student = await this.updateOne(
              { _id: _student },
              { group_id: null }
            ).exec();
            count += student.modifiedCount;
          }

          console.log("Id's de grupo removidos dos usuários: " + count);
        } catch (error) {
          console.log("Erro em Schemas/User/removeGroupIds:");
          console.error(error.message);
        }
      },
    },
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  user.name = user.name ? user.name.trim() : undefined;
  user.register = user.register ? user.register.trim() : undefined;
  user.email = user.email ? user.email.trim() : undefined;
  user.password = user.password ? user.password.trim() : undefined;
  user.phone_number = user.phone_number ? user.phone_number.trim() : undefined;
  user.link = user.link ? user.link.trim() : undefined;
  user.linkedin = user.linkedin ? user.linkedin.trim() : undefined;
  user.user_type = user.user_type ? user.user_type.trim() : undefined;
  user.image = user.image ? user.image.trim() : undefined;

  if (user.isModified("password") || user.isNew) {
    user.password = md5(user.password);
  }
  next();
});

const ModelUser = mongoose.model("User", userSchema, "Users");

module.exports = ModelUser;
