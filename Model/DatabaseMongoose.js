const mongoose = require('mongoose')
require('dotenv').config();

let user = process.env.NODE_USER;
let password = process.env.NODE_PASS;
let dbName = process.env.DATABASE_NAME;

if (process.env.NODE_ENV === 'development') {
    user = process.env.NODE_USER;
    password = process.env.NODE_PASS;
} else {
    // Set user and password for production
}
const uri = `mongodb+srv://${user}:${password}@repositorio.kr4t3yw.mongodb.net/${dbName}`;

module.exports = class Database{
    constructor(){
        try{
            mongoose.connect(uri , {
                dbName: "Repositorio_TCC"
            })
        }catch(err){
            throw err;
        }
    }
}