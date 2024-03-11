const { ObjectId, BSON } = require("mongodb");

module.exports = class Tccs {
    constructor(client) {
        this._client = client;
        this._database = this.client.db('Repositorio_TCC');
        this._collection = this.database.collection('Repositorio');
    }


    async readAll() {
        const asyncFunction = new Promise((resolve, reject) => {
            try {
                const result = this.collection.find({});

                resolve(result.toArray());
            } catch (err) {
                reject(err);
            }
        });
        return asyncFunction;
    }

    async single(id) {
        const asyncFunction = new Promise((resolve, reject) => {
            try {
                const query = { _id: new ObjectId(id) };

                const result = this.collection.findOne(query);
                resolve(result);

            } catch (err) {
                reject(err);
            }
        })
        return asyncFunction;
    }

    async readTccByYear(ano) {
        const asyncFunction = new Promise((resolve, reject) => {
            try {
                const query = { "ano": ano };

                const result = this.collection.find(query);
                resolve(result.toArray());
            } catch (err) {
                reject(err);
            }
        })
        return asyncFunction;
    }

    async readTccByCourse(curso) {
        const asyncFunction = new Promise((resolve, reject) => {
            try {
                const query = { id_curso: curso };

                const result = this.collection.find(query);

                resolve(result.toArray());
            } catch (err) {
                reject(err);
            }
        })
        return asyncFunction;
    }

    async deleteOne(id) {
        const asyncFunction = new Promise((resolve, reject) => {
            try {
                const query = { _id: new ObjectId(id) };
                const result = this.collection.deleteOne(query);

                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
        return asyncFunction;
    }



    async updateOne(id, js) {
        const asyncFunction = new Promise((resolve, reject) => {
            try {
                const query = { _id: new ObjectId(id) };

                const json_ap = {
                    $set: js
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
        })
        return asyncFunction;
    }

    async insertOne(js) {
        const asyncFunction = new Promise((resolve, reject) => {
            try {
                const result = this.collection.insertOne(js);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
        return asyncFunction;
    }

    verifyJsonInsert(js){
        const correctJson = [
            'id_curso',
            'nome_tcc',
            'resumo',
            'ano',
            'nota',
            'orientador',
            'grupo'
        ]
        for (const key of correctJson){
            if(!(key in js)){
                return false;
            }
        }
        return true;
    }
    verifyJsonUpdate(js){
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
        for (const key in js){
            if(!(correctJson.includes(key))){
                
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
    }
}