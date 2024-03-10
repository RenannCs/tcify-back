const { ObjectId, BSON } = require("mongodb");

module.exports = class Admins {
    constructor(client){
        this._client = client;
        this._database = this.client.db('Repositorio_TCC');
        this._collection = this.database.collection('Administradores');
    }

    async readAll(){
        const asyncFunction = new Promise((resolve , reject)=>{
            try{
                const result = this.collection.find({});

                resolve(result.toArray());
            }catch (err){
                reject(err);
            }
        })
        return asyncFunction;
    }

    async single(id){
        const asyncFunction = new Promise((resolve , reject)=>{
            try{
                const query = {_id: new ObjectId(id)};

                const result = this.collection.findOne(query);

                resolve(result);
            }catch (err){
                reject(err);
            }
        })
        return asyncFunction;
    }

    set client(client){
        this._client = client;
    }
    get client(){
        return this._client;
    }
    set database(db){
        this._database = db;
    }
    get database(){
        return this._database;
    }
    set collection(cl){
        this._collection = cl;
    }
    get collection(){
        return this._collection;
    }
}

