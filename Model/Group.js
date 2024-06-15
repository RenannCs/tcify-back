const ModelGroup = require("../Schemas/Group");
const { ObjectId } = require("mongodb");
const ModelUser = require("../Model/User");
module.exports = class Group{
    constructor(
        id = undefined,
        /**
         * @type {Array}
         */
        students = undefined,
        leaderId = undefined,
        status = undefined,
        leaderName = undefined
    ){
        this.students = students;
        this.id = id;
        this.leaderId = leaderId;
        this.leaderName = leaderName
        this.status = status;
    }

    all(){
        const resp = ModelGroup.find();
        return resp;
    }


    delete(){
        const resp = ModelGroup.findByIdAndDelete(this.id);
        return resp;
    }

    insert(){
        const group = new ModelGroup();
        group.students = this.students;
        group.leaderId = this.leaderId;
        group.leaderName = this.leaderName;
        group.status = this.status;
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
    async update(){
        const group = await ModelGroup.findById(this.id);
        group.students = this.students;
        const resp = group.save();
        return resp;
    }
    async updateStudent(id , newData){
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
    get leaderId(){
        return this._leaderId; 
    }
    set leaderId(v){
        this._leaderId = v;
    }
    get status(){
        return this._status;
    }
    set status(v){
        this._status = v;
    }
    get leaderName(){
        return this._leaderName;
    }
    set leaderName(v){
        this._leaderName = v;
    }
}