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
      validate: async (_id) => {
        if (_id) {
          if ((await Course.findById(_id)) == null) {
            throw new Error("Curso não existe!");
          }
        }
      },
      default: null,
    },
    register: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    linkedin: String,
    user_type: {
      type: String,
      default: "Estudante",
      enum: {
        values: ["Administrador", "Professor", "Estudante"],
        message: "Tipo de usuário não suportado!",
      },
    },
    image: {
      type: String,
      default: null,
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
      async validateTokenId(id) {
        const resp = await this.exists({ _id: new ObjectId(id) }).exec();
        if (resp == null) {
          return false;
        }
        return true;
      },
      validatePermission(type) {
        return ["Professor", "Administrador"].includes(type);
      },
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
          status: "1",
        }).exec();
      },
    },
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  user.name = user.name ? user.name.trim() : null;
  user.register = user.register ? user.register.trim() : null;
  user.email = user.email ? user.email.trim() : null;
  user.password = user.password ? user.password.trim() : null;
  user.phone_number = user.phone_number ? user.phone_number.trim() : null;
  user.link = user.link ? user.link.trim() : null;
  user.linkedin = user.linkedin ? user.linkedin.trim() : null;
  user.user_type = user.user_type ? user.user_type.trim() : null;
  user.image = user.image ? user.image.trim() : null;

  if (user.isModified("password") || user.isNew) {
    user.password = md5(user.password);
  }
  next();
});

const ModelUser = mongoose.model("User", userSchema, "Users");

module.exports = ModelUser;
