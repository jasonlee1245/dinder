const pool = require ('../database.js');

// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

const verifyUser = (req, res, next) => {
  console.log('still showing as user?', req.body.user)
  let queryforPass = `SELECT "password" FROM "Users" WHERE "user" = '${req.body.user}'`;
  pool.query(queryforPass, (err, result) => {
    if (err) return res.send('Not Verified');
    if (result.rows[0].password === req.body.pass) {
      return next();
    }
  });
};

const createUser = (req, res, next) => {
  let arr = [req.body.user, req.body.pass];
  let queryForSignUp = `INSERT INTO "Users" ("user","password") VALUES ($1, $2)`;
  pool.query(queryForSignUp, arr, (err, result) => {
    if (err) return next();
  });
};

module.exports = {
  verifyUser,
  createUser
};
