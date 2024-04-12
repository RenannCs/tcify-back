const { ObjectId, BSON } = require("mongodb");
const { json } = require("express");

module.exports = class Admins {
    constructor(client) {
        this._client = client;
        this._database = this.client.db('Repositorio_TCC');
        this._collection = this.database.collection('Users');
    }

    async readAll() {
        return new Promise((resolve, reject) => {
            try {
                const result = this.collection.find({});

                resolve(result.toArray());
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

    async deleteOne(id) {
        return new Promise((resolve, reject) => {
            try {
                const query = { _id: new ObjectId(id) };

                const result = this.collection.deleteOne(query);
                resolve(result);
            } catch (err) {
                reject(err);
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

    async updateOne(id, data) {
        return new Promise((resolve, reject) => {
            try {
                const query = { _id: new ObjectId(id) };

                const json_ap = {
                    $set: data
                }

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
    }
    
    /*
    verifyJsonInsert(js) {
        const correctJson = [
            'nome',
            'registro',
            'data_nascimento',
            'email',
            'senha',
            'curso'
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
            'nome',
            'registro',
            'data_nascimento',
            'email',
            'senha',
            'curso'
        ]
        for (const key in js) {
            if (!(correctJson.includes(key))) {

                return false;
            }
        }
        return true;
    }
    */

    set client(client) {
        this._client = client;
    }
    get client() {
        return this._client;
    }
    set database(db) {
        this._database = db;
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

