const ModelTcc = require("../Model/TCCmongoose").tccModel;

class TCC {
    constructor(
        id = null,
        title = "" ,
        summary = "",
        grade  = null,
        supervisor = "",
        date = "",
        status = false,
        file = {},
        group = {students: [{}],},
        course_id = "",
        course_name = "",
        image = ""    
    ){
        this._id = id;
        this._title = title;
        this._summary = summary;
        this._grade  = grade;
        this._supervisor = supervisor;
        this._date = date;
        this._status = status;
        this._file = file;
        this._group = group;
        this._course_id = course_id;
        this._course_name = course_name;
        this._image = image;
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
