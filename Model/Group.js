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

    delete(){
        const resp = ModelGroup.findByIdAndDelete(this.id);
        return resp;
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

    findByStudentId(id){
        const resp = ModelGroup.findOne({
            "students":{
                "$elemMatch": {"_id": id}
            }
        })
        return resp;
    }
    
    single(){
        const resp = ModelGroup.findById(this.id);
        return resp;
    }

    async update(id , newData){
        const group = await this.findByStudentId(id);
        const students = group.students;
        const newArray = []
        for(const student of students){
            if(student._id != id){
                newArray.push(student);
            }else{
                newArray.push(newData);
            }
        }

        group.students = newArray;

        return group.save()
    }

    exists(){
        const resp = ModelGroup.exists({"_id": new ObjectId(this.id)});
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