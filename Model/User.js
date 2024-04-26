const { Model } = require("mongoose");
const ModelUser = require("./ModeUserMongoose");
const { ObjectId } = require("mongodb");

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

        const user = new ModelUser();
        user.name = this._name;
        user.course_name = this._course_name;
        user.course_id = this._course_id;
        user.email = this._email;
        user.password = this._password;
        user.phone_number = this._phone_number;
        user.github = this._github;
        user.linkedin = this._linkedin;
        user.user_type = this._user_type;
        user.register = this._register;

        return user.save();
    }
    async readAll(){
        return ModelUser.find().exec();
    }

    async singleFilterByRegister(){
        const arrayData = ["name" , "course_name" , "email" , "github" , "linkedin"];
        return ModelUser.findOne().where("register").equals(this.register).select(arrayData).exec();
    }
    async singleByRegister(){
        return ModelUser.findOne().where("register").equals(this.register).exec();
    }
    async single(){
        return ModelUser.findById(this.id).exec();
    }
    
    async delete(){
        return ModelUser.findByIdAndDelete(this.id).exec();
    }

    async login(){
        return ModelUser.findOne({
            $or: [
                { "register": this.register },
                { "email": this.register }
            ],
            "password": this.password
        }).exec()
    }

    async exist(){
        const res = ModelUser.exists({"_id": new ObjectId(this.id)});
        if (res!= null){
            return true;
        }
        return false;
    }

    async update(){
        const user = await ModelUser.findById(this.id);
        if(this.name != undefined){
            user.name = this.name;
        }

        if(this.course_name != undefined){
            user.course_name = this.course_name;
        }

        if(this.course_id != undefined){
            user.course_id = this.course_id;
        }

        if(this.email != undefined){
            user.email = this.email;
        }

        if(this.password != undefined){
            user.password = this.password;
        }

        if(this.phone_number != undefined){
            user.phone_number = this.phone_number;
        }

        if(this.github != undefined){
            user.github = this.github;
        }

        if(this.linkedin != undefined){
            user.linkedin = this.linkedin;
        }

        if(this.user_type != undefined){
            user.user_type = this.user_type
        }

        if(this.register != undefined){
            user.register = this.register;
        }

        return user.save();
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