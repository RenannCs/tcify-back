const ModelUser = require("../Schemas/User");
const ModelCourse = require("../Schemas/Course"); //
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
    image = undefined
  ) {
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
    this._image = image
  }

  async insert() {
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

  async readAll() {
    return ModelUser.find().exec();
  }

  async readAll(fields) {
    const users = await ModelUser.find()
      .select(fields)
      .populate({
        path: "course_id",
        model: "Course",
        select: "name",
      })
      .exec();

    const formattedUsers = users.map((user) => ({
      _id: user._id,
      name: user.name,
      course_id: user.course_id ? user.course_id._id : null,
      course_name: user.course_id ? user.course_id.name : null,
      email: user.email,
      phone_number: user.phone_number,
      user_type: user.user_type,
      register: user.register,
    }));

    return formattedUsers;
  }

  singleFilterByRegister() {
    const arrayData = ["name", "register", "course_name", "email", "phone_number", "github", "linkedin", "image"];
    return ModelUser.findOne()
      .where("register")
      .equals(this.register)
      .select(arrayData)
      .exec();
  }

  
  async singleByRegister() {
    return ModelUser.findOne().where("register").equals(this.register).exec();
  }
  async single(fields) {
    const user = await ModelUser.findById(this.id)
      .select(fields)
      .populate({
        path: "course_id",
        model: "Course",
        select: "name",
      })
      .exec();

    const formattedUser = {
      _id: user._id,
      name: user.name,
      course_id: user.course_id ? user.course_id._id : null,
      course_name: user.course_id ? user.course_id.name : null,
      email: user.email,
      phone_number: user.phone_number,
      user_type: user.user_type,
      register: user.register,
    };

    return formattedUser;
  }

  async delete() {
    return ModelUser.findByIdAndDelete(this.id).exec();
  }

  async login() {
    const newPassword = md5(this.password);
    return ModelUser.findOne({
      $or: [{ register: this.register }, { email: this.register }],
      password: newPassword,
    })
      .select("_id user_type")
      .exec();
  }

  exist() {
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

    return user.save();
  }

  get register() {
    return this._register;
  }
  set register(value) {
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
    return this._course_name;
  }
  set course_name(value) {
    this._course_name = value;
  }

  // Getter e setter para 'courseId'
  get course_id() {
    return this._course_id;
  }
  set course_id(value) {
    this._course_id = value;
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
    return this._phone_number;
  }
  set phone_number(value) {
    this._phone_number = value;
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
    return this._user_type;
  }
  set user_type(value) {
    this._user_type = value;
  }

  get image(){
    return this._image;
  }
  set image(value){
    this._image = value; 
  }
};
