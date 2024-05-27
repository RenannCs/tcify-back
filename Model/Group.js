const ModelGroup = require("../Schemas/Group");
const { ObjectId } = require("mongodb");
const ModelUser = require("../Model/User");
module.exports = class Group{
    constructor(
        id = undefined,
        /**
         * @type {Array}
         */
        students = undefined
    ){
        this.students = students;
        this.id = id;
    }

    
    insert(){
        const group = new ModelGroup();
        group.students = this.students;
        return group.save();
    }

    existByStudent(register){
        const resp = ModelGroup.exists({
            "students":{
                "$elemMatch":{"register": register}
            }
        })
        
        return resp;
    }

    findByStudent(register){
        const resp = ModelGroup.findOne({
            "students":{
                "$elemMatch": {"register": register}
            }
        })
        return resp;
    }
    
    findById(){
        const resp = ModelGroup.findById(this.id);

        return resp;
    }

    get students(){
        return this._students;
    }
    set students(value){
        this._students = value;
    }
    get id(){
        return this._id;
    }
    set id(value){
        this._id = value;
    }
}