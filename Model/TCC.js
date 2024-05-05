const { ObjectId } = require("mongodb");
const ModelTcc = require("./ModelTCCMongoose");

module.exports = class TCC {
  constructor(
    id = undefined,
    title = undefined,
    summary = undefined,
    grade = undefined,
    supervisor = undefined,
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
  }

  async insert() {
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
    tcc.group = this.group;
    tcc.course_id = this.course_id;
    tcc.course_name = this.course_name;
    tcc.image = this.image;

    return tcc.save();
  }

  async exist() {
    const res = await ModelTcc.exists({ _id: new ObjectId(this.id) });
    if (res != null) {
      return true;
    }
    return false;
  }

  async readAll(fields) {
    return ModelTcc.find({ status: 2 }).select(fields).exec();
  }

  async readByYear() {
    const arrayData = [
      "_id",
      "title",
      "summary",
      "grade",
      "supervisor",
      "date",
      "status",
      "files",
      "group",
      "course_id",
      "course_name",
    ];

    return ModelTcc.where("date").equals(this.date).select(arrayData).exec();
  }

  async single() {
    return ModelTcc.findById(this.id).exec();
  }

  async readByCourse() {
    const arrayData = [
      "_id",
      "title",
      "summary",
      "grade",
      "supervisor",
      "date",
      "status",
      "files",
      "group",
      "course_id",
      "course_name",
    ];
    return ModelTcc.where("course_id")
      .equals(this.course_id)
      .select(arrayData)
      .exec();
  }

  async delete() {
    return ModelTcc.findByIdAndDelete(this.id).exec();
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

    return tcc.save();
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
};
