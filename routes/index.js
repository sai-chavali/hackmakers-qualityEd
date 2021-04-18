var express = require('express');
var router = express.Router();
const  {handleDatabaseOperation} = require('../utilities/service-utils');


/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    // oracledb.initOracleClient({ libDir: 'C:\\instantclient_19_10' });

    await handleDatabaseOperation(req, res, function (req, res, connection) {
      connection.execute(`SELECT * FROM lmsappuser.users`, [], function (err, result) {
        if (err) {
          console.log(`err`, err);
        }
        else {
          res.json(result.rows);
        }
      });
    });
  } catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
  }
});

module.exports = router;
