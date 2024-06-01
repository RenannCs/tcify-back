const ModelUser = require("../Schemas/User");
const ModelCourse = require('../Schemas/Course');
const { ObjectId } = require("mongodb");

const md5 = require("md5");
module.exports = class User { 
  constructor(
    id = undefined,
    name = undefined,
    course_name = undefined,
    course_id = undefined,
    email = undefined,
    password = undefined,
    phone_number = undefined,
    github = undefined,
    linkedin = undefined,
    user_type = undefined,
    register = undefined,
    image = undefined,
    
  ) {
    this.id = id;
    this.name = name;
    this.course_name = course_name;
    this.course_id = course_id;
    this.email = email;
    this.password = password;
    this.phone_number = phone_number;
    this.github = github;
    this.linkedin = linkedin;
    this.user_type = user_type;
    this.register = register;
    this.image = image;
    
  }

  insert() {
    const user = new ModelUser();
    if (this.name != undefined) {
      user.name = this.name.trim();
    }

    if (this.course_name != undefined) {
      user.course_name = this.course_name.trim();
    }

    if (this.course_id != undefined) {
      user.course_id = this.course_id.trim();
    }

    if (this.email != undefined) {
      user.email = this.email.trim();
    }

    if (this.password != undefined) {
      const newPassword = md5(this.password.trim());
      user.password = newPassword;
    }
    
    if (this.phone_number != undefined) {
      user.phone_number = this.phone_number.trim();
    }
    if (this.github != undefined) {
      user.github = this.github.trim();
    }

    if (this.linkedin != undefined) {
      user.linkedin = this.linkedin.trim();
    }

    if (this.user_type != undefined) {
      user.user_type = this.user_type;
    }

    if (this.register != undefined) {
      user.register = this.register.trim();
    }
    if(this.image != undefined){
      user.image = this.image;
    }

    return user.save();
  }

  all() {
    const resp = ModelUser.find().populate({
      path: "course_id",
      model: "Course",
      select: "name"
    });
    return resp;
  }
    
  allFields(fields) {
    const resp = ModelUser.find().select(fields).populate({
      path: "course_id",
      model: "Course",
      select: "name"
    });
    return resp;
  }

  singleByRegister() {
    const resp =  ModelUser.findOne().where("register").equals(this.register).populate({
      path: "course_id",
      model: "Course",
      select: "name"
    });
    return resp;
  } 

  singleFields(fields){
    const resp = ModelUser.findById(this.id).select(fields).populate({
      path: "course_id",
      model: "Course",
      select: "name"
    });
    return resp;
  }
  singleFieldsByRegister(fields){
    const resp = ModelUser.where("register").equals(this.register).select(fields).populate({
      path: "course_id",
      model: "Course",
      select: "name"
    });
    return resp;
  }
  single() {
    const resp = ModelUser.findById(this.id).populate({
      path: "course_id",
      model: "Course",
      select: "name"
    });
    return resp;
  }

  delete() {
    const resp = ModelUser.findByIdAndDelete(this.id);
    return resp;
  }

  login() {
    const newPassword = md5(this.password);
    const resp =  ModelUser.exists({
      "$or": [{ register: this.register }, { email: this.register }],
    "password": newPassword,
    }).select(["_id" , "user_type"]);
    
    return resp;
  }

  exists() {
    const res = ModelUser.exists({ "$or": [{ "_id": new ObjectId(this.id) }, { "email": this.email }, { "register": this.register }] });
    return res;
  }

  async update() {
    const user = await ModelUser.findById(this.id);
    if (this.name != undefined) {
      user.name = this.name.trim();
    }

    if (this.course_name != undefined) {
      user.course_name = this.course_name.trim();
    }

    if (this.course_id != undefined) {
      user.course_id = this.course_id.trim();
    }

    if (this.email != undefined) {
      user.email = this.email.trim();
    }

    if (this.password != undefined) {
      const newPassword = md5(this.password.trim());
      user.password = newPassword;
    }

    if (this.phone_number != undefined) {
      user.phone_number = this.phone_number.trim();
    }

    if (this.github != undefined) {
      user.github = this.github.trim();
    }

    if (this.linkedin != undefined) {
      user.linkedin = this.linkedin.trim();
    }

    if (this.user_type != undefined) {
      user.user_type = this.user_type.trim();
    }

    if (this.register != undefined) {
      user.register = this.register.trim();
    }
    if(this.image != undefined){
      user.image = this.image;
    }

    return user.save();
  }

  get id(){
    return this._id;
  }
  set id(v){
    this._id = v;
  }
  get name(){
    return this._name;
  }
  set name(v){
    this._name = v; 
  }
  get course_name(){
    return this._course_name;
  }
  set course_name(v){
    this._course_name = v;
  }
  get course_id(){
    return this._course_id;
  }
  set course_id(v){
    this._course_id = v;
  }
  get email(){
    return this._email;
  }
  set email(v){
    this._email = v;
  }
  get password(){
    return this._password;
  }
  set password(v){
    this._password = v;
  }
  get phone_number(){
    return this._phone_number;
  }
  set phone_number(v){
    this._phone_number = v;
  }
  get github(){
    return this._github;
  }
  set github(v){
    this._github = v;
  }
  get linkedin(){
    return this._linkedin;
  }
  set linkedin(v){
    this._linkedin = v;
  }
  get user_type(){
    return this._user_type;
  }
  set user_type(v){
    this._user_type = v;
  }
  get image(){
    return this._image;
  }
  set image(v){
    this._image = v;
  }
  get register(){
    return this._register;
  }
  set register(v){
    this._register = v;
  }
};
