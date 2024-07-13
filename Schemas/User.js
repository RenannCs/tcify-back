const md5 = require("md5");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    course_id: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    register: String,
    email: String,
    password: String,
    phone_number: String,
    link: String,
    linkedin: String,
    user_type: String,
    image: String,
    status: Boolean,
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
        return this.exists({
          $or: [{ register: user }, { email: user }],
          password: newPassword,
          status: true
        }).exec();
      },
    },
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    user.password = md5(user.password);
  }
  next();
});

const ModelUser = mongoose.model("User", userSchema, "Users");

module.exports = ModelUser;
