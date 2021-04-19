const oracledb = require('oracledb');
const dotenv = require('dotenv').config();

async function handleDatabaseOperation(request, response) {
    console.log(request.method + ":" + request.url);
    try {
        const conn = await oracledb.getConnection(
            {
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                connectString: process.env.DB_HOST
            });

        console.log('Connection acquired ; go execute ');
        return conn;
    } catch (err) {
        console.log('Error in acquiring connection ...');
        console.log('Error message ' + err.message);
        // Error connecting to DB
        response.end(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
}//handleDatabaseOperation

module.exports = {
    handleDatabaseOperation
}