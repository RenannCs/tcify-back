const mongoose = require("mongoose");

// Definição do esquema para Courses
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    default: "0",
  },
});

courseSchema.pre("save", function (next) {
  const course = this;
  course.name = course.name ? course.name.trim() : undefined;
  course.description = course.description
    ? course.description.trim()
    : undefined;

  next();
});

// Criando o modelo Course
const Course = mongoose.model("Course", courseSchema, "Courses");

module.exports = Course;
