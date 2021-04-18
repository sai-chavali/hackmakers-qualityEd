const oracledb = require('oracledb');
const dotenv = require('dotenv').config();

async function handleDatabaseOperation(request, response, callback) {
  console.log(request.method + ":" + request.url);
  oracledb.getConnection(
    {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_HOST
    },
    function (err, connection) {
      if (err) {
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
      // do with the connection whatever was supposed to be done
      console.log('Connection acquired ; go execute ');
      callback(request, response, connection);
    });
}//handleDatabaseOperation

module.exports = {
    handleDatabaseOperation
}