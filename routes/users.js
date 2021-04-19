var express = require('express');
const OracleDB = require('oracledb');
var router = express.Router();
const { handleDatabaseOperation } = require('../utilities/service-utils');

/* GET user listing. */

async function getUser(req, res, userId) {
  if (!userId) {
    return null;
  }
  const conn = await handleDatabaseOperation(req, res);
  const rs = await conn.execute("select user_id, name, last_name, emailid, profile_pic from lmsappuser.users where user_id=:1", [userId], { outFormat: OracleDB.OBJECT });
  if (rs.rows)
    return rs.rows[0];
  return null;
}

router.post('/login', async function (req, res, next) {
  const { firstName, lastName, email } = req.body;
  const userId = req.principle.user_id;
  let nextUserAction = 'NEW USER';
  const connection = await handleDatabaseOperation(req, res);
  const rs = await connection.execute("select count(*) from lmsappuser.users where user_id=:1", [userId], { outFormat: OracleDB.OBJECT });
  console.log(`rs`, rs);
  if(rs.rows[0]['COUNT(*)'] == 1){
    nextUserAction = 'EXISTING USER';
    console.log(`nextUserAction`, nextUserAction);
  }
  else{
    console.log(`nextUserAction`, nextUserAction);
    await connection.execute(`insert into lmsappuser.users(user_id,name,last_name, emailid) VALUES (:1,:2,:3,:4)`, [userId, firstName, lastName, email], { autoCommit: true });
  }
  const user = await getUser(userId);
  return res.status(200)
          .json({nextUserAction, user});   
});

router.get('/', async (req,res,next) => {
  const userId = req.principle.user_id;
  const user = await getUser(req, res, userId);
  console.log(`user`, user);
  return res.json(user);
});

router.get('/getUsers', async function (req, res, next) {
  // oracledb.initOracleClient({ libDir: 'C:\\instantclient_19_10' });
  const conn = await handleDatabaseOperation(req, res);
  const rs = await conn.execute(`SELECT * FROM lmsappuser.users`, []);
  return rs.rows;
});

module.exports = router;
