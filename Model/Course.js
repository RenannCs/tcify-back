const { ObjectId } = require('mongodb');
const ModelCourse = require('../Schemas/Course')

module.exports = class Course {

    constructor(
        id = undefined,
        name = undefined
    ){
        this.id = id;
        this.name = name;   
    }

    set id(value){
        this._id = value;
    }
    get id(){
        return this._id;
    }

    set name(value){
        this._name = value;
    }
    get name(){
        return this._name;
    }
        
    single(){
        const resp = ModelCourse.findById(new ObjectId(this.id));
        
        return resp;
    }
    all(){
        const resp = ModelCourse.find();
        return resp;
    }
    delete(){
        const resp = ModelCourse.findByIdAndDelete(this.id);
        return resp;
    }
    insert(){
        const course = new ModelCourse();
        course.name = this.name;

        return course.save();
    }
    async update(){
        const course = await ModelCourse.findById(this.id);
        course.name = this.name;
        return course.save();
    }
    exists(){
        const resp = ModelCourse.exists({"_id": new ObjectId(this.id)});
        return resp;
    }
    /*
    constructor(client) {
        this._client = client;
        this._database = this.client.db('Repositorio_TCC');
        this._collection = this.database.collection('Courses');
    }


    async readAll() {
        return new Promise((resolve, reject) => {
            try {
                const result = this.collection.find({}).toArray();

                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    async single(id) {
        return new Promise((resolve, reject) => {
            try {
                const query = { _id: new ObjectId(id) };

                const result = this.collection.findOne(query);
                resolve(result);

            } catch (err) {
                reject(err);
            }
        });
    }

    async readTccByYear(year) {
        return new Promise((resolve, reject) => {
            try {
                const startDate = new Date(year, 0, 1);
                const endDate = new Date(year, 11, 31);
                const query = {
                    "date": {
                        $gte: startDate,
                        $lte: endDate
                    }
                };

                const result = this.collection.find(query).toArray();
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    async readTccByCourse(course) {
        return new Promise((resolve, reject) => {
            try {
                const query = { course_id: course };

                const result = this.collection.find(query).toArray();

                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }



    async deleteOne(id) {
        return new Promise((resolve, reject) => {
            try {
                const query = {_id: new ObjectId(id) };
                const result = this.collection.deleteOne(query);

                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }



    async updateOne(id, data) {
        return new Promise((resolve, reject) => {
            try {
                const query = { _id: new ObjectId(id) };

                const json_ap = {
                    $set: data
                };

                const result = this.collection.updateOne(query, json_ap);
                resolve(result);
            } catch (err) {
                if (err instanceof BSON.BSONError) {
                    reject("ID Inválido");
                } else {
                    reject(err);
                }
            }
        });
    }

    async insertOne(data) {
        return new Promise((resolve, reject) => {
            try {
                const result = this.collection.insertOne(data);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    /*
    verifyJsonInsert(js) {
        const correctJson = [
            'id_curso',
            'nome_tcc',
            'resumo',
            'ano',
            'nota',
            'orientador',
            'grupo'
        ]
        for (const key of correctJson) {
            if (!(key in js)) {
                return false;
            }
        }
        return true;
    }
    verifyJsonUpdate(js) {
        const correctJson = [
            'id_curso',
            'nome_tcc',
            'status',
            'resumo',
            'ano',
            'nota',
            'orientador',
            'arquivos',
            'grupo',
        ]
        for (const key in js) {
            if (!(correctJson.includes(key))) {

                return false;
            }
        }
        return true;
    }
    



    set client(client) {
        this._client = client;
    }
    get client() {
        return this._client;
    }
    set database(database) {
        this._database = database;
    }
    get database() {
        return this._database;
    }
    set collection(cl) {
        this._collection = cl;
    }
    get collection() {
        return this._collection;
    }*/
}