const dbConfig = require("../config/db.config.js");
const mongoose = require('mongoose');

const port = dbConfig.PORT;
let query;


const initializeDB = async () => {
    try {
        console.log(`Connecting to mongodb://${dbConfig.HOST}:${port}/${dbConfig.DB} database...`);
        await mongoose.connect(`mongodb://${dbConfig.HOST}:${port}/${dbConfig.DB}`);
        console.log(`MongoDB DataBase connected`);
    }
    catch (err) {
        console.log('Failed to connect to MongoDB');
        console.log('Check config file!');
        console.log(err.message);
        process.exit()
    }
}

const db = {};
db.query=query;
db.port=port;
db.initializeDB=initializeDB;

module.exports = db;