var express = require('express');
const OracleDB = require('oracledb');
var router = express.Router();
const { handleDatabaseOperation } = require('../utilities/service-utils');

/* GET user listing. */

async function getUser(req, res, userId) {
  if (!userId) {
    return null;
  }
  await handleDatabaseOperation(req, res, async function (req, res, connection) {
    connection.execute("select id, name, last_name, email from lmsappuser.users where id=:1", [userId], { outFormat: OracleDB.OBJECT }, (err, result) => {
      if (err) {
        console.log(`err`, err);
      }
      else {
        if (result.rows.length)
          return result.rows[0];
        return null;
      }
    });
  });
}

router.post('/login', async function (req, res, next) {
  const { userId, firstName, lastName, email } = req.body;
  let nextUserAction = 'NEW USER';
  await handleDatabaseOperation(req, res, async function (req, res, connection) {
    connection.execute("select count(*) from lmsappuser.users where id=:1", [userId], { outFormat: OracleDB.OBJECT }, (err, result) => {
      if (err) {
        console.log(`err`, err);
      }
      else {
        if (result.rows.length && result.rows[0]['COUNT(*)'] == 1)
          nextUserAction = 'EXISTING_USER';
      }
    })
    console.log(`nextUserAction`, nextUserAction);
    // Add all the fields in table
    await connection.execute(`insert into lmsappuser.users(id,name,last_name, emailid) VALUES (:1,:2,:3,:4)`, [userId, firstName, lastName, email], { autoCommit: true });
    const user = await getUser(req, res, userId);
    return res.send(200).json({ nextUserAction, user });
  });
});

router.get('/getUsers', async function (req, res, next) {
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
});

module.exports = router;
