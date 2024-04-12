const ModelUser = require("./ModeUserMongoose");

module.exports = class User{
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
        register = undefined
    ){
        this.modelUser = new ModelUser();
        
        this._id = id;
        this._name = name;
        this._course_name = course_name;
        this._course_id = course_id;
        this._email = email;
        this._password = password;
        this._phone_number = phone_number;
        this._github = github;
        this._linkedin = linkedin;
        this._user_type = user_type;
        this._register = register;
    }

    async insert(){
        this.modelUser.name = this._name;
        
        this.modelUser.course_name = this._course_name;
        this.modelUser.course_id = this._course_id;
        this.modelUser.email = this._email;
        this.modelUser.password = this._password;
        this.modelUser.phone_number = this._phone_number;
        this.modelUser.github = this._github;
        this.modelUser.linkedin = this._linkedin;
        this.modelUser.user_type = this._user_type;
        this.modelUser.register = this._register;

        return this.modelUser.save();
    }
    async readAll(){
        return ModelUser.find().exec();
    }

    async single(){
        return ModelUser.findById(this.id).exec();
    }
    
    async delete(){
        return ModelUser.findByIdAndDelete(this.id).exec();
    }

    async login(){
        return ModelUser.findOne({"register": this.register , "password": this.password}).exec()
    }


    get register(){
        return this._register;
    }
    set register(value){
        this._register = value;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

    // Getter e setter para 'name'
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }

    // Getter e setter para 'courseName'
    get course_name() {
        return this._courseName;
    }
    set course_name(value) {
        this._courseName = value;
    }

    // Getter e setter para 'courseId'
    get course_id() {
        return this._courseId;
    }
    set course_id(value) {
        this._courseId = value;
    }

    // Getter e setter para 'email'
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }

    // Getter e setter para 'password'
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }

    // Getter e setter para 'phoneNumber'
    get phone_number() {
        return this._phoneNumber;
    }
    set phone_number(value) {
        this._phoneNumber = value;
    }

    // Getter e setter para 'github'
    get github() {
        return this._github;
    }
    set github(value) {
        this._github = value;
    }

    // Getter e setter para 'linkedin'
    get linkedin() {
        return this._linkedin;
    }
    set linkedin(value) {
        this._linkedin = value;
    }

    // Getter e setter para 'userType'
    get user_type() {
        return this._userType;
    }
    set user_type(value) {
        this._userType = value;
    }
}