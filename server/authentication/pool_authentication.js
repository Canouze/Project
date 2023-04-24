const jwt = require("jsonwebtoken");
const dbp = require("../database/pool_connection.js");
const createError = require('http-errors');

const authentication = async(req, res, next) => {
  try{
    const idToken = req.header('Authorisation').replace('Bearer ', '');
    const decoded = jwt.verify(idToken, process.env.SECRET_KEY);
    req.id = decoded.id;
    dbp.query("SELECT * FROM users WHERE user_id = ?", decoded.id, (error, result) => {
      if(error){
        return res.status(400).send({
          message: error
        });
      }
      console.log(result[0].is_admin);
    });
    return next();
  }
  catch(error){
    console.log(error);
    res.status(401).send({ error: "Please login" });
  }
};

module.exports = authentication;
