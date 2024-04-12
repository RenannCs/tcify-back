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
        files = undefined,
        group = undefined,
        course_id = undefined,
        course_name = undefined,
        image = undefined
    ) {
        this.modelTcc = new ModelTcc();
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.grade = grade;
        this.supervisor = supervisor;
        this.date = date;
        this.status = status;
        this.files = files;
        this.group = group;
        this.course_id = course_id;
        this.course_name = course_name;
        this.image = image;
    }

    async insert() {
        this.modelTcc.title = this.title;
        this.modelTcc.summary = this.summary;
        this.modelTcc.grade = this.grade;
        this.modelTcc.supervisor = this.supervisor;
        this.modelTcc.date = this.date;
        this.modelTcc.status = this.status;
        this.modelTcc.files = this.files;
        this.modelTcc.group = this.group;
        this.modelTcc.course_id = this.course_id;
        this.modelTcc.course_name = this.course_name;
        this.modelTcc.image = this.image;

        return this.modelTcc.save();
    }

    async readAll(){
        const arrayData = [
            "_id" , "title" , "summary" , "grade" , "supervisor" , "date" , "status" , "files" , "group" , "course_id" , "course_name"
        ];

        return ModelTcc.find().select(arrayData).exec()
    }

    async readByYear(){
        const arrayData = [
            "_id" , "title" , "summary" , "grade" , "supervisor" , "date" , "status" , "files" , "group" , "course_id" , "course_name"
        ];
        
        return ModelTcc.where("date").equals(this.date).select(arrayData).exec();
    }

    async single(){
        return ModelTcc.findById(this.id).exec();
    }

    async readByCourse(){
        const arrayData = [
            "_id" , "title" , "summary" , "grade" , "supervisor" , "date" , "status" , "files" , "group" , "course_id" , "course_name"
        ];
        return ModelTcc.where("course_id").equals(this.course_id).select(arrayData).exec()
    }

    async delete(){
        return ModelTcc.findByIdAndDelete(this.id).exec();
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
    get file() {
        return this._file;
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
    set file(value) {
        this._file = value;
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
}




