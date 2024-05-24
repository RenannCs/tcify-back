const ModelGroup = require("../Model/ModelGroupMongoose");
const { ObjectId } = require("mongodb");
const ModelUser = require("../Model/User");
module.exports = class Group{
    constructor(
        /**
         * @type {Array}
         */
        students = undefined
    ){
        this.students = students;
    }

    
    insert(){
        const group = new ModelGroup();
        group.students = this.students;
        return group.save();
    }

    existByUserRegister(register){
        const resp = ModelGroup.find({
            "students":{
                "$elemMatch":{"register": register}
            }
        })
        
        return resp;
    }
    
    get students(){
        return this._students;
    }
    set students(value){
        this._students = value;
    }
}