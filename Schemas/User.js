const md5 = require("md5");
const mongoose = require("mongoose");
const Course = require("../Schemas/Course");
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
    },
    register: {
      type: String,
      required: true,
    },
    email: String,
    password: {
      type: String,
      required: true,
    },
    phone_number: String,
    link: String,
    linkedin: String,
    user_type: {
      type: String,
      required: true,

      validate: (type) => {
        if (!["Estudante", "Professor", "Administrador"].includes(type)) {
          throw new Error("Tipo de usuário inválido!");
        }
      },
    },
    image: String,
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    statics: {
      single(id) {
        return this.findById(id)
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .exec();
      },
      all() {
        return this.find({})
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .exec();
      },
      allFields(fields) {
        return this.find({})
          .select(fields)
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .exec();
      },
      allFilter(filter) {
        return this.find(filter)
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .exec();
      },
      allFilterFields(filter, fields) {
        return this.find(filter)
          .select(fields)
          .populate({
            path: "course_id",
            model: "Course",
            select: "name",
          })
          .exec();
      },
      login(user, password) {
        const newPassword = md5(password);
        return this.findOne({
          $or: [{ register: user }, { email: user }],
          password: newPassword,
          status: true,
        }).exec();
      },
    },
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  user.name = user.name.trim() ? user.name.trim() : undefined;
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
