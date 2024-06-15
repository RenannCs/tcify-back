const { ObjectId } = require("mongodb");
const ModelTcc = require("../Schemas/TCC");
const Course = require('../Schemas/Course');
const Group = require('../Schemas/Group');
const User = require("../Schemas/User");
module.exports = class TCC {
  constructor(
    id = undefined,
    title = undefined,
    summary = undefined,
    grade = undefined,
    supervisor = undefined,
    supervisor_id = undefined,
    date = undefined,
    status = undefined,
    monography = undefined,
    document = undefined,
    zip = undefined,
    group = undefined,
    course_id = undefined,
    course_name = undefined,
    image = undefined
  ) {
    this.id = id;
    this.title = title;
    this.summary = summary;
    this.grade = grade;
    this.supervisor = supervisor;
    this.date = date;
    this.status = status;
    this.monography = monography;
    this.document = document;
    this.zip = zip;
    this.group = group;
    this.course_id = course_id;
    this.course_name = course_name;
    this.image = image;
    this.supervisor_id = supervisor_id;
  }

  insert() {
    const tcc = new ModelTcc();
    tcc.title = this.title;
    tcc.summary = this.summary;
    tcc.grade = this.grade;
    tcc.supervisor = this.supervisor;
    tcc.date = this.date;
    tcc.status = this.status;
    tcc.monography = this.monography;
    tcc.document = this.document;
    tcc.zip = this.zip;
    tcc.group_id = this.group;
    tcc.course_id = this.course_id;
    tcc.course_name = this.course_name;
    tcc.image = this.image;
    tcc.supervisor_id = this.supervisor_id

    return tcc.save();
  }
  
  singleFilter(filter){
    const resp = ModelTcc.find(filter);
    return resp;
  }

  allFieldsFilter(fields , filter){
    const resp = ModelTcc.find(filter).select(fields);
    return resp;
  }

  allFields(fields){
    const resp = ModelTcc.find().select(fields);
    return resp;
  }
  
  exist() {
    const resp = ModelTcc.exists({"_id": new ObjectId(this.id)});
    return resp;
  }

  all() {
    const resp = ModelTcc.find();
    return resp;
  }

  allByYear() {
    const fields = [
      "_id",
      "title",
      "summary",
      "grade",
      "supervisor",
      "date",
      "status",
      "group",
      "course_id",
      "course_name",
    ];
    const resp = ModelTcc.where("date").equals(this.date).select(fields);
    return resp;
  }

  allByCourse() {
    const fields = [
      "_id",
      "title",
      "summary",
      "grade",
      "supervisor",
      "date",
      "status",
      "group",
      "course_id"
    ];
    const resp = ModelTcc.where("course_id").equals(this.course_id).select(fields);
    return resp;
  }

  single() {
    const resp = ModelTcc.findById(this.id);
    return resp;
  }
  delete() {
    const resp = ModelTcc.findByIdAndDelete(this.id);
    return resp
  }

  async update() {
    const tcc = await ModelTcc.findById(this.id);

    if (this.image != undefined) {
      tcc.image = this.image;
    }

    if (this.title != undefined) {
      tcc.title = this.title;
    }

    if (this.summary != undefined) {
      tcc.summary = this.summary;
    }

    if (this.grade != undefined) {
      tcc.grade = this.grade;
    }

    if (this.supervisor != undefined) {
      tcc.supervisor = this.supervisor;
    }

    if (this.date != undefined) {
      tcc.date = this.date;
    }

    if (this.status != undefined) {
      tcc.status = this.status;
    }

    if (this.group != undefined) {
      tcc.group = this.group;
    }

    if (this.course_id != undefined) {
      tcc.course_id = this.course_id;
    }

    if (this.course_name != undefined) {
      tcc.course_name = this.course_name;
    }
    if(this.monography != undefined){
      tcc.monography = this.monography;
    }
    if(this.document != undefined){
      tcc.document = this.document;
    }
    if(this.zip != undefined){
      tcc.zip = this.zip;
    }
    return tcc.save();
  }

  existsByGroupId(id){
    const resp = ModelTcc.exists({"group": id});
    return resp;
  }
  get zip() {
    return this._zip;
  }
  get document() {
    return this._document;
  }
  get monography() {
    return this._monography;
  }
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get summary() {
    return this._summary;
  }
  get grade() {
    return this._grade;
  }
  get supervisor() {
    return this._supervisor;
  }
  get date() {
    return this._date;
  }
  get status() {
    return this._status;
  }
  get group() {
    return this._group;
  }
  get course_id() {
    return this._course_id;
  }
  get course_name() {
    return this._course_name;
  }
  get image() {
    return this._image;
  }
  // Setters
  set zip(value) {
    this._zip = value;
  }
  set document(value) {
    this._document = value;
  }
  set monography(value) {
    this._monography = value;
  }
  set id(value) {
    this._id = value;
  }
  set title(value) {
    this._title = value;
  }
  set summary(value) {
    this._summary = value;
  }
  set grade(value) {
    this._grade = value;
  }
  set supervisor(value) {
    this._supervisor = value;
  }
  set date(value) {
    this._date = value;
  }
  set status(value) {
    this._status = value;
  }

  set group(value) {
    this._group = value;
  }
  set course_id(value) {
    this._course_id = value;
  }
  set course_name(value) {
    this._course_name = value;
  }
  set image(value) {
    this._image = value;
  }
  get supervisor_id(){
    return this._supervisor_id;
  }
  set supervisor_id(v){
    this._supervisor_id = v;
  }
};
