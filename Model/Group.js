const ModelGroup = require("../Model/ModelGroupMongoose");
const { ObjectId } = require("mongodb");
const ModelUser = require("../Model/User");
module.exports = class Group{
    constructor(
        /**
         * @type {ModelUser}
         */
        student1 = undefined,
        student2 = undefined,
        student3 = undefined
    ){
        this.student1 = student1;
        this.student2 = student2;
        this.student3 = student3;
    }

    
    async insert(){
        const group = new ModelGroup();
        if (this.student1 != undefined){    
            group.student1._id = new ObjectId (this.student1._id);
            group.student1.course_name = this.student1.course_name;
            group.student1.email = this.student1.email;
            group.student1.github = this.student1.github;
            group.student1.linkedin = this.student1.linkedin;
            group.student1.name = this.student1.name;
            group.student1.phone_number = this.student1.phone_number;
            group.student1.register = this.student1.register;
        }
        
        
        if (this.student2 != undefined){
            group.student2._id = this.student2.id;
            group.student2.course_name = this.student2.course_name;
            group.student2.email = this.student2.email;
            group.student2.github = this.student2.github;
            group.student2.linkedin = this.student2.linkedin;
            group.student2.name = this.student2.name;
            group.student2.phone_number = this.student2.phone_number;
            group.student2.register = this.student2.register;
        }

        if (this.student3 != undefined){
            group.student3._id = this.student3.id;
            group.student3.course_name = this.student3.course_name;
            group.student3.email = this.student3.email;
            group.student3.github = this.student3.github;
            group.student3.linkedin = this.student3.linkedin;
            group.student3.name = this.student3.name;
            group.student3.phone_number = this.student3.phone_number;
            group.student3.register = this.student3.register;
        }
        return group.save();
    }

    async existByUserRegister(){
        const resp = await ModelGroup.findOne({"$or":[
            {"student1.register": this.student1.register}
        ]})

        return resp;
    }
    get student1(){
        return this._student1;
    }
    set student1(value){
        this._student1 = value;
    }

    get student2(){
        return this._student2;
    }
    set student2(value){
        this._student2 = value; 
    }

    get student3(){
        return this._student3;
    }
    set student3(value){
        this._student3 = value;
    }
}