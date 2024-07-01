const mongoose = require("mongoose");

// Definição do esquema para Courses
const courseSchema = new mongoose.Schema(
  {
  name: String
  }
);

// Criando o modelo Course
const Course = mongoose.model("Course", courseSchema, "Courses");

module.exports = Course;
